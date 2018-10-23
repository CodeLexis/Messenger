import React from "react";
import { AsyncStorage, Text, View } from "react-native";
import { ConversationStrip, LoadingIndicator, NoContentContainer } from "../../components";
import { chars } from "../../utils";
import { retrieveProfileMoments } from '../../apiWrapper';
import { colors, pageLimit } from '../../constants';
import ActionButton from 'react-native-action-button';
import timer from 'react-native-timer';

const styles = require('../../styles.js');

export class MomentsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isMounted: false, page: 1};
  }

  displayProfileMoments(refresh=true) {
    AsyncStorage.multiGet(['profiles', 'active_profile_index'], (errs, result) => {

      if (!errs) {
        profiles = JSON.parse(result[0][1]);
        activeProfileIndex = result[1][1];

        profileIndex = chars.indexOf(activeProfileIndex);
        profile = profiles[profileIndex];

        retrieveProfileMoments(
          page=this.state.page, perPage=pageLimit, cachedProfileIndex=profileIndex, refresh=refresh
        ).then(
            function(result) {
              this.setState(
                {
                  profile: profile,
                  moments: result, 
                  isMounted: true,
                  page: this.state.page
                }
              );
            }.bind(this)
          )
      }
    })
  }

  componentDidMount() {
    timer.clearInterval('displayProfileMoments');
    this.displayProfileMoments(refresh=false);

    timer.setInterval('displayProfileMoments', () => this.displayProfileMoments.bind(this), 1000);
  }

  componentWillUnmount() {
    timer.clearInterval('displayProfileMoments');
  }

  render() {
    const { navigate } = this.props.navigation;

    if (!this.state.isMounted) {
      return <LoadingIndicator/>
    }

    if(this.state.moments.length == 0) {
      widget = <NoContentContainer text={`There are no moments in ${this.state.profile.name}!`}/>
    }

    else {
      widget = <FlatList data={this.state.moments} keyExtractor={(item, index) => item.uid} renderItem={
        ({item}) => <ConversationStrip conversation={item} navigation={this.props.navigation}/>
        }/>
    }

    addButton = null

    if(this.state.profile.allows_edit) {
      addButton = <ActionButton buttonColor={this.state.profile.theme_color} onPress={() => console.log('Adding')}>
        </ActionButton>
    }

    return (
      <View style={styles.container}>
        
        {widget}
        {addButton}

      </View>
    )
  }
}