import React from 'react';
import { ScrollView, Text, TouchableHighlight, View } from "react-native";

class OnboardingCard extends View {
  render() {
    return null
  }
}

export default class LandingScreen extends React.Component {
  constructor (props) {
    super(props)
  }

  render() {
    return (
      <ScrollView horizontal pagingEnabled>
        <OnboardingCard></OnboardingCard>
      </ScrollView>
    )
  }
}