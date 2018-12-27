import React from 'react';
import { Image, Text, View } from 'react-native';
import { EngagementsBar } from './engagementsBar';

const styles = require('../styles.js');

export default class MomentTile extends React.Component {
  constructor(props) {
    super(props)
    state = {}
  }

  render() {
    date = new Date(this.props.created_at);
    
    return (
      <View style={styles.momentTile}>

        <View style={styles.usernameBar}>
          <Image source={{uri: this.props.contact.user.profile_photo}} style={styles.contactPhoto}/>
          <View style={{width: '65%', paddingLeft: 5}}>
            <Text style={styles.contactName}>{this.props.contact.name}</Text>
            <Text style={styles.momentType}>{this.props.moment_item.name}</Text>
          </View>
          <Text style={styles.conversationStripTime}>{this.props.created_at}</Text>
        </View>

        <View style={[styles.rowContainer, {alignSelf: 'center'}]}>
          <Image source={{uri: this.props.moment_item.icon}} style={styles.momentItemIcon}/>
        </View>
        
        <Text style={{textAlign: 'center', fontSize: 16}}>{this.props.body}</Text>

        <EngagementsBar/>

      </View>
    )

    // return (
    //   <View style={styles.momentTile}>
    //     <View style={styles.rowContainer}>
    //       <Image source={{uri: this.props.contact.profile_photo}} style={styles.contactPhoto}/>
    //       <Text>{this.props.contact.name}</Text>
    //     </View>
    //   </View>
    // )
  }
}