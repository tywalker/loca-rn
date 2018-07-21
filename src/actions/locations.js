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
