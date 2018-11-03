import React from "react";
import { AsyncStorage, FlatList, View } from "react-native";
import { LoadingIndicator, TopicTile, NoContentContainer } from "../../components";
import { chars } from "../../utils";
import { doRetrieveProfileTopics } from '../../apiWrapper';
import { pageLimit } from '../../constants';
import ActionButton from 'react-native-action-button';
import timer from 'react-native-timer';

const styles = require('../../styles.js');

export class TopicsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isMounted: false, page: 1};
  }

  displayProfileTopics(refresh=true) {
    AsyncStorage.multiGet(['profiles', 'active_profile_index'], (errs, result) => {

      if (!errs) {
        profiles = JSON.parse(result[0][1]);
        activeProfileIndex = result[1][1];

        profileIndex = chars.indexOf(activeProfileIndex);
        profile = profiles[profileIndex];

        doRetrieveProfileTopics(
          page=this.state.page, perPage=pageLimit, cachedProfileIndex=profileIndex, refresh=refresh
        ).then(
            function(result) {
              this.setState(
                {
                  profile: profile,
                  topics: result, 
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
    timer.clearInterval('displayProfileTopics');

    this.displayProfileTopics(refresh=true);

    timer.setInterval('displayProfileTopics', () => this.displayProfileTopics.bind(this), 1000);
  }

  componentWillUnmount() {
    timer.clearInterval('displayProfileTopics');
  }

  render() {
    const { navigate } = this.props.navigation;

    if (!this.state.isMounted) {
      return <LoadingIndicator/>
    }

    if(this.state.topics && this.state.topics.length == 0) {
      widget = <NoContentContainer text={`There are no topics in ${this.state.profile.name}!`}/>
    }

    else {
      widget = <FlatList contentContainerStyle={{justifyContent: 'space-between'}} numColumns={1} data={this.state.topics} keyExtractor={(item, index) => item.uid} renderItem={
        ({item}) => <TopicTile navigation={this.props.navigation} {...item}/>
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