import React, { Component } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { Geolocation } from 'react-native';
import { getBoundingBoxFromGeo, fetchPlacesFromBB } from './src/services/api';

import Locations from './src/components/locations/Locations';

import { fetchExample } from './src/services/api';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};

export default class App extends Component<Props> {
  componentDidMount() {
    navigator.geolocation.requestAuthorization();
    navigator.geolocation.getCurrentPosition( ({ coords }) => {
      const { latitude, longitude } = coords;
      let bbox = getBoundingBoxFromGeo(latitude, longitude, 5);

      fetchPlacesFromBB(bbox, 5.0);
    });
  }

  requestGeoAccess() {
    Geolocation.requestAuthorization();
  }

  render() {
    return (
      <View style={ styles.container }>
        <Locations />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#F5FCFF',
  },
});
