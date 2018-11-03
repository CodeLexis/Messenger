import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { colors } from '../constants';
import { HomeNavigator } from './home';
import { AddMomentScreen } from './addMoment';
import { AddProfileScreen } from './addProfile';
import { AddUserScreen } from './addUser';
import { ChatScreen } from './chat';
import { NotificationsScreen } from './notifications';
import { EditContactScreen } from './editContact';
import { EditProfileScreen } from './editProfile';
import { storeData } from '../utils';

const AppNavigator_ = createStackNavigator(
  {
    Home: HomeNavigator,
    Chat: ChatScreen,
    AddMoment: AddMomentScreen,
    AddProfile: AddProfileScreen,
    AddUser: AddUserScreen,
    Notifications: NotificationsScreen,
    EditProfile: EditProfileScreen,
    EditContact: EditContactScreen
  },
  
  {
    navigationOptions: {
      // header: ( /* Your custom header */
      //   <View
      //     style={{
      //       height: 80,
      //       marginTop: 20 /* only for IOS to give StatusBar Space */
      //     }}
      //   >
      //     <Text>This is CustomHeader</Text>
      //   </View>
      // )
      headerStyle: {
        backgroundColor: colors.appBarBackgroundColor
      }
    }
  }
);

export class AppNavigator extends React.Component {
  static router = AppNavigator_.router;
  
  constructor (props) {
    super(props);

    this.state = {isMounted: false}
  }

  render() {
    const { navigation } = this.props;

    let profileName = navigation.state.key;

    storeData('active_profile_index', profileName);

    return <AppNavigator_ navigation={navigation}/>;
  }
}