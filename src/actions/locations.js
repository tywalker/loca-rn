import { fetchPlacesFromBB, fetchPlaceChildren } from '../services/api';
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

/**
 * Thunks
 */
export const locationsRequest = (bbox, distance) => {
  return function(dispatch) {
    fetchPlacesFromBB(bbox, distance)
      .then( res => res.data )
      .then( res => fetchPlaceChildren(res) )
      .then( res => res.map( places => dispatch(locationsSuccess(places)) ) )
      .catch( error => dispatch(locationsFailure(error)) );
  }
};
