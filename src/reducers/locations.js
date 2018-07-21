import { combinereducers } from 'redux';
import { contact_search_success } from '../actions';

const initialviews = { view: 'loading', scrollable: true };

function views( state = initialviews, action ) {
  switch (action.type) {
    case set_height_width:
      return {
        ...state,
        height: action.height,
        width: action.width
      };

    default:
      return state
  }
}

const locations = (state = {
  isfetching: false,
  didinvalidate: false,
  items: []
}, action) => {
  switch (action.type) {
    case request_posts:
      return {
        ...state,
        isfetching: true,
        didinvalidate: false
      }
    case receive_posts:
      return {
        ...state,
        isfetching: false,
        didinvalidate: false,
        items: action.posts,
        lastupdated: action.receivedat
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
