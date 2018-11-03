import React from 'react';
import SyncStorage from 'sync-storage';
import { createDrawerNavigator, NavigationActions, DrawerItems } from 'react-navigation';
import { AppNavigator } from './screens';
import { AsyncStorage, Button, FlatList, Image, Text, TouchableHighlight, 
  TouchableNativeFeedback, View } from "react-native";
import { colors, iconSize } from './constants';
import { Ionicons } from "react-native-vector-icons";
import { retrieveProfiles, retrieveUser } from './apiWrapper';
import { chars, runRefreshes, runSetupScripts } from './utils';
import { LoadingIndicator } from './components';

var styles = require('./styles.js');

selected = [];

// TODO remove this in production
// runSetupScripts();

// always on
runRefreshes();

class BasicFlatList extends React.Component {
  constructor(props) {
    super(props)
    
    this.state = {
      selected: (new Map()) //iterable object with string:boolean key:value pairs
    }
  }
  
  onPressAction = (key) => {
    this.setState((state) => {
      //create new Map object, maintaining state immutability
      const selected = new Map(state.selected);
      //remove key if selected, add key if not selected
      this.state.selected.has(key) ? selected.delete(key, !selected.get(key)) : selected.set(key, !selected.get(key));
      return {selected};
    });
  }
  
  renderRow = (item) => {
    return (<CustomDrawerButton item={item}
      screenIndex={this.props.data.indexOf(item)}
      navigation={this.props.navigation}
      onPress={this.onPressAction}
      selected={!!this.state.selected.get(item.key)} />)
  }

  render() {
    return (
      <FlatList style={styles.container}
        data={this.props.data}
        renderItem={({ item }) => (
          this.renderRow(item)
        )}
        extraData={this.state}
      />
    );
  }
}

class CustomDrawerButton extends React.Component {
  constructor(props) {
    super(props);
    
    this.item = props.item;

    this.state = {activeProfileIndex: null, marked: false, selected: false, screenIndex: props.screenIndex, ...props};
  }

  componentDidMount() {
    AsyncStorage.multiGet(['active_profile_index', 'user'], (errs, result) => {
      if (!errs) {
        activeProfileIndex = result[0][1];
        
        user = JSON.parse(result[1][1])
        this.profiles = user.profiles

        this.setState({activeProfileIndex: chars.indexOf(this.activeProfileIndex)})
        // this.navigateToScreen(this.props.screenIndex)
      }
    })
  }

  navigateToScreen(screenIndex, params) {
    let route = chars[screenIndex];

    const navigateAction = NavigationActions.navigate({
      routeName: route,
      params: params || this.item
    });

    this.props.navigation.dispatch(
      navigateAction
    );
    this.props.navigation.closeDrawer();
  }

  navigateToAddProfileScreen() {
    const navigateAction = NavigationActions.navigate({
      routeName: 'AddProfile'
    });

    this.props.navigation.dispatch(navigateAction);
    this.props.navigation.closeDrawer();
  }

  navigateToEditProfileScreen() {
    const navigateAction = NavigationActions.navigate({
      routeName: 'EditProfile',
      params: {'profile': this.item}
    });

    this.props.navigation.dispatch(navigateAction);
    this.props.navigation.closeDrawer();
  }

