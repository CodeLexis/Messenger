'use strict';

var React = require('react-native');
var { colors } = require('./constants');
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
  button: {
    width: '100%',
    padding: 10
  },
  container: {
    flex: 1
  },
  contactPhoto: {
    width: 45, 
    height: 45, 
    margin: 5, 
    borderRadius: 32.5
  },
  contactStrip: {
    flexDirection:'row',
    flexWrap:'wrap'
  },
  conversationStrip: {
    alignItems: 'center',
    alignContent: 'space-between',
    backgroundColor: '#ffffff',
    flexDirection:'row',
    flexWrap:'wrap',
    padding: 5,
    marginTop: 1
  },
  contactName: {
    fontWeight: 'bold'
  },
  conversationStripReadMessage: {
    color: '#a0a0a0'
  },
  conversationStripUnreadMessage: {
    color: '#000000',
    fontWeight: 'bold'
  },
  conversationStripTime: {
    color: '#a0a0a0',
    textAlign: 'right',
    marginLeft: 5
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
  label: {
    color: colors.darkGrey
  },
  loadingButton: {
    padding: 50,
    backgroundColor: 'transparent'
  },
  list: {
    // alignItems: 'center',
    flex: 1,
    width: '100%'
  },
  messageInput: {
    backgroundColor: '#ffffff',
    borderRadius: 5,
    padding: 10
  },
  messageInputContainer: {
    alignItems: 'center',
    backgroundColor: '#ffffff',
    flexDirection:'row',
    padding: 5,
    height: '10%'
  },
  momentItemIcon: {
    height: 50,
    width: 50,
    margin: 2
  },
  momentImage: {
    height: 300
  },
  momentText: {
    
  },
  momentTile: {
    backgroundColor: 'white',
    marginTop: 10,
    paddingBottom: 10,
    alignContent: 'space-between'
  },
  momentType: {
    color: '#9090aa'
  },
  noContentContainer: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  form: {
    padding: '5%',
    justifyContent: 'space-between'
  },
  formDiv: {
    justifyContent: 'space-between',
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
  sectionHeading: {
    color: colors.darkGrey,
    fontWeight: 'bold',
    margin: 5
  },
  sentMessageBubble: {
    backgroundColor: colors.appBarBackgroundColor,
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
  subText: {
    fontSize: 12,
    color: colors.darkGrey
  },
  textInput: {
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderRadius: 5,
    borderColor: '#d0d0d0',
    backgroundColor: 'transparent',
    padding: 10
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
  title: {
    fontWeight: 'bold',
    fontSize: 24
  },
  topicImage: {
    height: 250,
    width: '100%'
  },
  topicTile: {
    paddingTop: '5%'
  },
  username: {
    fontWeight: 'bold',
    alignSelf: 'center',
    // marginTop: 10,r 
    marginLeft: 10
  },
  usernameBar: {
    alignItems: 'center',
    alignContent: 'space-between',
    backgroundColor: '#ffffff',
    flexDirection:'row',
    flexWrap:'wrap',
    padding: 5,
    marginTop: 1
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