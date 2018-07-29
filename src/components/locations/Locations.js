import React, { Component } from 'react';
import { FlatList, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { getBoundingBoxFromGeo } from '../../services/api';

import { locationsRequest, imagesRequest } from '../../actions/locations';

import { isEmpty } from '../../helpers/helpers';

class Locations extends Component {
  constructor() {
    super();

    this.state = {
      offset: 0,
    }
  }

  componentDidUpdate(prevProps) {
    const { dispatch, lat, lon, places, images, done } = this.props;

    if (prevProps.lat !== lat && prevProps.lon !== lon) {
      let bbox = getBoundingBoxFromGeo(lat, lon, 5.0);

      dispatch(locationsRequest(bbox, 5.0));
    }
    if (places.length > 0 && !done) {
      dispatch(imagesRequest(places));
    }
  }

  _keyExtractor = ( item, index ) => item.id;

  _renderItem = ({ item }) => {
    const { images } = this.props;
    let imageUri = images[item.id][0].urlSm;

    console.log(item)
    return (
      <View
        key={ item.id }
        style={ styles.location }
      >
        <Text style={ styles.locaLabel }>{ item.woe.name }</Text>
        <View style={ styles.locaImageContainer }>
          <Image
            source={{ uri: imageUri }}
            style={{ height: 150, width: 200 }}
          />
        </View>
      </View>
    );
  }

  renderPlaces() {
    const { places, images, done } = this.props;
    const { offset } = this.state;

    if (done) {
      let placesOffset = places.splice(0, offset + 5);

      return (
        <FlatList
          data={ placesOffset }
          extraData={ images }
          renderItem={ this._renderItem }
          keyExtractor={ this._keyExtractor }
          onEndReached={ () => console.log("end reached") }
        />
      );
    }
    else {
      return <View></View>;
    }
  }


  render() {
    const { places, images, done } = this.props;

    return (
      <View style={styles.container}>
        <View style={ styles.topNavigation }></View>
        <View style={ styles.mainViewContainer }>
          { this.renderPlaces() }
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
    lon: state.locations.lon,
    images: state.images.images,
    done: state.images.done
  }
}

export default connect(mapStateToProps)(Locations);