  render() {
    if (!this.props.isCreateProfileButton) {

      selectedProfile = SyncStorage.get('selected_profile') || {}

      if (this.item.allows_edit) {
        widget = ( 
          <Ionicons name={'ios-settings-outline'} size={20} 
            color={selectedProfile.uid === this.item.uid ? this.item.theme_color : colors.darkGrey} 
            onPress={this.navigateToEditProfileScreen.bind(this)}/>
        )
      }

      else {
        widget = null
      }

      if (this.state.screenIndex === 0 && !this.state.marked) {        
        SyncStorage.set('selected_profile', this.item)
        
        this.setState({selected: true, marked: true});  // so this item to re-render
        this.item['update'] = true
        this.navigateToScreen(this.props.screenIndex, this.item);
      }

      totalUnreadCount = 0
      this.item.conversations.map(
        (value, index, array) => {
          totalUnreadCount += value.messages.meta.unread_messages_count
        }
      )

      if (totalUnreadCount !== 0) {
        totalUnreadCount = `(${totalUnreadCount})`
      }
      else {
        totalUnreadCount = ''
      }
      
      return (
        <View backgroundColor={selectedProfile.uid === this.item.uid ? colors.grey : '#ffffff'} style={[styles.rowContainer, {'alignItems': 'center', borderTopWidth: 1, borderColor: '#c0c0c0', width: '100%'}]}>
          <TouchableHighlight style={{width: '90%'}} onPress={
              () => {
                  SyncStorage.set('selected_profile', this.item)

                  this.setState({selected: true});  // so this item to re-render
                  this.props.onPress.bind(this)()
                  this.navigateToScreen(this.props.screenIndex);
                }
              }>
            <Text style={{fontWeight: selectedProfile.uid === this.item.uid ? 'bold' : 'normal', padding: 10, color: selectedProfile.uid === this.item.uid ? this.item.theme_color : '#000000'}}>
              {this.props.item.name} {totalUnreadCount}
            </Text> 
          </TouchableHighlight>

          {widget}
        </View>
      )
    }

    else {
      return (
        <View backgroundColor={colors.appBarBackgroundColorLight}>
          <TouchableHighlight onPress={this.navigateToAddProfileScreen.bind(this)} underlayColor={'red'}>
            <Ionicons name="md-add" color={colors.appBarBackgroundColor}
              size={iconSize} style={{alignSelf: 'center', padding: 10}}
              />
          </TouchableHighlight>
        </View>
      )
    }
  }
}

class CustomDrawerContentComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isDisplayed: false, selected: new Map(), user: {}};
  };

  onPressAction = (key) => {
    this.setState((state) => {
      //create new Map object, maintaining state immutability
      const selected = new Map(state.selected);
      //remove key if selected, add key if is not selected
      this.state.selected.has(key) ? selected.delete(key, !selected.get(key)) : selected.set(key, !selected.get(key));
      return {selected};
    });
  }

  componentDidMount() {    
    AsyncStorage.getItem('user').then(
      function(result) {
        result = JSON.parse(result);

        retrieveUser(result.uid, refresh=true).then(
          function(result) {
            this.setState({user: result, isDisplayed: true})
          }.bind(this)
        )
      }.bind(this)
    );

    retrieveProfiles( 
      page=1, perPage=20, refresh=true
    ).then(
      function(result) {
        this.setState({profiles: result})
      }.bind(this)
    )
  }

  refresh() {
    this.setState({isDisplayed: false})
    retrieveProfiles( 
      page=1, perPage=20, refresh=true
    ).then(
      function(result) {
        this.setState({profiles: result, isDisplayed: true})
      }.bind(this)
    )
  }

  render() {
    if (this.state.isDisplayed) {

      return (
        <View style={[styles.container]}>
          <Image style={{height:'30%'}} source={{uri: this.state.user.profile_photo}}/>

          {/* <BasicFlatList data={this.state.profiles} navigation={this.props.navigation}/>  */}
          
          <FlatList extraData={this.state} data={this.state.profiles} keyExtractor={(item, index) => item.uid} renderItem={
            ({item}) => <CustomDrawerButton item={item}
              navigation={this.props.navigation}
              onPress={this.onPressAction}
              parent={this}
              screenIndex={this.state.profiles.indexOf(item)}
              selected={!!this.state.selected.get(item.key)}
              profiles={this.state.profiles}/>
          }/>
          
          <CustomDrawerButton navigation={this.props.navigation} isCreateProfileButton={true} screenIndex={0}/>
          <Button title='Refresh' onPress={this.refresh.bind(this)}/>

        </View>
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