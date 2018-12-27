import React from 'react';
import { Image, Text, View } from 'react-native';

const styles = require('../styles.js');

export default class TopicTile extends React.Component {
  constructor(props) {
    super(props)
    state = {}
  }

  render() {
    date = new Date(this.props.created_at);

    return (
      <View style={styles.topicTile}>
        <Image source={{uri: this.props.image_url}} style={styles.topicImage}/>
        <View style={{backgroundColor: 'white', padding: 10}}>
          <Text style={styles.topicText}>
            {this.props.title}
          </Text>

          <Text style={{color: 'grey', fontSize: 12}}>
            {date.toString()}
          </Text>
        </View>
      </View>
    )
  }
}