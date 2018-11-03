import React from "react";
import { AsyncStorage, FlatList, View } from "react-native";
import { LoadingIndicator, MomentTile, NoContentContainer } from "../../components";
import { chars } from "../../utils";
import { doRetrieveProfileMoments } from '../../apiWrapper';
import { Ionicons } from "react-native-vector-icons";
import { pageLimit } from '../../constants';
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

        doRetrieveProfileMoments(
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

    this.displayProfileMoments(refresh=true);

    timer.setInterval('displayProfileMoments', () => this.displayProfileMoments.bind(this), 1000);
  }

  componentWillUnmount() {
    timer.clearInterval('displayProfileMoments');
  }

  changeToAddMomentScreen(momentType) {
    this.props.navigation.navigate(
      'AddMoment', {'profile': this.state.profile, 'momentType': momentType}
    )
  }

  render() {
    const { navigate } = this.props.navigation;

    moments = [
      {
        "body": "Hello World",
        "comments": [],
        "contact": {
          "address": null,
          "conversations": [],
          "email": null,
          "name": "Jason Mike",
          "phone": null,
          "uid": "jRBWMXUanLadPU2qCrqNy9",
          "user": {
            "created_at": "2018-10-25T16:22:48",
            "email": "jsonmike@gmail.com",
            "name": "Jason Mike",
            "phone": "09062345678",
            "profile_photo": 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQ5sqUohweBX5hlifqjPiQ3YoAjquvFUIDKi2r8c_n-7t6J1OY',
            "uid": "7Lv4PArSPHx36wVMMsnkAo"
          }
        },
        "created_at": "36m ago",
        "image": null,
        "moment_item": {
          "icon": "http://trails-messenger.herokuapp.com/blobs/TuceUAVfrrADm2XXETbVnB",
          "moment_type": {
            "description": null,
            "name": "Mood",
            "uid": "vZXeEC6F8MeJgSHQREpp4Y"
          },
          "name": "feeling happy",
          "uid": "zLqyhnRUNRLrkrwHX794d5",
          "user": null
        },
        "moment_type": {
          "description": null,
          "name": "Activity",
          "uid": "QWPdjhgDg3j3SQFfp9wdQm"
        },
        "title": null,
        "video": null,
        "uid": "QWPdjhgDg3j3SQFfp9wdQm"
      }
    ]

    if (!this.state.isMounted) {
      return <LoadingIndicator/>
    }

    widget = <FlatList keyExtractor={(item, index) => item.uid} contentContainerStyle={{justifyContent: 'space-between'}} numColumns={1} data={moments} keyExtractor={(item, index) => item.uid} renderItem={
      ({item}) => <MomentTile navigation={this.props.navigation} {...item}/>
      }/>

    // if(this.state.moments && this.state.moments.length == 0) {
    //   widget = <NoContentContainer text={`There are no moments in ${this.state.profile.name}!`}/>
    // }

    // else {
    //   widget = <FlatList contentContainerStyle={{justifyContent: 'space-between'}} numColumns={1} data={this.state.moments} keyExtractor={(item, index) => item.uid} renderItem={
    //     ({item}) => <MomentTile navigation={this.props.navigation} {...item}/>
    //     }/>
    // }

    addButton = null

    addButton = (
      <ActionButton buttonColor={this.state.profile.theme_color}>
        
        <ActionButton.Item buttonColor={this.state.profile.theme_color} title="Mood" onPress={() => this.changeToAddMomentScreen.bind(this)(momentType='Mood')}>
          <Ionicons name="md-happy" style={styles.actionButtonIcon} size={20}/>
        </ActionButton.Item>
        <ActionButton.Item buttonColor={this.state.profile.theme_color} title="Activity" onPress={() => this.changeToAddMomentScreen.bind(this)(momentType='Activity')}>
          <Ionicons name="md-bicycle" style={styles.actionButtonIcon} size={20}/>
        </ActionButton.Item>
        <ActionButton.Item buttonColor={this.state.profile.theme_color} title="Milestone" onPress={() => this.changeToAddMomentScreen.bind(this)(momentType='Milestone')}>
          <Ionicons name="md-bookmark" style={styles.actionButtonIcon} size={20}/>
        </ActionButton.Item>
      </ActionButton>
    )
    
    return (
      <View style={styles.container}>
        
        {widget}
        {addButton}

      </View>
    )
  }
}