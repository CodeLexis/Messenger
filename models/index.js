import Realm from 'realm';

AuthToken = {
  schema: {
    name: 'AuthToken',
    properties: {
      authToken: {'type': 'string'},
      authTokenExpiry: {'type': 'string'}
    }
  }
}

Dog = {
  schema: {
    name: 'Dog',
    properties: {
      name: {'type': 'string'}
    }
  }
}

Profile = {
  schema: {
    name: 'Profile',
    primaryKey: 'name',
    properties: {
      uid: {'type': 'string'},
      name: {'type': 'string'},
      description: {'type': 'string'},
      inviteCode: {'type': 'string'},
      alertPreference: {'type': 'string'},
      themeColor: {'type': 'string'}
    }
  }
}

User = {
  schema: {
    name: 'User',
    primaryKey: 'name',
    properties: {
        uid: {'type': 'string'},
        name: {'type': 'string'},
        email: 'string',
        phone: 'string',
        profiles: {'type': 'list'},
        profilePhoto: {'type': 'string'},
        createdAt: {'type': 'string'}
    }
  }
};

export let realm = new Realm({schema: [AuthToken, Dog, Profile, User]});

// Query
// let user = realm.objects('User', 'age >= 17');
// user.length // => 0