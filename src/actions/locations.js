import {
  fetchPlacesFromBB,
  fetchPlaceChildren,
  fetchImages,
} from '../services/api';

export const LAT_LON = "LAT_LON";
export const LOCATIONS_REQUEST = "LOCATIONS_REQUEST";
export const LOCATIONS_FAILURE = "LOCATIONS_FAILURE";
export const LOCATIONS_SUCCESS = "LOCATIONS_SUCCESS";
export const IMAGES_REQUEST = "IMAGES_REQUEST";
export const IMAGES_FAILURE = "IMAGES_FAILURE";
export const IMAGES_SUCCESS = "IMAGES_SUCCESS";
export const IMAGES_DONE = "IMAGES_DONE";

import { normalizePlaces, normalizeImages } from '../services/normalize';

export const latLon = (lat, lon) => {
  return {
    type: LAT_LON,
    lat,
    lon
  }
}
export const locationsSuccess = locations => {
  return {
    type: LOCATIONS_SUCCESS,
    locations
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

export const imagesDone = () => {
  return {
    type: IMAGES_DONE
  }
}

/**
 * Thunks
 */
export function locationsRequest(bbox, distance) {
  return dispatch => {
    return fetchPlacesFromBB(bbox, distance)
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

export const buildImagePromiseArray = (places) => {
  let promiseArr = [];
  let promises = places.map( (place, index) => {
    return fetchImages(place.id)
      .then( res => res.data )
      .then( res => {
        let resArr = res.photos.photo;

        if (res.photos.photo) {
          let nImages = normalizeImages(resArr, place.id);
          let placeCopy = place;

          return nImages;
        }
      })
      .catch( error => dispatch(imagesFailure(error)));
  })
  return promises;
}

export const imagesRequest = (places) => {
  return function(dispatch) {
    let imagePromiseArray = [];
    let images = buildImagePromiseArray(places);
    return Promise.all(images)
      .then( (images) => {
        let imagesObj = {};

        images.map( image => {
          for (property in image) { imagesObj[property] = image[property] }
        });

        dispatch(imagesSuccess(imagesObj));
        dispatch(imagesDone());
      })
      .catch(error => imagesFailure(error) );
  }
};
