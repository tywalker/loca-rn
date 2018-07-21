import { combineReducers } from 'redux';
import { LOCATIONS_SUCCESS, LOCATIONS_FAILURE, LOCATIONS_REQUEST } from '../actions/locations';

const initialviews = { view: 'loading', scrollable: true };

function views( state = initialviews, action ) {
  switch (action.type) {
  default:
      return state
  }
}

const locations = (state = {
  isfetching: false,
  locations: []
}, action) => {
  switch (action.type) {
    case LOCATIONS_FAILURE:
      return {
        ...state,
        isfetching: true,
      }
    case LOCATIONS_SUCCESS:
      return {
        ...state,
        isfetching: false,
        locations: action.locations,
      }
    default:
      return state
  }
};

const rootreducer = combineReducers({
  views,
  locations,
});

export default rootreducer
