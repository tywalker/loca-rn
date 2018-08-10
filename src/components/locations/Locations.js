import React, { Component } from 'react';
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Text,
  View
} from 'react-native';
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

    this.locationsList = [];
  }

  componentDidUpdate(prevProps) {
    const { dispatch, lat, lon, locations, images, imagesDone } = this.props;

    if (prevProps.lat !== lat && prevProps.lon !== lon) {
      let bbox = getBoundingBoxFromGeo(lat, lon, 5.0);

      dispatch(locationsRequest(bbox, 5.0));
    }
    if (locations.length > 0 && !imagesDone) {
      dispatch(imagesRequest(locations));
    }
  }

  _renderTopNavigation() {
    return (
      <TouchableOpacity style={ styles.searchTouchContainer }>
        <View style={ styles.searchBox }>
          <Text>Search for locations...</Text>
        </View>
      </TouchableOpacity>
    );
  }

  _keyExtractor = ( item, index ) => item.id;

  _renderItem = ({ item }) => {
    const { images } = this.props;
    let imageUri = images[item.id][0].urlSm;

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

  renderLocations() {
    const { locations, images, imagesDone } = this.props;
    const { offset } = this.state;

    if (imagesDone) {
      let locationsOffset = locations.splice(offset, offset + 5);
      this.locationsList = this.locationsList.concat(locationsOffset);

      return (
        <FlatList
          data={ this.locationsList }
          extraData={ images }
          renderItem={ this._renderItem }
          showsVerticalScrollIndicator={ false }
          keyExtractor={ this._keyExtractor }
          onEndReached={ ()=> this.setState({ offset: offset + 1 }) }
          onEndReachedThreshold={ 0.1 }
        />
      );
    }
    else {
      return <View></View>;
    }
  }


  render() {
    const { locations, images, imagesDone } = this.props;

    return (
      <View style={styles.container}>
        <View style={ styles.topNavigation }>
          { this._renderTopNavigation() }
        </View>
        <View style={ styles.mainViewContainer }>
          { this.renderLocations() }
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
  },
  // Search Container
  searchTouchContainer: {
    flex: 1,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  searchBox: {
    height: 50,
    flex: 0.8,
    borderWidth: 1,
    borderRadius: 10,
    justifyContent: 'center'
  }
});

function mapStateToProps(state) {
  return {
    locations: state.locations.locations,
    lat: state.locations.lat,
    lon: state.locations.lon,
    images: state.images.images,
    imagesDone: state.images.imagesDone
  }
}

export default connect(mapStateToProps)(Locations);
