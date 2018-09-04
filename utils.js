import { AsyncStorage } from 'react-native';
import { getProfiles, getProfileConversations, getUser } from "./apiWrapper";

export function handleError(error) {
  console.log('ERROR', error);
}

export async function storeData(key, value) {
  try {
    AsyncStorage.setItem(key, value);
  } catch (error) {
    // Error saving data
  }
}

export const chars = (
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=');

export const Base64 = {
  btoa: (input = '')  => {
    let str = input;
    let output = '';

    for (let block = 0, charCode, i = 0, map = chars;
         str.charAt(i | 0) || +(map = '=', i % 1);
         output += map.charAt(63 & block >> 8 - i % 1 * 8)) {

      charCode = str.charCodeAt(i += 3/4);

      if (charCode > 0xFF) {
        throw new Error("'btoa' failed: The string to be encoded contains characters outside of the Latin1 range.");
      }

      block = block << 8 | charCode;
    }

    return output;
  },

  atob: (input = '') => {
    let str = input.replace(/=+$/, '');
    let output = '';

    if (str.length % 4 == 1) {
      throw new Error("'atob' failed: The string to be decoded is not correctly encoded.");
    }
    for (let bc = 0, bs = 0, buffer, i = 0;
         buffer = str.charAt(i++);

         ~buffer && (bs = bc % 4 ? bs * 64 + buffer : buffer,
         bc++ % 4) ? output += String.fromCharCode(255 & bs >> (-2 * bc & 6)) : 0
    ) {
      buffer = chars.indexOf(buffer);
    }

    return output;
  }
};

export async function retrieveProfileConversations(page, perPage, userUid, profileUid) {
  cachedProfiles = await AsyncStorage.getItem('profiles');

  cachedProfiles = JSON.parse(cachedProfiles);

  let cachedProfile, cachedProfileIndex;

  // FIX THIS!!!!
  cachedProfiles.forEach(
    (profile, index) => {
      if (profile.uid === profileUid) {
        cachedProfile = profile;
        cachedProfileIndex = index;
      }
    }
  );

  cachedProfileConversations = cachedProfile.conversations;

  if (!cachedProfileConversations) {
    let { phone, password } = await retrieveUser(userUid);

    profiles = await getProfiles(phone, password, page, perPage, userUid);

    profileConversations = await getProfileConversations(
      phone, password, page, perPage, userUid, profileUid);

    cachedProfiles[cachedProfileIndex].conversations = profileConversations.your_response;

    AsyncStorage.setItem('profiles', JSON.stringify(cachedProfiles));
    
    return profileConversations.your_response;
  }

  return cachedProfileConversations
}

export async function retrieveConversationMessages(
    page, perPage, profileUid, conversationUid) {

}

export async function retrieveUser(userUid) {
  cached = await AsyncStorage.getItem('user');

  if (!cached) {
    user = await getUser(userUid);

    await AsyncStorage.setItem('user', JSON.stringify(user.your_response));

    return JSON.parse(user.your_response);
  }

  return JSON.parse(cached);
}

export async function retrieveProfiles(page, perPage, userUid) {
  cached = await AsyncStorage.getItem('profiles');

  if (!cached) {
    let { phone, password } = await retrieveUser(userUid);

    userProfiles = await getProfiles(phone, password, page, perPage, userUid);

    await AsyncStorage.setItem('profiles', JSON.stringify(userProfiles.your_response));

    return userProfiles.your_response;
  }

  return JSON.parse(cached);
}