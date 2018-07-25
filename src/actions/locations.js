import {
  fetchPlacesFromBB,
  fetchPlaceChildren,
  fetchImages
} from '../services/api';

export const LAT_LON = "LAT_LON";
export const LOCATIONS_REQUEST = "LOCATIONS_REQUEST";
export const LOCATIONS_FAILURE = "LOCATIONS_FAILURE";
export const LOCATIONS_SUCCESS = "LOCATIONS_SUCCESS";
export const IMAGES_REQUEST = "IMAGES_REQUEST";
export const IMAGES_FAILURE = "IMAGES_FAILURE";
export const IMAGES_SUCCESS = "IMAGES_SUCCESS";

import { normalizePlaces, normalizeImages } from '../services/normalize';

export const latLon = (lat, lon) => {
  return {
    type: LAT_LON,
    lat,
    lon
  }
}
export const locationsSuccess = places => {
  return {
    type: LOCATIONS_SUCCESS,
    places
  }
};

export const locationsFailure = error => {
  return {
    type: LOCATIONS_FAILURE,
    error
  }
};

export const imagesSuccess = images => {
  return {
    type: IMAGES_SUCCESS,
    images
  }
}

export const imagesFailure = error => {
  return {
    type: IMAGES_FAILURE,
    error
  }
}

/**
 * Thunks
 */
export const locationsRequest = (bbox, distance) => {
  return function(dispatch) {
    fetchPlacesFromBB(bbox, distance)
      .then( res => res.data )
      .then( res => fetchPlaceChildren(res) )
      .then( res => {
        let combinedArr = [];

        res.map( places => {
          combinedArr = combinedArr.concat(places);
        })

        let nPlaces = normalizePlaces(combinedArr);

        dispatch(locationsSuccess(nPlaces));
      })
      .catch( error => dispatch(locationsFailure(error)) );
  }
};

export const imagesRequest = (places) => {
  return function(dispatch) {
    places.map( place => {
      fetchImages(place.id)
        .then( res => res.data )
        .then( res => {
          let resArr = res.photos.photo;
          let nImages = normalizeImages(resArr);

          dispatch(imagesSuccess(nImages));
        })
        .catch( error => dispatch(imagesFailure(error)) );

    })
  }
};
