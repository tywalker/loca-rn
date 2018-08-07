import { combineReducers } from 'redux';
import {
  LAT_LON,
  LOCATIONS_SUCCESS,
  LOCATIONS_FAILURE,
  LOCATIONS_REQUEST,
  IMAGES_SUCCESS,
  IMAGES_FAILURE,
  IMAGES_REQUEST,
  IMAGES_DONE
} from '../actions/locations';

const initialviews = { view: 'loading', scrollable: true };

export const views = ( state = initialviews, action ) => {
  switch (action.type) {
  default:
      return state
  }
}

export const locations = (state = {
  isfetching: false,
  locations: [],
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
        locations: action.locations,
    }
    default:
      return state
  }
};

export const images = (state = {
  isfetching: false,
  images: {},
  done: false
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
        images: action.images
      }
    case IMAGES_DONE:
      return {
        ...state,
        done: true
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
