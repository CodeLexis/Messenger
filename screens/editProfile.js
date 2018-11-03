import React from 'react';
import { AsyncStorage, Button, Text, TextInput, View } from 'react-native';
import { ColorPicker } from 'react-native-status-color-picker';
import { colors } from '../constants';
import { doEditProfile, retrieveProfiles } from '../apiWrapper';

var styles = require('../styles')

export class EditProfileScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isMounted: false, name: null, code: null, saveButtonText: 'Save'};
  }

  static navigationOptions = ({navigation, navigationOptions}) => ({
    title: navigation.state.params.profile.name,
    headerStyle: {
      backgroundColor: '#ffffff'
    }
  })

  saveNewDetails() {
    AsyncStorage.multiGet(['add_profile_name', 'add_profile_description', 'invite_code', 'theme_color']).then(
      function(result) {
        name = result[0][1]
        description = result[1][1]
        inviteCode = result[2][1]
        themeColor = result[3][1]

        doEditProfile(
          this.profile.uid,
          name,
          description,
          inviteCode,
          themeColor
        ).then(
          function(result) {
            if (!result) {
              ToastAndroid.show('Done', ToastAndroid.SHORT);
            }

            this.props.navigation.goBack()
          }.bind(this)
        )
      }.bind(this)
    )
    
    // this.saveButton.setNativeProps({style: styles.loadingButton, text: 'Loading...'});
  }

  render() {
    const { navigation } = this.props;

    this.profile = profile = navigation.state.params.profile;

    return <View style={[styles.container, styles.form, {'flex': .75}]}>
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

      <Button style={this.state.saveButtonStyle} title={this.state.saveButtonText} ref={button => { this.saveButton = button }} onPress={this.saveNewDetails.bind(this)}/>
    </View>
  }

}