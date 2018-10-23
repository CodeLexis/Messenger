import React from 'react';
import { Text, View } from 'react-native';

var styles = require('../styles');

export default class NoContentContainer extends React.Component {
  render() {
    return (
      <View style={styles.noContentContainer} flex={1}>
        <Text style={{color:'#a0a0a0', textAlign: 'center', width: '80%'}}>
          {this.props.text || 'Nothing to display.'}
        </Text>
      </View>
    )
  }
}