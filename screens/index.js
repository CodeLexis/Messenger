import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { colors } from '../constants';
import { HomeNavigator } from './home';
import { ChatScreen } from './chat';
import { storeData } from '../utils';

const AppNavigator_ = createStackNavigator(
  {
    Home: HomeNavigator,
    Chat: ChatScreen
  },
  // {
  //   navigationOptions: {
  //     header: ( /* Your custom header */
  //       <View
  //         style={{
  //           height: 80,
  //           marginTop: 20 /* only for IOS to give StatusBar Space */
  //         }}
  //       >
  //         <Text>This is CustomHeader</Text>
  //       </View>
  //     )
  //   }
  // }
  {
    navigationOptions: {
      // headerTitleStyle : {color: '#ffffff'},
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

    return <AppNavigator_ navigation={navigation} />;
  }
}