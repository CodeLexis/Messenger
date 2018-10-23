import React from "react";
import { Picker, TextInput, ToastAndroid, View } from "react-native";
import { Button, LoadingIndicator } from "../components";
import { handleError } from "../utils";
import { doAddUserToProfile, retrieveProfiles } from "../apiWrapper";

var styles = require('../styles.js');

export class AddUserScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isMounted: false, name: null, code: null};
  }

  static navigationOptions = ({ navigation }) => ({
    title: 'Add Contact'
  })

  addUser() {
    doAddUserToProfile(
      this.state.profile.uid, this.state.code, 
      this.state.name, phone=null, fromScan=false);
  }

  componentDidMount() {
    retrieveProfiles().then(
      function(result) {
        if (result.length === 1) {
          let { navigate } = this.props.navigation;
          navigate('Home');

          ToastAndroid.show('Create a Profile first!', ToastAndroid.SHORT);
        }

        else {
          this.setState({profiles: result, isMounted: true})
        }
      }.bind(this),

      function(errs) {
        handleError(errs);
      }
    )
  }

  render() {
    let userProfilesPicker;

    if (!this.state.isMounted) {
      return (
        <LoadingIndicator/>
      )
    }

    this.state.profiles.forEach((profile, index) => {
      userProfilesPicker  += <Picker.Item label={profile.name} value={profile.uid} />
    });

    return (
      <View style={{padding:10, justifyContent:'space-between', height: 160}}>
        <TextInput style={[styles.textInput, margin=20, padding=10]} onChangeText={(text) => this.setState({name: text})} placeholder='Name'/>
        <TextInput style={[styles.textInput, margin=20, padding=10]} onChangeText={(text) => this.setState({code: text})} placeholder='Code'/>
        {/* <Picker
            selectedValue={this.state.profileName}
            onValueChange={(itemValue, itemIndex) => this.setState({profileName: itemValue})}>
          {userProfilesPicker}
        </Picker> */}
        <Button title="Add" style={styles.sentMessageBubble} onPress={this.addUser.bind(this)} active={this.state.name != null}/>
      </View>
    )
  }
}