import React from 'react';
import { Image, Text, TouchableHighlight, View } from 'react-native';

var styles = require('../styles');

export default class ContactHead extends React.Component {
  render() {
    return (
      <TouchableHighlight onPress={
            () => {
              try {
                conversation = this.props.contact.conversations[0];
              }
              
              catch (error) {
                conversation = null
              }

              this.props.navigation.navigate(
                'Chat', {'conversation': conversation, 'title': this.props.contact.name}
              )
            }
          }>
        <View flex={1} style={{margin: 5, width: 60, alignItems: 'center', alignContent: 'space-between'}}>
          <Image source={{uri: this.props.contact.user.profile_photo}} style={[styles.contactPhoto, {margin: 0}]}/>
          <Text style={{color: '#101010', flex: 1, textAlign: 'center'}} numberOfLines={1}>
            {this.props.contact.name}
          </Text>
        </View>
      </TouchableHighlight>
    )
  }
}