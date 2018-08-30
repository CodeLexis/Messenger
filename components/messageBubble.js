import React from 'react';
import {Image, Text, View} from 'react-native';

const styles = require('../styles.js');

export default class MessageBubble extends React.Component {
  render() {
    let {message} = this.props;

    if (message.sent) {
      return (
        <View style={{flexDirection:'row', flexWrap:'wrap', justifyContent: 'flex-end'}}>
          <View style={styles.sentMessageBubble}>
            <Text style={styles.sentMessageText}>{message.text}</Text>
          </View>
        </View>
      )
    }

    else {
      return (
        <View style={{flexDirection:'row', flexWrap:'wrap'}}>
          <Image source={{uri: message.sender.profile_photo_url}}
                 style={{width: 40, height: 40, margin: 5, borderRadius: 32.5}}/>
          <View style={styles.receivedMessageBubble}>
            <Text style={styles.receivedMessageText}>{message.text}</Text>
          </View>
        </View>
      )
    }
  }
}