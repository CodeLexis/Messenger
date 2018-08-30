import { Ionicons } from 'react-native-vector-icons';
import React from 'react';
import { View } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation';
import { appName, colors } from '../../constants';
import { ConversationsScreen } from './conversations';
import { MomentsScreen } from "./moments";
import { TopicsScreen } from "./topics";
import { retrieveData } from "../../utils";
// import {AppNavigator} from "../index";

const HomeNavigator_ = createBottomTabNavigator(
  {
    Conversations: ConversationsScreen,
    Moments: MomentsScreen,
    Topics: TopicsScreen
  },
  {
    navigationOptions: ({ navigation }) => ({
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
            <Ionicons name={iconName} size={30} color={tintColor}/>
          </View>
        )
      }
    }),
    tabBarOptions: {
      activeTintColor: colors.appBarBackgroundColor,
      inactiveTintColor: 'gray',
    }
  }
);

export class HomeNavigator extends React.Component {
  static router = HomeNavigator_.router;

  static navigationOptions = ({ navigation }) => ({
    title: appName,
    headerRight: (
      <Ionicons name='ios-qr-scanner' size={35} style={{marginRight: 15}}/>
    )
  });

  render() {
    const { navigation } = this.props;

    return <HomeNavigator_ navigation={navigation}/>
  }
}