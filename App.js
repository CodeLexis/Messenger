import React from 'react';
import { createDrawerNavigator, NavigationActions } from 'react-navigation';
import { AppNavigator } from './screens';
import { AsyncStorage, Button, DrawerItems, FlatList, Text } from "react-native";
import { Ionicons } from "react-native-vector-icons";
import { retrieveProfiles } from './utils';
import { chars } from './utils';

// const CustomDrawerContentComponent = (props) => (
//   <View>
//     <DrawerItems {...props}/>
//   </View>
// );

class CustomDrawerButton extends React.Component {
  navigateToScreen(screenIndex, params) {
    let route = chars[screenIndex].toLowerCase();

    const navigateAction = NavigationActions.navigate({
      routeName: route,
      params: params
    });

    this.props.navigation.dispatch(navigateAction);
  }

  render() {
    return (
      <Button onPress={() => {
        this.navigateToScreen(this.props.screenIndex)
      }} title={this.props.item.name}/>
    )
  }
}

class CustomDrawerContentComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isDisplayed: false};
  };

  componentDidMount() {
    let userProfiles = [
      {'name': 'Church', 'uid': '810ab3dac'},
      {'name': 'Family', 'uid': '90129abae'},
      {'name': 'School', 'uid': '420aba392'}
    ];

    this.setState(
      {
        isDisplayed: true,
        profiles: userProfiles
      }
    );
    
    // retrieveProfiles(
    //   page=1, perPage=20, userUid='9uTP32RsfxP8zDSgrurwRE'
    // ).then(
    //   function(result) {
    //     let userProfiles = JSON.parse(result.your_response);
    //     let userProfiles = [
    //       {'name': 'Church', 'uid': '810ab3dac'},
    //       {'name': 'Family', 'uid': '90129abae'},
    //       {'name': 'School', 'uid': '420aba392'}
    //     ];

    //     this.setState(
    //       {
    //         isDisplayed: true,
    //         profiles: userProfiles
    //       }
    //     );
    //   }.bind(this),

    //   function(error) {
    //     console.log('Error', error);
    //   }
    // )
  }

  render() {
    if (this.state.isDisplayed) {
      return (
        <FlatList data={this.state.profiles} renderItem={
          ({item}) => <CustomDrawerButton item={item}
            screenIndex={this.state.profiles.indexOf(item)}
            navigation={this.props.navigation}/>
        }/>
      )
    }

    return <Text>Loading...</Text>
  }
}

export default drawerNavigator = createDrawerNavigator(
  {
    'a': {
      screen: AppNavigator
    },
    'b': {
      screen: AppNavigator
    },
    'c': {
      screen: AppNavigator
    },
    'd': {
      screen: AppNavigator
    },
    'e': {
      screen: AppNavigator
    },
    'f': {
      screen: AppNavigator
    }
  },
  {
    drawerPosition: 'left',
    contentComponent: CustomDrawerContentComponent
  }
);