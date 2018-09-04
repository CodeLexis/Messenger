import { Base64 } from "../utils";
import { AsyncStorage } from 'react-native';

apiUrl = 'https://messenger-t10.herokuapp.com/api/v1.0';
apiKey = '12345678';

user_1_uid = 'SYWbT3vkmeY6e4bGbx9zvS';
user_2_uid = 'Yd7sD8oYNLvSREMrikJrmU';


export async function createUser(email, fullname) {
  try {

    let phone = await AsyncStorage.getItem('phone');
    let password = await AsyncStorage.getItem('password');

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

export async function editUser(newParams) {
  try {

    let phone = await AsyncStorage.getItem('phone');
    let password = await AsyncStorage.getItem('password');

    let response = await fetch(
      `${apiUrl}/users`, {
        method: 'PATCH',
        authentication: {
          'username': phone,
          'password': password
        },
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'api-key': apiKey
        },
        body: JSON.stringify(newParams)
      });

    return response.json();
  }

  catch (error) {
    console.log(error);
  }
}

export async function getUser(userUid) {
  try {

    let phone = await AsyncStorage.getItem('phone');
    let password = await AsyncStorage.getItem('password');

    let response = await fetch(
      `${apiUrl}/users/${userUid}`, {
        method: 'GET',
        authentication: {
          'username': phone,
          'password': password
        },
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'api-key': apiKey
        }
      });

    return response.json();
  }

  catch (error) {
    console.log(error);
  }
}

export async function createProfile(
    userUid, name, description, inviteCode, privacyLevel,
    themeColor
) {

  let phone = await AsyncStorage.getItem('phone');
  let password = await AsyncStorage.getItem('password');

  try {
    let response = await fetch(
      `${apiUrl}/users/${userUid}/profiles`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'api-key': apiKey,
          'Authorization': 'Basic ' + Base64.btoa(phone + ':' + password)
        },
        body: JSON.stringify({
          "name": name,
          "description": description,
          "invite_code": inviteCode,
          "privacy_level": privacyLevel,
          "theme_color": themeColor
        })
      });

    return response.json();
  }

  catch (error) {
    console.log(error);
  }
}

export async function getProfiles(phone, password, page, perPage, userUid) {

  // userProfile = await AsyncStorage.getItem(userUid);

  // userProfile = JSON.parse(userProfile);

  // let phone = userProfile['phone'];
  // let password = userProfile['password'];

  try {
      let response = await fetch(
        `${apiUrl}/users/${userUid}/profiles`, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'api-key': apiKey,
            'Authorization': 'Basic ' + Base64.btoa(phone + ':' + password)
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

export async function getProfileConversations(phone, password, page, perPage, userUid, profileUid) {

  try {
    let response = await fetch(
      `${apiUrl}/users/${userUid}/profiles/${profileUid}/conversations`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'api-key': apiKey,
          'Authorization': 'Basic ' + Base64.btoa(phone + ':' + password)
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
    profileUid, inviteCode=null, fullname=null, phone=null, fromScan=false) {
  try {

    let phone = await AsyncStorage.getItem('phone');
    let password = await AsyncStorage.getItem('password');

    let response = await fetch(
      `${apiUrl}/users/${userUid}/profiles/${profileUid}/contacts`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'api-key': apiKey,
          'Authorization': 'Basic ' + Base64.btoa(phone + ':' + password)
        },
        body: {
          'invite_code': inviteCode,
          'fullname': fullname,
          'from_scan': fromScan,
          'phone': phone
        }
      });

    return response.json();
  }

  catch (error) {
    console.log(error);
  }
}

export async function sendMessage(
    profileUid, conversationUid, text, audio, image, video) {

  try {

    let phone = await AsyncStorage.getItem('phone');
    let password = await AsyncStorage.getItem('password');

    let response = await fetch(
      `${apiUrl}/users/${userUid}/profiles/${profileUid}/conversations/${conversationUid}/messages`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'api-key': apiKey,
          'Authorization': 'Basic ' + Base64.btoa(phone + ':' + password)
        },
        body: {
          'text': text,
          'audio': audio,
          'image': image,
          'video': video
        }
      });

    return response.json();
  }

  catch (error) {
    console.log(error);
  }
}