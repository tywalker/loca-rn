import { combinereducers } from 'redux';
import {  } from '../actions';

const initialviews = { view: 'loading', scrollable: true };

function views( state = initialviews, action ) {
  switch (action.type) {
    case set_height_width:
      return {
        ...state
      };

    default:
      return state
  }
}

const locations = (state = {
  isfetching: false,
  locations: []
}, action) => {
  switch (action.type) {
    case locations_failure:
      return {
        ...state,
        isfetching: true,
      }
    case locations_success:
      return {
        ...state,
        isfetching: false,
        locations: action.locations,
      }
    default:
      return state
  }
};

const rootreducer = combinereducers({
  views,
  locations,
});

export default rootreducer
