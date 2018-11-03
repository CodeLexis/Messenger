import React from 'react';
import { Image, Text, TouchableHighlight, View } from "react-native";
import { normalizeDate } from '../utils';

var styles = require('../styles.js');


export default class NotificationStrip extends React.Component {
  showEntityDetails() {
    switch(this.props.item.entities[0].entity_type.name) {
      case 'User':
        screenName = 'EditContact'
        break
    }

    allProfileContacts = this.props.item.entities[0].entity.profiles[0].contacts;
    contact = allProfileContacts.filter((value, index) => (value.user.uid === this.props.item.entities[0].entity.uid))[0]

    this.props.navigation.navigate(
      screenName, 
      {
        previousScreen: 'Notifications', 
        contact: contact, 
        ...this.props.item.entities[0].entity
      }
    )

    // this.props.navigation.navigate('User', {'uid': this.props.item.entities[0].entity.uid})
  }

  render() {

    if (this.props.item.event.name === 'Added Contact') {
      photo = <Image source={{uri:this.props.item.entities[0].entity.profile_photo}} style={styles.contactPhoto}/>
    }

    time_and_unit = normalizeDate(this.props.item.created_at)

    return (
      <TouchableHighlight onPress={this.showEntityDetails.bind(this)}>
        
        <View style={[styles.rowContainer, {backgroundColor: '#ffffff', marginBottom: 1, padding: 10, alignItems: 'center'}]}>
          {photo}

          <View style={{marginLeft: 10}}>
            <Text>{this.props.item.message}</Text>
            <Text style={styles.subText}>{time_and_unit[0]} {time_and_unit[1]} ago</Text>
          </View>
        </View>

      </TouchableHighlight>
    )
  }
}