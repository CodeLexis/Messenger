import React from 'react';
import { Text, View } from 'react-native';

var styles = require('../styles.js')

export class EngagementsBar extends React.Component {
  render() {
    return (
      <View style={[{
        alignContent: 'center',
        justifyContent: 'space-between',
        padding: 10,
        marginTop: 10
      }, styles.rowContainer]}>

        <View style={{backgroundColor: '#d0d0d0', borderRadius: 8, padding: 10}}>
          <Text>
            Interact
          </Text>
        </View> 

        <View style={{backgroundColor: '#d0d0d0', borderRadius: 8, padding: 10}}>
          <Text>
            Message
          </Text>
        </View> 


        <View style={{backgroundColor: '#d0d0d0', borderRadius: 8, padding: 10}}>
          <Text>
            Retrail
          </Text>
        </View> 

      </View>
    )
  }
}