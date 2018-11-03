import { Ionicons } from 'react-native-vector-icons';
import React from 'react';
import SyncStorage from 'sync-storage';
import { AsyncStorage, View } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation';
import { appName, colors, iconSize } from '../../constants';
import { ConversationsScreen } from './conversations';
import { MomentsScreen } from "./moments";
import { TopicsScreen } from "./topics";
import { chars } from "../../utils";
// import {AppNavigator} from "../index";

var styles = require('../../styles.js');

const HomeNavigator_ = createBottomTabNavigator(
  {
    Conversations: ConversationsScreen,
    Moments: MomentsScreen,
    Topics: TopicsScreen
  },
  {
    navigationOptions: ({ navigation }) => {
      selectedProfile = SyncStorage.get('selected_profile')
  
      try {
        themeColor = selectedProfile.theme_color
      }
      catch (error) {
        themeColor = colors.appBarBackgroundColor
      }

      return {
        tabBarIcon: ({ focused, tintColor }) => {
          const { routeName } = navigation.state;
          let iconName;
          if (routeName === 'Conversations') {
            iconName = `ios-chatbubbles${focused ? '' : '-outline'}`;
          } else if (routeName === 'Moments') {
            iconName = `ios-albums${focused ? '' : '-outline'}`;
          } else if (routeName === 'Topics') {
            iconName = `ios-flame${focused ? '' : '-outline'}`;
          }

          return (
            <View style={{flexDirection: 'row'}}>
              <Ionicons name={iconName} size={30} color={
                focused ? tintColor : colors.darkGrey}/>
            </View>
          )
        },

        tabBarOptions: {
          activeTintColor: themeColor,
          inactiveTintColor: colors.darkGrey
        }
      }
    },
  }
);

export class HomeNavigator extends React.Component {
  static router = HomeNavigator_.router;

  constructor(props) {
    super(props)

    this.state = {profile: null}
  }

  // static navigationOptions = ({ navigation, navigationOptions }) => {
  //   const { params } = navigation.state;

  //   return {
  //     title: params ? params.otherParam : 'A Nested Details Screen',
  //     /* These values are used instead of the shared configuration! */
  //     headerStyle: {
  //       backgroundColor: navigationOptions.headerTintColor,
  //     },
  //     headerTintColor: navigationOptions.headerStyle.backgroundColor,
  //   };
  // };

  static navigationOptions = ({ navigation, navigationOptions }) => {
    selectedProfile = SyncStorage.get('selected_profile')

    try {
      title = selectedProfile.name
      themeColor = selectedProfile.theme_color
    }
    catch (error) {
      title = appName
      themeColor = colors.appBarBackgroundColor
    }
    
    return {
      title: title,
      headerLeft: (
        <Ionicons style={{marginLeft: 15}} size={iconSize} name={'md-menu'} onPress={() => navigation.openDrawer()}/>
      ),
      headerRight: (
        <View style={styles.rowContainer}>
          <Ionicons name='md-qr-scanner' size={iconSize} style={{marginRight: 15}} 
            onPress={() => navigation.push('Profile Information')}/>
          <Ionicons name='md-notifications' size={iconSize} style={{marginRight: 15}} 
            onPress={() => navigation.push('Notifications')}/>
        </View>
      ),
      headerStyle: {
        backgroundColor: themeColor
      },

      tabBarOptions: {
        activeTintColor: themeColor,
        inactiveTintColor: 'gray',
      }
    }
  }; 

  componentDidMount() {
    AsyncStorage.multiGet(['profiles', 'active_profile_index'], (errs, result) => {

      if (!errs) {
        profiles = JSON.parse(result[0][1]);
        activeProfileIndexAlphabet = result[1][1];

        profileIndex = chars.indexOf(activeProfileIndexAlphabet);
        this.profile = profile = profiles[profileIndex];
        
        this.setState(
          {
            appBackgroundColor: profile.theme_color
          }
        );
      }
    })
  }

  render() {
    const { navigation } = this.props;

    if (!navigation.state.params) {
      navigation.setParams({'profile': this.state.profile})
    }
    
    return <HomeNavigator_ navigation={navigation}/>
  }
}