import React from 'react';
import { AsyncStorage, Button, Picker, Text, TextInput, View } from 'react-native';
import { colors } from '../constants';
import { LoadingIndicator } from '../components';
import { doUpdateContactDetails } from '../apiWrapper';

var styles = require('../styles')

export class EditContactScreen extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      isMounted: false, 
      name: null, 
      code: null, 
      selectedProfile: null, 
      saveButtonText: 'SAVE', 
      saveButtonStyle: styles.button
    };
  }

  static navigationOptions = ({navigation, navigationOptions}) => ({
    title: 'Edit Contact',
    headerStyle: {
      backgroundColor: '#ffffff'
    }
  })

  componentDidMount() {
    switch (this.props.navigation.state.params.previousScreen) {
      case 'Notifications':
        this.setState(
          {
            isMounted: true,
            selectedProfile: `${this.props.navigation.state.params.profile ? 
              this.props.navigation.state.params.profile.name : this.props.navigation.state.params.profiles[0].name}`,
            ...this.props.navigation.state.params
          }
        )
        break

      default:
        this.setState(
          {
            isMounted: true, 
            selectedProfile: `${this.props.navigation.state.params.profile ? 
              this.props.navigation.state.params.profile.name : this.props.navigation.state.params.profiles[0].name}`, 
            ...this.props.navigation.state.params
          }
        )
    }

    // this.conversation = this.props.navigation.state.params.conversation
    AsyncStorage.getItem('profiles').then(
      function (result) {
        result = JSON.parse(result)
        this.setState({profiles: result})
      }.bind(this)
    )

    // AsyncStorage.multiGet(['user', 'profiles'], (errs, result) => {
    //   if (!errs) {
    //     contact = null
    //     profiles = JSON.parse(result[1][1])
    //     user = JSON.parse(result[0][1])
        
    //     otherParticipants = this.conversation.participants.filter(
    //       (value, index, array) => (value.user.uid !== user.uid)
    //     )

    //     userParticipant = this.conversation.participants.filter(
    //       (value, index, array) => (value.user.uid === user.uid)
    //     )[0]

    //     this.setState({
    //       contact: userParticipant.contact,
    //       profile: userParticipant.profile,
    //       isMounted: true,
    //       profiles: profiles,
    //       user: user,
    //       selectedProfile: userParticipant.profile.name
    //     })
    //   }
    // })
  }

  saveNewDetails() {
    selectedProfileObject = this.state.profiles.filter((value, index, array) => {
      return value.name === this.state.selectedProfile
    })[0]

    doUpdateContactDetails(
      this.state.profile.uid, 
      this.state.contact.uid, 
      {name: this.name, profile_uid: selectedProfileObject.uid}
    ).then(
      function(result) {
        if (!result) {
          // Toast "error occured"
        }

        this.props.navigation.navigate('Chat')
        // this.saveButton.setNativeProps({style: styles.button, text: 'SAVE'})
      }.bind(this)
    )

    this.setState({saveButtonText: 'Loading...', saveButtonStyle: styles.loadingButton})
    // this.saveButton.setNativeProps({style: styles.loadingButton, text: 'Loading...'});
  }

  render() {
    const { navigation } = this.props;

    conversation = navigation.state.params.conversation;

    if (!this.state.isMounted) {
      return <LoadingIndicator/>
    }

    let pickerItems = [];
    this.state.profiles.forEach(
      (value, index, array) => {
        pickerItems.push(<Picker.Item label={value.name} value={value.name}/>)
      }
    )

    return (
      <View style={[styles.container, styles.form, {'flex': .4}]}>
        <View style={styles.formDiv}>
          <Text style={styles.label}>Name</Text>
          <TextInput style={[styles.title, styles.textInput]} 
              onChangeText={(text) => {
                this.name = text
              }} placeholder='Name' defaultValue={this.state.contact.name}/>
        </View>

        <View>
          <Text style={styles.label}>Profile</Text>
          <Picker
              selectedValue={this.state.selectedProfile}
              style={{ height: 50, width: '100%' }}
              onValueChange={(itemValue, itemIndex) => this.setState({selectedProfile: itemValue})}>
            {pickerItems}
          </Picker>
        </View>

        <Button style={this.state.saveButtonStyle} title={this.state.saveButtonText} ref={button => { this.saveButton = button }} onPress={this.saveNewDetails.bind(this)}/>
      </View>
    )
  }
}