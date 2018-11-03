import React from 'react';
import { AsyncStorage, Image, Text, TouchableHighlight, View } from 'react-native';
import { normalizeDate } from '../utils.js';
import LoadingIndicator from './loadingIndicator.js';

const styles = require('../styles.js');

export default class ConversationStrip extends React.Component {
  constructor(props) {
    super(props)

    this.state = {isMounted: false}
  }

  componentDidMount() {
    AsyncStorage.getItem('user').then(
      function(result) {
        result = JSON.parse(result);

        this.user = result
        this.setState({isMounted: true})
      }.bind(this)
    )
  }

  render() {
    if (!this.state.isMounted) {
      return <View></View>
    }

    let { navigate } = this.props.navigation;
    let { conversation } = this.props;

    this.conversation = conversation

    lastMessage = conversation.messages.items[0]
    
    messageMeta = conversation.messages.meta

    lastMessageText = lastMessage.text
    lastMessageTimeNormalized = normalizeDate(lastMessage.created_at);

    lastMessageTime = `${lastMessageTimeNormalized[0]}${lastMessageTimeNormalized[1].toLowerCase()[0]} ago`

    // try {
    //   lastMessageText = conversation.messages[0].text
    //   lastMessageTimeNormalized = normalizeDate(conversation.messages[0].created_at);

    //   lastMessageTime = `${lastMessageTimeNormalized[0]}${lastMessageTimeNormalized[1].toLowerCase()[0]} ago`
    // }
    // catch (error)  {
    //   console.log(conversation.messages[0])

    //   lastMessageText = `Say hello to ${conversation.participants[0].name}`
    //   lastMessageTime = ''
    // }

    return (
      <TouchableHighlight onPress={
        () => {            
            navigate('Chat', {'conversation': conversation, 'title': this.conversationTitle})
          }
        }>

        <View style={styles.conversationStrip}>
          {/* select group image if conversation is a group conversation */}
          <Image source={{uri: this.getConversationAvatar()}}
                 style={styles.contactPhoto}/>
          <View style={{width: '65%', paddingLeft: 5}}>
            <Text style={styles.contactName}>{this.getConversationName()}</Text>
            <Text style={lastMessage.read ? styles.conversationStripReadMessage : styles.conversationStripUnreadMessage}>{lastMessageText}</Text>
          </View>
          <Text style={styles.conversationStripTime}>{lastMessageTime}</Text>
        </View>
      </TouchableHighlight>
    )
  }

  getConversationAvatar() {
    if (this.conversation.category.name === 'Private Conversation') {
      this.otherParticipants = this.conversation.participants.filter(
        (value, index, array) => {
          return value.user.uid !== this.user.uid
        }
      )

      this.conversationAvatar = this.otherParticipants[0].user.profile_photo
    }

    return this.conversationAvatar
  }

  getConversationName() {
    this.otherParticipants = this.conversation.participants.filter(
      (value, index, array) => {
        return value.user.uid !== this.user.uid
      }
    )

    if (this.otherParticipants.length >= 1) {
      this.conversationTitle = this.otherParticipants[0].user.name
      return this.conversationTitle
    }

    return ""
  }
}