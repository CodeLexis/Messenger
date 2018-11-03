import Ionicons from 'react-native-vector-icons/Ionicons';
import React from "react";
import SyncStorage from 'sync-storage';
import { AsyncStorage, FlatList, Text, TextInput, View } from "react-native";
import PopupDialog from 'react-native-popup-dialog';
import timer from 'react-native-timer';
import { appIcon, appName, pageLimit } from "../constants";
import { MessageBubble, LoadingIndicator } from "../components";
import { doCreateProfileConversation, retrieveContactConversations, retrieveConversationMessages, doSendTextMessage, retrieveProfiles } from "../apiWrapper";
import { chars } from '../utils';

const styles = require('../styles.js');

class HeaderRight extends React.Component {
  constructor(props) {
    super(props)

    this.state = {modalVisible: false}
  }

  render() {
    return (
      <View style={styles.rowContainer}>
        <PopupDialog
          ref={(popupDialog) => { this.popupDialog = popupDialog; }}>
          <View>
            <Text onPress={() => this.popupDialog.dismiss()}>Dismiss</Text>
          </View>
        </PopupDialog>
        
        <Ionicons name='ios-chatbubbles' size={22} style={{marginRight: 15}} onPress={() => console.log('YAGA')}/>
        <Ionicons name='md-create' size={22} style={{marginRight: 15}} onPress={
            () => (
              AsyncStorage.multiGet(['user', 'profiles'], (errs, result) => {
                if (!errs) {
                  contact = null
                  profiles = JSON.parse(result[1][1])
                  user = JSON.parse(result[0][1])

                  this.conversation = this.props.navigation.state.params.conversation
                  
                  otherParticipants = this.conversation.participants.filter(
                    (value, index, array) => (value.user.uid !== user.uid)
                  )
          
                  userParticipant = this.conversation.participants.filter(
                    (value, index, array) => (value.user.uid === user.uid)
                  )[0]
          
                  this.props.navigation.navigate(
                    'EditContact', {'contact': userParticipant.contact, 'profile': userParticipant.profile, 'profiles': profiles, 'user': user}
                  )
                }
              })
            )
          }/>
      </View>
    )
  }

  dismissPopup() {
    this.popupDialog.dismiss()
  }

  showPopup() {
    this.popupDialog.show()
  }
}

export class ChatScreen extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      hasMessageContent: false,
      messages: null, 
      page: 1,
      isMounted: false,
      otherParticipants: [],
      ...props.navigation.state.params,
      conversation: props.navigation.state.params.conversation
    }

    if (this.state.conversation) {
      AsyncStorage.getItem('user').then(
        function(result) {
          user = JSON.parse(result);
  
          otherParticipants = this.state.conversation.participants.filter(
            (value, index, array) => {return value.uid !== user.uid}
          )
  
          this.setState({
            otherParticipants: otherParticipants
          })
        }.bind(this)
      )
    }
  }
  
  static navigationOptions = ({ navigation }) => {
    selectedProfile = SyncStorage.get('selected_profile')

    return {
      title: `${navigation.state.params.title}`,
      headerRight: <HeaderRight navigation={navigation}/>,
      headerStyle: {
        backgroundColor: selectedProfile.theme_color,
      },
    }
  };

  displayContactConversations() {
    retrieveContactConversations(
      page=1, perPage=10, cachedProfileIndex=1, contactUid=this.state.otherParticipants[0].uid, refresh=true).then(
        function(result) {
          // TODO do something with this data
        }
      )
  }

  displayConversationMessages(refresh=true) {
    AsyncStorage.multiGet(['user', 'profiles', 'active_profile_index'], (errs, result) => {
      if (!errs) {
        user = JSON.parse(result[0][1])
        profiles = JSON.parse(result[1][1]);
        activeProfileIndexAlphabet = result[2][1];

        this.profileIndex = chars.indexOf(activeProfileIndexAlphabet);
        profile = profiles[this.profileIndex];

        if (this.state.conversation) {
          retrieveConversationMessages(
            page=1, perPage=pageLimit, cachedProfileIndex=this.profileIndex, conversationUid=this.state.conversation.uid, refresh=true
          ).then(
            function(result) {
              result.reverse();

              this.setState(
                {
                  isMounted: true,
                  user: user,
                  messages: result
                }
              );
            }.bind(this)
          )
        }
      }
    })
  }

  componentDidMount() {
    timer.clearInterval('displayConversationMessages');
    
    this.displayConversationMessages.bind(this)(refresh=false);
    timer.setInterval(
      'displayConversationMessages', this.displayConversationMessages.bind(this), 1000);

    this.selectedProfile = SyncStorage.get('selected_profile') || {}

    // if (this.state.conversation.category.name === 'Private Conversation') {
    //   // this.displayContactConversations.bind(this)(refresh=false);
     
    //   // TODO fix bug
    //   // timer.setInterval( 
    //   //   'displayContactConversations', this.displayContactConversations.bind(this), 1000);
    // }
  }

  componentWillUnmount() {
    timer.clearInterval('displayConversationMessages');
  }

  sendTextMessage() {
    if (!this.state.hasMessageContent) {
      return
    }

    if (!this.state.conversation) {
      doCreateProfileConversation(this.profileIndex, title=null, category='Private Conversation', participants=[this.state.otherParticipants]).then(
        function(result) {
          this.setState({conversation: result})
          doSendTextMessage(this.profileIndex, this.state.conversation.uid, this.state.currentMessageText)
          retrieveProfiles(page=1, perPage=pageLimit, refresh=true);
        }.bind(this)
      )
    }

    else {
      doSendTextMessage(this.profileIndex, this.state.conversation.uid, this.state.currentMessageText)
    }

    this.textInput.clear();
  }

  render() {
    if (!this.state.isMounted) {
      return <LoadingIndicator/>
    }

    if (this.state.messages && this.state.messages.length > 0) {
      widget = <FlatList style={{height: '90%'}} contentContainerStyle={{justifyContent: 'space-between', paddingBottom: 5}} data={this.state.messages} keyExtractor={(item, index) => item.uid} renderItem={
        ({item}) => <MessageBubble backgroundColor={this.selectedProfile.theme_color} user={this.state.user} message={item} navigation={this.props.navigation}/>
      }/>
    }
    else {
      widget = <Text style={{color: '#404040', height:'90%', textAlignVertical: 'center', textAlign: 'center'}}>
        Say "hello" to {this.props.navigation.state.params.conversation.title}!
      </Text>
    }

    return (
      <View style={styles.container}>
        {widget}

        <View style={styles.messageInputContainer}>
          <Ionicons name='md-add-circle' style={{paddingLeft: 5, paddingRight: 5}} size={30}/>
          <TextInput style={[styles.textInput, {width: '80%'}]} multiline={true} placeholder='Write a message...'
            ref={input => { this.textInput = input }} 
            onChangeText={(text) => {
              this.setState({'currentMessageText': text}),
              this.updateSendIconColor(text)
            }
          }/>
          <Ionicons name='md-send' size={30} style={{paddingLeft: 5, paddingRight: 5}} color={`${this.state.hasMessageContent ? this.selectedProfile.theme_color : 'gray'}`}  onPress={this.sendTextMessage.bind(this)}/>
        </View>
      </View>
    )
  }

  updateSendIconColor(text) {
    if (text.length > 0) {
      this.setState({hasMessageContent: true});
    }

    else {
      this.setState({hasMessageContent: false})
    }
  }
}