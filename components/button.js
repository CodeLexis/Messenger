import React from "react";
import { Text, TouchableHighlight, View } from "react-native";
import { colors } from "../constants";

var styles = require('../styles');

export default class Button extends React.Component {
  render() {
    return (
      <View>
        <TouchableHighlight style={{padding: 7, backgroundColor: colors.appBarBackgroundColor}} onPress={this.props.onPress}>
          <Text style={{textAlign: 'center', fontWeight: 'bold'}}>
            {this.props.title.toUpperCase()}
          </Text>
        </TouchableHighlight>
      </View>
    )
  }
}