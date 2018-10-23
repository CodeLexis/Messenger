import { AsyncStorage } from 'react-native';
import { pageLimit } from '../constants';
import { addUserToProfile, createProfile, createProfileConversation, 
  getContactConversations, getConversationMessages, getNotifications, 
  getProfiles, getProfileContacts, getProfileConversations, getUser, 
  getUserByEmailOrPhone, login, sendTextMessage, updateContactDetails } from './wrapper';


export async function getCachedProfileForIndex(profileIndex) {
  result = JSON.parse(await AsyncStorage.getItem('profiles'));

  let cachedProfile;

  result.forEach(
    (profile, index) => {
      if (index === profileIndex) {
        cachedProfile = profile
      }
    }
  );

  return cachedProfile
}


export async function retrieveProfileConversations(page, perPage, cachedProfileIndex, refresh=false) {
  result = await AsyncStorage.multiGet(['user', 'profiles']);

  user = JSON.parse(result[0][1]);
  cachedProfiles = JSON.parse(result[1][1]);

  let cachedProfile;

  cachedProfiles.forEach(
    (profile, index) => {
      if (index === cachedProfileIndex) {
        cachedProfile = profile
      }
    }
  );

  cachedProfileConversations = cachedProfile.conversations;
  userUid = user.uid;
  profileUid = cachedProfile.uid;

  if (!cachedProfileConversations || refresh) {
    authToken = await retrieveAuthToken();

    profileConversations = await getProfileConversations(authToken, page, perPage, userUid, profileUid);

    cachedProfiles[cachedProfileIndex].conversations = profileConversations.your_response;

    AsyncStorage.setItem('profiles', JSON.stringify(cachedProfiles));
    
    return profileConversations.your_response;
  }

  return cachedProfileConversations
}

  
export async function retrieveConversationMessages(
    page, perPage, cachedProfileIndex, conversationUid, refresh=false) {

  result = await AsyncStorage.multiGet(['user', 'profiles']);

  user = JSON.parse(result[0][1]);
  cachedProfiles = JSON.parse(result[1][1]);

  let cachedProfile;

  cachedProfiles.forEach(
    (profile, index) => {
      if (index === cachedProfileIndex) {
        cachedProfile = profile
      }
    }
  );

  cachedProfileConversations = cachedProfile.conversations;
  userUid = user.uid;
  profileUid = cachedProfile.uid;

  let cachedConversation;
  cachedProfileConversations.forEach(
    (conversation, index) => {
      if (conversation.uid === conversationUid) {
        cachedConversation = conversation
      }
    }
  );

  if (refresh) {
    authToken = await retrieveAuthToken();

    messages = await getConversationMessages(authToken, page, perPage, userUid, profileUid, conversationUid);

    // await AsyncStorage.setItem('user', JSON.stringify(user.your_response));

    return messages.your_response;
  }

  return cachedConversation.messages;
}


export async function retrieveUser(userUid, refresh=false) {
  cached = await AsyncStorage.getItem('user');

  if (!cached || refresh) {
    authToken = await retrieveAuthToken();

    user = await getUser(authToken, userUid);

    await AsyncStorage.setItem('user', JSON.stringify(user.your_response));

    return user.your_response;
  }

  return JSON.parse(cached);
}


export async function retrieveProfiles(page=1, perPage=pageLimit, refresh=false) {

  cached = await AsyncStorage.getItem('profiles');

  if (!cached || refresh) {
    authToken = await retrieveAuthToken();

    user = JSON.parse(await AsyncStorage.getItem('user'));

    userProfiles = await getProfiles(authToken, page, perPage, user.uid);

    await AsyncStorage.setItem('profiles', JSON.stringify(userProfiles.your_response));

    return userProfiles.your_response;
  }

  return JSON.parse(cached);
}


export async function retrieveAuthToken() {
  result = await AsyncStorage.multiGet(['auth_token', 'auth_token_expiry']);

  cached = result[0][1];
  cachedExpiryDate = result[1][1];

  let hasCachedExpired = true;

  if (cachedExpiryDate) {
    var expiryDateTime = new Date(cachedExpiryDate);
    var currentDateTime = new Date();

    hasCachedExpired = currentDateTime > expiryDateTime;
  }

  if (!cached || hasCachedExpired) {
    result = await AsyncStorage.multiGet(['email_or_phone', 'password']);

    emailOrPhone = result[0][1]
    password = result[1][1]

    authTokenResponse = await login(emailOrPhone, password);

    if (!authTokenResponse) {
      throw TypeError()
    }

    AsyncStorage.multiSet(
      [['auth_token', authTokenResponse.your_response.token], 
      ['auth_token_expiry', authTokenResponse.your_response.expires_on]]
    );

    return authTokenResponse.your_response.token;
  }

  return cached;
}


export async function retrieveUserByEmailOrPhone(emailOrPhone, refresh=false) {
  cached = await AsyncStorage.getItem('user');

  if (!cached || refresh) {
    authToken = await retrieveAuthToken();

    userDetails = await getUserByEmailOrPhone(authToken, emailOrPhone);
 
    console.log('USER DETAILS', userDetails);

    await AsyncStorage.setItem('user', JSON.stringify(userDetails.your_response));

    return userDetails.your_response;
  }

  return cached;
}


export async function doAddUserToProfile(profileUid, inviteCode, fullname, phone, fromScan) {
  cached = await AsyncStorage.getItem('user');

  if (!cached || refresh) {
    authToken = await retrieveAuthToken();

    response = await addUserToProfile(
      authToken, profileUid, inviteCode, fullname, phone, fromScan);

    return response.your_response;
  }

  return cached;
}


