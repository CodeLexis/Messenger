import React from "react";
import { FlatList, Text, TouchableHighlight } from "react-native";
import { NotificationStrip, LoadingIndicator, NoContentContainer } from "../components";
import { retrieveNotifications } from '../apiWrapper';

export class NotificationsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isMounted: false, notifications: {}};
  }

  static navigationOptions = ({ navigation }) => ({
    title: 'Notifications'
  })

  componentDidMount() {
    retrieveNotifications(
      page=1, perPage=20, refresh=false
    ).then(
      function(result) {
        this.setState({'notifications': result, isMounted: true})
      }.bind(this)
    )

    setTimeout(() => {
        retrieveNotifications(
          page=1, perPage=20, refresh=true
        ).then(
          function(result) {
            this.setState({'notifications': result, isMounted: true})
          }.bind(this)
        )
      }, 1000)
  }

  render() {
    
    if (!this.state.isMounted) {
      return (
        <LoadingIndicator/>
      )
    }

    if (this.state.notifications.length === 0) {
      return (
        <NoContentContainer text='No notifications.'/>
      )
    }
    
    return (
      <FlatList data={this.state.notifications} keyExtractor={(item, index) => item.uid} renderItem={
        ({item}) => <NotificationStrip item={item}
          screenIndex={this.state.notifications.indexOf(item)}
          navigation={this.props.navigation}/>
      }/>
    )
  }
}