import React from 'react';
import { createDrawerNavigator, NavigationActions } from 'react-navigation';
import { AppNavigator } from './screens';
import { Button, FlatList } from "react-native";
import { Icons } from "react-native-vector-icons/Ionicons";
import { retrieveProfiles } from './utils';
import { chars } from './utils';
import { LoadingIndicator } from './components';

// const CustomDrawerContentComponent = (props) => (
//   <View>
//     <DrawerItems {...props}/>
//   </View>
// );

class CustomDrawerButton extends React.Component {
  navigateToScreen(screenIndex, params) {
    let route = chars[screenIndex];

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
    retrieveProfiles(
      page=1, perPage=20, userUid='9uTP32RsfxP8zDSgrurwRE'
    ).then(
      function(result) {
        this.setState({isDisplayed: true, profiles: result})
      }.bind(this)
    )
  }

  render() {
    if (this.state.isDisplayed) {
      return (
        <FlatList data={this.state.profiles} keyExtractor={(item, index) => item.uid} renderItem={
          ({item}) => <CustomDrawerButton item={item}
            screenIndex={this.state.profiles.indexOf(item)}
            navigation={this.props.navigation}/>
        }/>
      )
    }

    return <LoadingIndicator/>
  }
}

export default drawerNavigator = createDrawerNavigator(
  {
    'A': {
      screen: AppNavigator
    },
    'B': {
      screen: AppNavigator
    },
    'C': {
      screen: AppNavigator
    },
    'D': {
      screen: AppNavigator
    },
    'E': {
      screen: AppNavigator
    },
    'F': {
      screen: AppNavigator
    }
  },
  {
    drawerPosition: 'left',
    contentComponent: CustomDrawerContentComponent
  }
);