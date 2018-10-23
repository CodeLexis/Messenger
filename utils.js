import { AsyncStorage } from 'react-native';
import { retrieveAuthToken, retrieveProfiles, retrieveUserByEmailOrPhone } from './apiWrapper';
import { pageLimit } from './constants';


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


export async function runSetupScripts() {
  // these values will be stored at proper login/signup

  AsyncStorage.multiSet([
    ['email_or_phone', '08012345678'], ['password', 'password'], ['active_profile_index', '0']
  ])

  retrieveAuthToken();

  retrieveUserByEmailOrPhone('08012345678', refresh=true);

  retrieveProfiles(page=1, perPage=pageLimit, refresh=true);
}
// YCKkQ66eb4g3YZteK3CDbA 


export async function runRefreshes() {
  retrieveProfiles(page=1, perPage=pageLimit, refresh=true);
}


export function normalizeDate(eventIsoDate) {
  eventIsoDate = `${eventIsoDate}Z`

  currentDateTimestamp = new Date().valueOf()
  eventDateTimestamp = Date.parse(eventIsoDate).valueOf()
  
  diff = (currentDateTimestamp - eventDateTimestamp) / 1000

  timeUnitsMap = {
    1: 'Seconds',
    60: 'Minutes', 
    3600: 'Hours', 
    84600: 'Days',
    604800: 'Weeks',
    7257600: 'Months'
  }

  applicableUnits = Object.keys(timeUnitsMap).filter((value, index, array) => {
    return diff / value > 1
  });

  applicableUnits.reverse();

  time_ = Math.floor(diff / applicableUnits[0])
  unit_ = timeUnitsMap[applicableUnits[0]]

  if (time_) {
    return [time_, unit_]
  }

  return ['', ' ']
  
}