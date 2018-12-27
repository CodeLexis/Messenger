import React from 'react';
import { AsyncStorage, Button, Text, TextInput, View } from 'react-native';
import { ColorPicker } from 'react-native-status-color-picker';
import { colors } from '../constants';
import { doCreateMoment } from '../apiWrapper';

var styles = require('../styles')

export class AddMomentScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isMounted: false, name: null, code: null, saveButtonText: 'Save'};
  }

  static navigationOptions = ({navigation, navigationOptions}) => {
    return {
      title: `Add ${navigation.state.params.momentType}`,
      headerStyle: {
        backgroundColor: '#ffffff'
      }
    }
  }

  render() {
    const { navigation } = this.props;

    this.momentType = navigation.state.params.momentType;
    this.profile = profile = navigation.state.params.profile;

    return <View>
      <Text>
        {this.momentType}
      </Text>
    </View>
  }

}