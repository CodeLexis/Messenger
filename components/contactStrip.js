import React from 'react';
import {Image, Text, View} from 'react-native';

const styles = require('../styles.js');

export default class ContactStrip extends React.Component {
  render() {
    let {contact} = this.props;

    return (
      <View style={styles.contactStrip}>
        <Image source={{uri: contact.profile_photo_url}}/>
      </View>
    )
  }
}