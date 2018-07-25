import React, { Component } from 'react';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { getBoundingBoxFromGeo } from '../../services/api';

import { locationsRequest } from '../../actions/locations';

class Locations extends Component {

  componentDidUpdate(prevProps) {
    const { dispatch, lat, lon, places } = this.props;

    if (prevProps.lat !== lat && prevProps.lon !== lon) {
      let bbox = getBoundingBoxFromGeo(lat, lon, 5.0);

      dispatch(locationsRequest(bbox, 5.0));
    }
  }

  _keyExtractor = ( item, index ) => item.id;

  _renderItem = ({ item, index }) => (
    <View
      id={ index }
      style={ styles.location }
    >
      <Text style={ styles.locaLabel }>{ item.woe.name }</Text>
      <View style={ styles.locaImageContainer }>
        <Image
          source={{ uri: "https://placeimg.com/200/150/any" }}
          style={{ height: 150, width: 200 }}
        />
      </View>
    </View>
  );


  render() {
    const { places } = this.props;

    return (
      <View style={styles.container}>
        <View style={ styles.topNavigation }></View>
        <View style={ styles.mainViewContainer }>

          <FlatList
            data={ places }
            keyExtractor={ this._keyExtractor }
            renderItem={ this._renderItem }
          />

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
    backgroundColor: '#f0f0f0'
  },
  mainViewContainer: {
    flex: 0.8,
    backgroundColor: '#f8f8f8',
    alignItems: 'center'
  },
  locationsContainer: {
    flex: 1,
    minWidth: '90%',
    maxWidth: '90%',
    backgroundColor: '#f9f9f9'
  },
  location: {
    height: 300,
  },
  locaLabel: {
    color: "#555",
    fontSize: 16
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
