import React, { Component } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { getBoundingBoxFromGeo } from '../../services/api';

import { locationsRequest } from '../../actions/locations';

class Locations extends Component {

  componentDidUpdate(prevProps) {
    const { dispatch, lat, lon } = this.props;
    if (prevProps.lat !== lat && prevProps.lon !== lon) {
      let bbox = getBoundingBoxFromGeo(lat, lon, 5.0);
      dispatch(locationsRequest(bbox, 5.0));
    }
  }

  render() {
    let exArr = [];
    for (var i = 0; i < 20; i++) {
      exArr.push(i);
    }
    return (
      <View style={styles.container}>
        <View style={ styles.topNavigation }>

        </View>
        <View style={ styles.mainViewContainer }>
          <ScrollView style={ styles.locationsContainer }>
            {
              exArr.map( (item, index) => {
                return (
                  <View key={index} style={ styles.location }>
                    <Text style={ styles.locaLabel }>Label { item }</Text>
                    <View style={ styles.locaImageContainer }>
                      <Image
                        source={{ uri: "https://placeimg.com/200/150/any" }}
                        style={{ height: 150, width: 200 }}
                      />
                    </View>
                  </View>
                )
              })
            }
          </ScrollView>
        </View>
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
  topNavigation: {
    flex: 0.2,
    backgroundColor: 'pink'
  },
  mainViewContainer: {
    flex: 0.8,
    backgroundColor: 'blue',
    alignItems: 'center'
  },
  locationsContainer: {
    flex: 1,
    minWidth: '90%',
    maxWidth: '90%',
    backgroundColor: 'green'
  },
  location: {
    height: 300,
  },
  locaLabel: {

  },
  locaImageContainer: {
    minHeight: 150,
    minWidth: 200
  }
});

function mapStateToProps(state) {
  return {
    places: state.locations.places,
    lat: state.locations.lat,
    lon: state.locations.lon
  }
}

export default connect(mapStateToProps)(Locations);
