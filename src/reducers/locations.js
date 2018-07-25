import { combineReducers } from 'redux';
import {
  LAT_LON,
  LOCATIONS_SUCCESS,
  LOCATIONS_FAILURE,
  LOCATIONS_REQUEST
} from '../actions/locations';

const initialviews = { view: 'loading', scrollable: true };

function views( state = initialviews, action ) {
  switch (action.type) {
  default:
      return state
  }
}

const locations = (state = {
  isfetching: false,
  places: [],
}, action) => {
  switch (action.type) {
    case LAT_LON:
      return {
        ...state,
        lat: action.lat,
        lon: action.lon
      }
    case LOCATIONS_FAILURE:
      return {
        ...state,
        isfetching: true,
        error: action.error
      }
    case LOCATIONS_SUCCESS:
      return {
        ...state,
        isfetching: false,
        places: state.places.concat(action.places),
      }
    default:
      return state
  }
};

const rootreducer = combineReducers({
  views,
  locations,
});

export default rootreducer;
