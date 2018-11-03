import { Base64 } from "./utils";

apiUrl = 'https://trails-messenger.herokuapp.com/api/v1.0';
apiKey = '12345678';

user_1_uid = 'SYWbT3vkmeY6e4bGbx9zvS';
user_2_uid = 'Yd7sD8oYNLvSREMrikJrmU';


export async function login(emailOrPhone, password) {
  try {

    let response = await fetch(
      `${apiUrl}/authentication/token`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'api-key': apiKey,
          'Authorization': `Basic ${Base64.btoa(emailOrPhone + ':' + password)}`
        }
      });

    return response.json();
  }

  catch (error) {
    throw error;
  }
}


export async function createUser(phone, email, password, fullname) {
  try {

    let response = await fetch(
      `${apiUrl}/users`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'api-key': apiKey
        },
        body: JSON.stringify({
          "email": email,
          "name": fullname,
          "password": password,
          "phone": phone
        })
      });

    return response.json();
  }

  catch (error) {
    console.log(error);
  }
}


export async function editUser(authToken, newParams) {
  try {

    let response = await fetch(
      `${apiUrl}/users`, {
        method: 'PATCH',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'api-key': apiKey,
          'Authorization': `Basic ${Base64.btoa(authToken + ':')}`
        },
        body: JSON.stringify(newParams)
      });

    return response.json();
  }

  catch (error) {
    console.log(error);
  }
}


export async function getUser(authToken, userUid) {
  try {

    let response = await fetch(
      `${apiUrl}/users/${userUid}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'api-key': apiKey,
          'Authorization': `Basic ${Base64.btoa(authToken + ':')}`
        }
      });

    return response.json();
  }

  catch (error) {
    console.log(error);
  }
}


export async function getUserByEmailOrPhone(authToken, emailOrPhone) {
  try {
    let response = await fetch(
      `${apiUrl}/users?email_or_phone=${emailOrPhone}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'api-key': apiKey,
          'Authorization': `Basic ${Base64.btoa(authToken + ':')}`
        }
      });

    return response.json();
  }

  catch (error) {
    console.log(error);
  }
}


export async function createProfile(
    authToken, userUid, name, description, inviteCode, themeColor, 
    alertPreference
) {

  let body_ = {
    "name": name,
    "description": description,
    "invite_code": inviteCode,
    "theme_color": themeColor,
    "alert_preference": alertPreference
  }

  try {
    let response = await fetch(
      `${apiUrl}/users/${userUid}/profiles`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'api-key': apiKey,
          'Authorization': `Basic ${Base64.btoa(authToken + ':')}`
        },
        body: JSON.stringify(body_)
      });

    return response.json();
  }

  catch (error) {
    console.log(error);
  }
}


export async function getProfiles(
    authToken, page, perPage, userUid) {

  try {
      let response = await fetch(
        `${apiUrl}/users/${userUid}/profiles`, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'api-key': apiKey,
            'Authorization': `Basic ${Base64.btoa(authToken + ':')}`
          },
          params: {
            'page': page,
            'per_page': perPage
          }
        });

      let responseJson = response.json();

      return responseJson;
    }

    catch (error) {
      console.log(error);
    }
}


export async function getProfileConversations(
    authToken, page, perPage, userUid, profileUid) {

  try {
    let response = await fetch(
      `${apiUrl}/users/${userUid}/profiles/${profileUid}/conversations`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'api-key': apiKey,
          'Authorization': `Basic ${Base64.btoa(authToken + ':')}`
        },
        params: {
          'page': page,
          'per_page': perPage
        }
      });

    return response.json();
  }

  catch (error) {
    console.log(error);
  }
}


export async function addContactToProfile(
    authToken, profileUid, inviteCode=null, fullname=null,
    phone=null, fromScan=false) {
  try {

    let response = await fetch(
      `${apiUrl}/users/${userUid}/profiles/${profileUid}/contacts`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'api-key': apiKey,
          'Authorization': `Basic ${Base64.btoa(authToken + ':')}`
        },
        body: JSON.stringify({
          'invite_code': inviteCode,
          'fullname': fullname,
          'from_scan': fromScan,
          'phone': phone
        })
      });

    return response.json();
  }

  catch (error) {
    console.log(error);
  }
}


export async function sendMessage(
    authToken, profileUid, conversationUid, text, 
    audio, image, video) {

  try {

    let response = await fetch(
      `${apiUrl}/users/${userUid}/profiles/${profileUid}/conversations/${conversationUid}/messages`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'api-key': apiKey,
          'Authorization': `Basic ${Base64.btoa(authToken + ':')}`
          // 'Authorization': `Basic ${Base64.btoa(auth_token + ':')}`
        },
        body: JSON.stringify({
          'text': text,
          'audio': audio,
          'image': image,
          'video': video
        })
      });

    return response.json();
  }

  catch (error) {
    console.log(error);
  }
}


export async function getNotifications(authToken, userUid, page, perPage) {
  try {
    let response = await fetch(
      `${apiUrl}/users/${userUid}/notifications`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'api-key': apiKey,
          'Authorization': `Basic ${Base64.btoa(authToken + ':')}`
        },
        params: {
          'page': page, 
          'perPage': perPage
        }
      });

    return response.json();
  }

  catch (error) {
    console.log(error);
  }
}


export async function getProfileContacts(
  authToken, page, perPage, userUid, profileUid) {

  try {
    let response = await fetch(
      `${apiUrl}/users/${userUid}/profiles/${profileUid}/contacts`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'api-key': apiKey,
          'Authorization': `Basic ${Base64.btoa(authToken + ':')}`
        },
        params: {
          'page': page,
          'per_page': perPage
        }
      });

    return response.json();
  }

  catch (error) {
    console.log(error);
  }
}


