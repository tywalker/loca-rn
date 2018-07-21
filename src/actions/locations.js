export const LOCATIONS_REQUEST = "LOCATIONS_REQUEST";
export const LOCATIONS_FAILURE = "LOCATIONS_FAILURE";
export const LOCATIONS_SUCCESS = "LOCATIONS_SUCCESS";

export const locationsSuccess = locations => {
  return {
    type: LOCATIONS_SUCCESS,
    isfetching,
    locations
  }
};

export const locationsRequest = () => {
  return {
    type: LOCATIONS_REQUEST,
    isfetching
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
export function locationsRequest(bbox, distance) {
  return function(dispatch, getState) {

    fetchPlacesFromBB(bbox, distance)
      .then(() => {
        dispatch(postSmsSuccess(false));
      })
      .catch( error => console.log("There was an error in actions/chatview sendMessage: " + JSON.stringify(error)));

  }
}
