import React from 'react';
import { FlatList } from 'react-native';

var styles = require('../styles.js');

export default class BasicFlatList extends React.Component {
  state = {
    selected: new Map()  // iterable object with string:boolean key:value pairs
  }
  
  onPressAction = (key) => {
    this.setState((state) => {
      // create new Map object, maintaining state immutability
      const selected = new Map(state.selected);
      // remove key if selected, add key if not selected
      this.state.selected.has(key) ? selected.delete(key, !selected.get(key)) : selected.set(key, !selected.get(key));

      console.log(selected);
      
      return {selected};
    });
  }

  // renderRow = (item) => {
  //   return (
  //       <RowItem
  //         {...otherProps}
  //         item={item}
  //         onPressItem={this.onPressAction}
  //         selected={!!this.state.selected.get(item.key)} />
  //   );
  // }

  render() {
    return(
      <FlatList style={styles.container}
        data={this.props.data}
        renderItem={this.props.renderItem}
        extraData={this.state}
      />
    );
  }
}