import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';

import TopNavLocations from './TopNavLocations';

class TopNav extends Component {
  componentDidUpdate(prevProps) {

  }

  render() {
    return (
      <View style={styles.container}>
        <TopNavLocations { ...this.props }/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  // Search Container
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#F5FCFF',
  },
  searchContainer: {
    flex: 0.8,
    borderWidth: 1,
    backgroundColor: "#e0e0e0",
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  searchTouchContainer: {
    marginTop: 15,
    height: 45,
    flex: 0.85,
    borderWidth: 1,
    borderRadius: 10,
    justifyContent: 'center'
  }
});

function mapStateToProps(state) {
  return {
    locations: state.locations.locations
  }
}

export default connect(mapStateToProps)(TopNav);
