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

import TopNav from '../topnav/TopNav';

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

  _renderImages = (locationId) => {
    const { images } = this.props
    return images[locationId].map( (image, index) => {
      if (index <= 3) {
        return (
          <Image
            source={{ uri: image.url }}
            style={{ height: 200, width: 300 }}
          />
        );
      }
    })
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
        <ScrollView
          style={ styles.locaImageContainer }
          horizontal={ true }
          scrollDirection="horizontal"
        >
          { this._renderImages(item.id) }
        </ScrollView>
        <View style={ styles.infoWrapper }>
          <View style={ styles.pullLeft }>
            <Text style={[ styles.locaLabel, styles.locationName ]}>{ item.woe.name }</Text>
            <Text style={[ styles.locaLabel, styles.milesAway ]}>{ item.woe.name }</Text>
          </View>
          <View style={ styles.pullRight }>
            <Text style={[ styles.locaLabel ]}></Text>
            <Text style={[ styles.locaLabel, styles.viewMore ]}>View More</Text>
          </View>
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
      return (
        <View>
          <Text>Loading Locas</Text>
        </View>
      );
    }
  }


  render() {
    const { locations, images, imagesDone } = this.props;

    return (
      <View style={styles.container}>
        <View style={ styles.topNavigation }>
          <TopNav />
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
    backgroundColor: '#f0f0f0',
    justifyContent: 'flex-end'
  },
  mainViewContainer: {
    flex: 0.8,
    flexDirection: 'column',
    backgroundColor: '#f8f8f8',
    alignItems: 'center',
    paddingVertical: 20,
  },
  locationsContainer: {
    flex: 0.8,
    flexDirection: 'row',
    justifyContent: 'center',
    minWidth: '90%',
    maxWidth: '90%',
    backgroundColor: '#f9f9f9'
  },
  location: {
    flex: 0.9,
    alignSelf: 'center',
    height: 300,
    overflow: 'hidden'
  },
  locaLabel: {
    color: "#555",
    minHeight: 25,
    paddingVertical: 2
  },
  locaImageContainer: {
    minHeight: 150,
    minWidth: 200,
  },
  // Location Item
  infoWrapper: {
    backgroundColor: "#e0e0e0",
    flexDirection: 'row',
    paddingVertical: 5
  },
  pullLeft: {
    flex: 0.5
  },
  pullRight: {
    flex: 0.5
  },
  locationName: {
    fontSize: 18
  },
  milesAway: {
    fontSize: 14
  },
  viewMore: {
    fontSize: 14,
    textAlign: 'right'
  },
  faveIcon: {},
  viewAll: {}
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