export async function callCreateProfile(name, description, inviteCode, themeColor, alertPreference) {
  user = await AsyncStorage.getItem('user');
  user_json = JSON.parse(user);

  authToken = await retrieveAuthToken();

  newProfile = await createProfile(authToken, user_json.uid, name, description, inviteCode, themeColor, alertPreference);

  if (profile['code'] > 299) {
    throw TypeError
  }

  // await AsyncStorage.setItem('user', JSON.stringify(userDetails.your_response));

  return newProfile.your_response;
}


export async function retrieveNotifications(page=1, perPage=pageLimit, refresh=false) {
  cached = await AsyncStorage.getItem('notifications');

  if (!cached || refresh) {
    authToken = await retrieveAuthToken();
    user = await AsyncStorage.getItem('user');
    user_json = JSON.parse(user);

    notifications = await getNotifications(authToken, user_json.uid, page, perPage);

    await AsyncStorage.setItem('notifications', JSON.stringify(notifications.your_response));

    return notifications.your_response;
  }

  return JSON.parse(cached);
}


export async function retrieveProfileMoments(page, perPage, cachedProfileIndex, refresh) {
  return []
}

export async function retrieveContactConversations(page, perPage, cachedProfileIndex, contactUid, refresh) {
  result = await AsyncStorage.multiGet(['user', 'profiles']);

  user = JSON.parse(result[0][1]);
  cachedProfiles = JSON.parse(result[1][1]);

  var cachedProfile;
  cachedProfiles.forEach(
    (profile, index) => {
      if (index === cachedProfileIndex) {
        cachedProfile = profile
      }
    }
  );

  var cachedContact, indexOfCachedContact;
  cachedProfileContacts = cachedProfile.contacts;
  cachedProfileContacts.forEach(
    (contact, index) => {
      if (contact.uid === contactUid) {
        cachedContact = contact
        indexOfCachedContact = index
      }
    }
  );

  userUid = user.uid;
  profileUid = cachedProfile.uid;
  contactUid = cachedContact.uid || contactUid;
  cachedContactConversations = cachedContact.conversations;

  if (!cachedContact || refresh) {
    authToken = await retrieveAuthToken();

    contactConversations = await getContactConversations(authToken, page, perPage, userUid, profileUid, contactUid);

    cachedProfiles[cachedProfileIndex].contacts[indexOfCachedContact].conversations = contactConversations.your_response;

    // AsyncStorage.setItem('profiles', JSON.stringify(cachedProfiles));
    
    return contactConversations.your_response;
  }

  return cachedContactConversations
}


export async function retrieveProfileContacts(page, perPage, cachedProfileIndex, refresh=false) {
  // cachedProfile = await getCachedProfileForIndex(cachedProfileIndex)
  // user = JSON.parse(await AsyncStorage.getItem('user'))

  result = await AsyncStorage.multiGet(['user', 'profiles']);

  user = JSON.parse(result[0][1]);
  cachedProfiles = JSON.parse(result[1][1]);

  let cachedProfile;

  cachedProfiles.forEach(
    (profile, index) => {
      if (index === cachedProfileIndex) {
        cachedProfile = profile
      }
    }
  );

  cachedProfileContacts = cachedProfile.contacts;
  userUid = user.uid;
  profileUid = cachedProfile.uid;

  if (!cachedProfileContacts || refresh) {
    authToken = await retrieveAuthToken();

    profileContacts = await getProfileContacts(authToken, page, perPage, userUid, profileUid);

    cachedProfiles[cachedProfileIndex].contacts = profileContacts.your_response;

    AsyncStorage.setItem('profiles', JSON.stringify(cachedProfiles));
    
    return profileContacts.your_response;
  }

  return cachedProfileContacts
}


export async function doCreateProfileConversation(cachedProfileIndex, title=null, category, participants) {
  result = await AsyncStorage.multiGet(['user', 'profiles']);

  user = JSON.parse(result[0][1]);
  cachedProfiles = JSON.parse(result[1][1]);

  let cachedProfile;

  cachedProfiles.forEach(
    (profile, index) => {
      if (index === cachedProfileIndex) {
        cachedProfile = profile
      }
    }
  )

  authToken = await retrieveAuthToken()

  conversation = await createProfileConversation(authToken, user.uid, cachedProfile.uid, title, category, participants)

  return conversation.your_response;
}


export async function doSendTextMessage(cachedProfileIndex, conversationUid, text) {
  result = await AsyncStorage.multiGet(['user', 'profiles']);

  user = JSON.parse(result[0][1]);
  cachedProfiles = JSON.parse(result[1][1]);

  let cachedProfile;

  cachedProfiles.forEach(
    (profile, index) => {
      if (index === cachedProfileIndex) {
        cachedProfile = profile
      }
    }
  );

  authToken = await retrieveAuthToken();

  messageResponse = await sendTextMessage(authToken, user.uid, cachedProfile.uid, conversationUid, text)

  return messageResponse.your_response;
}


export async function doUpdateContactDetails(profileUid, contactUid, payload) {
  authToken = await retrieveAuthToken();

  result = await AsyncStorage.getItem('user');
  user = JSON.parse(result);

  contactDetails = await updateContactDetails(authToken, user.uid, profileUid, contactUid, payload);

  console.log(contactDetails.your_response)
  
  return contactDetails.your_response;
}