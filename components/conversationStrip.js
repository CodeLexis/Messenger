import React from 'react';
import {Image, Text, TouchableHighlight, View} from 'react-native';

const styles = require('../styles.js');

export default class ConversationStrip extends React.Component {
  render() {
    let {navigate} = this.props.navigation;
    let {conversation} = this.props;

    return (
      <TouchableHighlight onPress={
        () => navigate('Chat', {'participant': conversation.participants[1]})}>

        <View style={styles.conversationStrip}>
          <Image source={{uri: conversation.participants[1].profile_photo_url}}
                 style={{width: 50, height: 50, margin: 5, borderRadius: 32.5}}/>
          <View style={{width: '60%'}}>
            <Text style={styles.contactName}>{conversation.participants[1].name}</Text>
            <Text style={styles.conversationStripMessage}>{conversation.messages[0].text}</Text>
          </View>
          <Text style={styles.conversationStripTime}>{conversation.messages[0].created_at}</Text>
        </View>
      </TouchableHighlight>
    )
  }
}