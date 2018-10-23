import React from 'react';
import { AsyncStorage, Text, TextInput, View } from 'react-native';
import { ColorPicker } from 'react-native-status-color-picker';
import { colors } from '../constants';

var styles = require('../styles')

export class EditProfileScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isMounted: false, name: null, code: null};
  }

  static navigationOptions = ({navigation, navigationOptions}) => ({
    title: navigation.state.params.profile.name,
    headerStyle: {
      backgroundColor: '#ffffff'
    }
  })

  render() {
    const { navigation } = this.props;

    profile = navigation.state.params.profile;

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
    </View>
  }

}