export async function getContactConversations(authToken, page, perPage, userUid, profileUid, contactUid) {

  try {
    let response = await fetch(
      `${apiUrl}/users/${userUid}/profiles/${profileUid}/contacts/${contactUid}/conversations`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'api-key': apiKey,
          'Authorization': `Basic ${Base64.btoa(authToken + ':')}`
        },
        params: {
          'page': page,
          'per_page': perPage
        }
      });

    return response.json();
  }

  catch (error) {
    console.log(error);
  }  
}


export async function getConversationMessages(authToken, page, perPage, userUid, profileUid, conversationUid) {

  try {
    let response = await fetch(
      `${apiUrl}/users/${userUid}/profiles/${profileUid}/conversations/${conversationUid}/messages`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'api-key': apiKey,
          'Authorization': `Basic ${Base64.btoa(authToken + ':')}`
        },
        params: {
          'page': page,
          'per_page': perPage
        }
      });

    return response.json();
  }

  catch (error) {
    console.log(error);
  }
}


export async function createProfileConversation(authToken, userUid, profileUid, title=null, category, participants) {
  try {
    let response = await fetch(
      `${apiUrl}/users/${userUid}/profiles/${profileUid}/conversations`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'api-key': apiKey,
          'Authorization': `Basic ${Base64.btoa(authToken + ':')}`
        },
        body: JSON.stringify({
          'participants': participants,
          'title': title,
          'category': category
        })
      });

    return response.json();
  }

  catch (error) {
    console.log(error);
  }
}


export async function sendTextMessage(authToken, userUid, profileUid, conversationUid, text) {

  try {
    let response = await fetch(
      `${apiUrl}/users/${userUid}/profiles/${profileUid}/conversations/${conversationUid}/messages`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'api-key': apiKey,
          'Authorization': `Basic ${Base64.btoa(authToken + ':')}`
        },
        body: JSON.stringify({
          'text': text
        })
      });

    return response.json();
  }

  catch (error) {
    console.log(error);
  }
}


export async function updateContactDetails(authToken, userUid, profileUid, contactUid, payload) {
  try {
    console.log(payload)

    let response = await fetch(
      `${apiUrl}/users/${userUid}/profiles/${profileUid}/contacts/${contactUid}`, {
        method: 'PATCH',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'api-key': apiKey,
          'Authorization': `Basic ${Base64.btoa(authToken + ':')}`
        },
        body: JSON.stringify(payload)
      });

    return response.json();
  }

  catch (error) {
    console.log(error);
  }
}


export async function retrieveProfileTopics(authToken, userUid, profileUid, page=1, perPage=20) {
  try {
    let response = await fetch(
      `${apiUrl}/users/${userUid}/profiles/${profileUid}/topics`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'api-key': apiKey,
          'Authorization': `Basic ${Base64.btoa(authToken + ':')}`
        },
        params: {
          'page': page,
          'per_page': perPage
        }
      });

    return response.json();
  }

  catch (error) { 
    console.log(error);
  }
}


export async function retrieveProfileMoments(page=1, perPage=20, authToken, userUid, profileUid) {
  try {
    let response = await fetch(
      `${apiUrl}/users/${userUid}/profiles/${profileUid}/moments`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'api-key': apiKey,
          'Authorization': `Basic ${Base64.btoa(authToken + ':')}`
        },
        params: {'page': page, 'per_page': perPage}
      });

    return response.json();
  }

  catch (error) { 
    console.log(error);
  }
}


export async function addProfileMoment(authToken, userUid, profileUid, body, momentTypeUid, title=null, imageUid=null, videoUid=null, momentItemUid=null) {
  try {
    let response = await fetch(
      `${apiUrl}/users/${userUid}/profiles/${profileUid}/moments`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'api-key': apiKey,
          'Authorization': `Basic ${Base64.btoa(authToken + ':')}`
        },
        body: JSON.stringify({
          title: title,
          body: body,
          image_uid: imageUid,
          video_uid: videoUid, 
          moment_item_uid: momentItemUid,
          moment_type_uid: momentTypeUid
        })
      });

    return response.json();
  }

  catch (error) { 
    console.log(error);
  }
}


export async function editProfileMoment(authToken, userUid, profileUid, momentUid, title=null, body=null) {
  try {
    let response = await fetch(
      `${apiUrl}/users/${userUid}/profiles/${profileUid}/moments/${momentUid}`, {
        method: 'PATCH',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'api-key': apiKey,
          'Authorization': `Basic ${Base64.btoa(authToken + ':')}`
        },
        body: JSON.stringify({
          title: title,
          body: body
        })
      });

    return response.json();
  }

  catch (error) { 
    console.log(error);
  }
}


export async function deleteProfileMoment(authToken, userUid, profileUid, momentUid) {
  try {
    let response = await fetch(
      `${apiUrl}/users/${userUid}/profiles/${profileUid}/moments/${momentUid}`, {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'api-key': apiKey,
          'Authorization': `Basic ${Base64.btoa(authToken + ':')}`
        }
      });

    return response.json();
  }

  catch (error) { 
    console.log(error);
  }
}


export async function editProfile(authToken, userUid, profileUid, name, description, inviteCode, themeColor) {
  try {
    let response = await fetch(
      `${apiUrl}/users/${userUid}/profiles/${profileUid}`, {
        method: 'PATCH',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'api-key': apiKey,
          'Authorization': `Basic ${Base64.btoa(authToken + ':')}`
        },
        body: JSON.stringify({
          name: name,
          description: description,
          invite_code: inviteCode,
          theme_color: themeColor
        })
      });

    return response.json();
  }

  catch (error) { 
    console.log(error);
  } 
}