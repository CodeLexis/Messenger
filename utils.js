import { AsyncStorage } from 'react-native';
import { getProfiles, getProfileConversations } from "./apiWrapper";

export function handleError(error) {
  console.log('ERROR', error);
}

export async function storeData(key, value) {
  try {
    await AsyncStorage.setItem(key, value);
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

export async function retrieveProfileConversations(page, perPage, profileUid_) {
  AsyncStorage.getItem(profileUid_).then(
    function(result) {
      let cachedProfileConversations = result.conversations;

      if (!cachedProfileConversations) {
        let profileConversations = getProfileConversations(
          page=1, perPage=15, profileUid=profileUid_).your_response;

        AsyncStorage.getItem(profileUid_).then(
          function(result) {
            if (!result) {
              result = {}
            }

            result['conversations'] = conversations
            AsyncStorage.setItem(profileUid_, result)
          }
        );

        return profileConversations;
      }

      return cachedProfileConversations
    },

    function(error) {
      handleError(error);
    }
  );
}

export async function retrieveProfiles(page, perPage, userUid) {
  return AsyncStorage.getItem(userUid).then(
    function(result) {

      let cachedUserProfiles = result.profiles;

      if (!cachedUserProfiles) {
        getProfiles(page, perPage, userUid).then(
          function(result) {
            result['profiles'] = profiles;

            AsyncStorage.setItem(userUid, result);
          }
        );

        return retrieveProfiles(page, perPage, userUid);
      }

      return cachedUserProfiles;
    },

    function(error) {
      handleError(error);
    }
  );
}