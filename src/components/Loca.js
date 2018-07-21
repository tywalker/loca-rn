import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

import Locations from './locations/Locations';

class Loca extends Component {
  render() {
    return (
      <View style={ styles.container }>
        <Locations />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#F5FCFF',
  },
});

export default Loca;
