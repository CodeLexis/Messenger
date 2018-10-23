import React from 'react';
import { View } from 'react-native';
import { MaterialIndicator } from 'react-native-indicators';

export default class LoadingIndicator extends React.Component {
  render() {
    return (
        <View style={{flex: 1}}>
          <MaterialIndicator />
        </View>
      )
  }
}