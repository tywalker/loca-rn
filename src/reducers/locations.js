import { combineReducers } from 'redux';
import {
  LAT_LON,
  LOCATIONS_SUCCESS,
  LOCATIONS_FAILURE,
  LOCATIONS_REQUEST,
  IMAGES_SUCCESS,
  IMAGES_FAILURE,
  IMAGES_REQUEST
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
        places: action.places,
      }
    case IMAGES_FAILURE:
      return {
        ...state,
        isfetching: true,
        error: action.error
      }
    case IMAGES_SUCCESS:
      return {
        ...state,
        isfetching: false,
        images: action.images,
      }
    default:
      return state
  }
};

const images = (state = {
  isfetching: false,
  images: {},
}, action) => {
  switch (action.type) {
    case IMAGES_FAILURE:
      return {
        ...state,
        isfetching: true,
        error: action.error
      }
    case IMAGES_SUCCESS:
      return {
        ...state,
        isfetching: false,
        images: Object.assign(action.images, state.images.images),
      }
    default:
      return state
  }
};

const rootreducer = combineReducers({
  views,
  locations,
  images
});

export default rootreducer;
