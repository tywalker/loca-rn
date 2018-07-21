import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import { latLon } from '../actions/locations';

import Locations from './locations/Locations';

class Loca extends Component {
  constructor() {
    super();

  }
  componentDidMount() {
    const { dispatch } = this.props;
    navigator.geolocation.requestAuthorization();

    navigator.geolocation.getCurrentPosition( ({ coords }) => {
      const { latitude, longitude } = coords;

      dispatch(latLon(latitude, longitude));
    });
  }

  render() {
    return (
      <View style={ styles.container }>
        <Locations boundingBox={ this.bbox } />
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

function mapStateToProps(state) {
  return {
    lat: state.locations.lat,
    lon: state.locations.lon
  }
}

export default connect(mapStateToProps)(Loca);
