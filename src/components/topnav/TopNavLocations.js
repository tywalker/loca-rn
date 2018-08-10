import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';

class TopNavLocations extends Component {

  _onSearchBarPress = () => {
    const { dispatch } = this.props;

    console.warn(dispatch);
  }

  render() {
    return (
      <View style={ styles.searchContainer }>
        <TouchableOpacity
          style={ styles.searchTouchContainer }
          onPress={ () => this._onSearchBarPress() }
        >
          <Text>Search for locations...</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  // Locations Search Container
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

export default connect(mapStateToProps)(TopNavLocations);
