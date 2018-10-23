import React from 'react';
import {Image, Text, View} from 'react-native';

const styles = require('../styles.js');

export default class MessageBubble extends React.Component {
  constructor(props) {
    super(props)
    state = {}
  }

  render() {
    let { message } = this.props;

    if (message.sender.uid === this.props.user.uid) {
      return (
        <View style={{flexDirection:'row', flexWrap:'wrap', justifyContent: 'flex-end'}}>
          <View style={[styles.sentMessageBubble, {backgroundColor: this.props.backgroundColor}]}>
            <Text style={styles.sentMessageText}>{message.text}</Text>
          </View>
        </View>
      )
    }

    else {
      return (
        <View style={{flexDirection:'row', flexWrap:'wrap'}}>
          <Image source={{uri: message.sender.profile_photo}}
                 style={{width: 40, height: 40, margin: 5, borderRadius: 32.5}}/>
          <View style={styles.receivedMessageBubble}>
            <Text style={styles.receivedMessageText}>{message.text}</Text>
          </View>
        </View>
      )
    }
  }
}