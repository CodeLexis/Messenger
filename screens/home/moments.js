import React from "react";
import {Text} from "react-native";

const styles = require('../../styles.js');

export class MomentsScreen extends React.Component {
  render() {
    const { navigate } = this.props.navigation;

    return <Text>Moments appear here!</Text>
  }
}