import { fetchPlacesFromBB } from '../services/api';

export const LAT_LON = "LAT_LON";
export const LOCATIONS_REQUEST = "LOCATIONS_REQUEST";
export const LOCATIONS_FAILURE = "LOCATIONS_FAILURE";
export const LOCATIONS_SUCCESS = "LOCATIONS_SUCCESS";

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
    isfetching,
    places
  }
};

export const locationsFailure = error => {
  return {
    type: LOCATIONS_FAILURE,
    isfetching,
    error
  }
};

/**
 * Thunks
 */
export const locationsRequest = (bbox, distance) => {
  return function(dispatch) {
    fetchPlacesFromBB(bbox, distance)
      .then( res => dispatch(locationsSuccess(res)))
      .catch( error => console.log(error));
  }
};
