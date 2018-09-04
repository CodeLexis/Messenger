import React from "react";
import { AsyncStorage, Text, View } from "react-native";
import { LoadingIndicator, NoContentContainer } from "../../components";
import { chars } from "../../utils";

const styles = require('../../styles.js');

export class MomentsScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {isMounted: false};
  }

  componentDidMount() {
    AsyncStorage.multiGet(['active_profile_index', 'profiles'], (errs, result) => {
      if (!errs) {
        if (result !== null) {
          activeProfileIndex = result[0][1];
          profiles = JSON.parse(result[1][1]);

          profileIndex = chars.indexOf(activeProfileIndex);

          profile = profiles[profileIndex]

          this.setState({profile: profile, isMounted: true});
        }
      }
    })
  }

  render() {
    const { navigate } = this.props.navigation;

    if (!this.state.isMounted) {
      return <LoadingIndicator/>
    }

    return <NoContentContainer text={`Moments from ${ this.state.profile.name } appear here!`}/>
  }
}