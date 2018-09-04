'use strict';

var React = require('react-native');

var { StyleSheet } = React;

module.exports = StyleSheet.create({
  activityOrMoodIcon: {
    height: 37,
    width: 37,
    marginLeft: '3%',
    marginTop: '10%'
  },
  alwaysRed: {
    backgroundColor: 'red',
    height: 100,
    width: 100,
  },
  container: {
    flex: 1
  },
  contactStrip: {
    flexDirection:'row',
    flexWrap:'wrap'
  },
  conversationStrip: {
    alignItems: 'center',
    backgroundColor: '#ffffff',
    flexDirection:'row',
    flexWrap:'wrap',
    padding: 5,
    marginTop: 1
  },
  contactName: {
    fontWeight: 'bold'
  },
  conversationStripMessage: {
    color: '#a0a0a0'
  },
  conversationStripTime: {
    color: '#a0a0a0'
  },
  icon: {
    marginTop: 10,
    paddingLeft: '20%'
  },
  item: {
    backgroundColor: '#CCC',
    margin: 10,
    width: 100,
    height: 100
  },
  list: {
    // alignItems: 'center',
    flex: 1,
    width: '100%'
  },
  messageInput: {
    backgroundColor: '#ffffff',
    borderRadius: 5,
    width: '90%'
  },
  messageInputContainer: {
    alignItems: 'center',
    backgroundColor: '#ffffff',
    flexDirection:'row',
    padding: 5,
    height: '10%'
  },
  noContentContainer: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  postActionBar: {
    flexDirection:'row',
    flexWrap:'wrap',
    justifyContent: 'space-between',
    top: 10,
    paddingBottom: 7
  },
  receivedMessageBubble: {
    backgroundColor: '#b0b0b0',
    borderRadius: 5,
    padding: 8,
    margin: 5,
    marginBottom: 0,
    marginLeft: 0
  },
  receivedMessageText: {
    textAlign: 'left'
  },
  rowContainer: {
    flexDirection:'row',
    flexWrap:'wrap'
  },
  screen: {
    flex: 1,
    backgroundColor: '#2020'
  },
  sentMessageBubble: {
    backgroundColor: '#aa019a',
    borderRadius: 5,
    padding: 8,
    margin: 5,
    marginBottom: 0
  },
  sentMessageText: {
    textAlign: 'right'
  },
  staticScroll: {
    flex: 2,
    backgroundColor: '#ff0'
  },
  timelinePost: {
    flex: 1,
    backgroundColor: '#e9e9e9',
    borderRadius: 5,
    margin: 5,
    padding: 15,
    alignSelf: 'stretch',
    flexWrap:'wrap'
    // justifyContent: 'space-between'
  },
  timelinePostShortTime: {
    fontWeight: 'normal',
    alignSelf: 'center',
    left: 124,
    color: '#999999'
  },
  timelinePostText: {
    fontWeight: 'normal',
    alignSelf: 'center',
    top: 3,
    color: '#202020'
  },
  // timelinePostText: {
  //   top: 4,
  //   color: '#404040'
  // },
  username: {
    fontWeight: 'bold',
    alignSelf: 'center',
    // marginTop: 10,r
    marginLeft: 10
  },
  usernameBar: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  usernameSub: {
    fontWeight: 'normal',
    alignSelf: 'center',
    margin: 10,
    color: '#999999'
  },
  toolbarAndroid: {
    borderWidth: 10,
    borderColor: '#400'
  }
});