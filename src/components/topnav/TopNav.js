import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';

import TopNavLocations from './TopNavLocations';

const TopNav = (props) => {
  return (
    <View style={styles.container}>
      <TopNavLocations />
    </View>
  );
}

const styles = StyleSheet.create({
  // Search Container
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#F5FCFF',
    justifyContent: 'flex-end'
  },
});

export default TopNav;
