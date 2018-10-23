import React from "react";
import { Ionicons } from "react-native-vector-icons";
import { AsyncStorage, Picker, TextInput, ToastAndroid, View } from "react-native";
import { ColorPicker } from 'react-native-status-color-picker';
import { Button } from "../components";
import { colors, pageLimit } from "../constants";
import { callCreateProfile, retrieveProfiles } from "../apiWrapper";

var styles = require('../styles.js');


class ProceedButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {show: true};
  }

  render() {
    if (this.state.show) {
      return <Ionicons name='ios-checkmark-circle' size={40} style={{marginRight: 15}}
        onPress={this.props.onPress}/>
    }
    return <View/>
  } 
}


export class AddProfileScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isMounted: false, name: null, description: null, inviteCode: null, themeColor: null};
  }

  static navigationOptions = ({ navigation }) => ({
    title: 'Create a Profile',
    headerRight: (
      <ProceedButton onPress={
        () => AsyncStorage.multiGet(['add_profile_name', 'add_profile_description', 'invite_code', 'theme_color'], 
          (errs, result) => {
            if (!errs) {
              if (result !== null) {
                name = result[0][1];
                description = result[1][1];
                inviteCode = result[2][1];
                themeColor = result[3][1];
                alertPreference = {
                  'mail_alerts': false,
                  'interval': 'INSTANTLY'
                }
                
                callCreateProfile(name, description, inviteCode, themeColor, alertPreference)
                retrieveProfiles(page=1, perPage=pageLimit, refresh=true)

                navigation.push('Home');
                navigation.openDrawer();
              }
            }
          }
        )
      }/>
    )
  });

  doCreateProfile() {
    try {
      callCreateProfile(
        this.state.name, this.state.description, 
        this.state.inviteCode, this.state.themeColor,
        {
          'mail_alerts': false,
          'interval': 'INSTANTLY'
        }
      )
    }
    
    catch (error) {
      ToastAndroid.show('An error occured!', ToastAndroid.SHORT);
    }
  }

  render() {
    return (
      <View style={[styles.container, styles.form, {flex: .75}]}>
        <View style={styles.formDiv}>
        <Text style={styles.label}>Name</Text>
        <TextInput style={[styles.title, styles.textInput]} 
            onChangeText={(text) => AsyncStorage.setItem('add_profile_name', text)} placeholder='Name' defaultValue={profile.name}/>
      </View>

      <View>
        <Text style={styles.label}>Description</Text>
        <TextInput style={styles.textInput} 
          onChangeText={(text) => AsyncStorage.setItem('add_profile_description', text)} placeholder='Description' defaultValue={profile.description}/>
      </View>

      <View>
        <Text style={styles.label}>Codename</Text>
        <TextInput style={styles.textInput} 
          onChangeText={(text) => AsyncStorage.setItem('invite_code', text)} placeholder='Codename' defaultValue={profile.inviteCode}/>
      </View>
      
      <ColorPicker colors={colors.profileColors} 
        selectedColor={colors.profileColors[0]}
        onSelect={(color) => AsyncStorage.setItem('theme_color', color)}/>
      </View>
    )
  }
}