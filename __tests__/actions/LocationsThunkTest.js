import React from 'react';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';

import * as actions from '../../src/actions/locations';
import * as api from '../../src/services/api';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

it('should contain no syntax errors', () => {
  expect(true).toBeTruthy();
});
describe('async actions', () => {
  let bbox, distance;

  beforeEach(() => {
    bbox = api.getBoundingBoxFromGeo(45, 45, 5);
    distance = 5;
  })
  afterEach(() => {
    fetchMock.reset()
    fetchMock.restore()
  });

  it('should have a thunk to request locations', () => {
    expect(actions.locationsRequest).toBeDefined();
  });

  it('should have reference to store and dispatch', () => {
    const store = mockStore({ places: [] });
    expect(store.dispatch).toBeDefined();
  })

  it('creates LOCATIONS_SUCCESS when fetching locations has been done', () => {
    let baseUrl = "https://api.flickr.com/services/rest/?method=flickr.places.getChildrenWithPhotosPublic";
    let params = {
      api_key : "2b3fe0a28145f01a2ab0a1ae3ee65c1d",
      place_id: "8fIn8DVTUb7r2JsG",
      format : "json",
      nojsoncallback : "1",
    }

    let query = Object.keys(params)
        .map(k => k + '=' + params[k])
        .join('&')

    fetchMock
      .getOnce(baseUrl + "&" + query,
      { body: { places: ['do something'] }, headers: { 'content-type': 'application/json' } });

    const expectedActions = [{
      type: actions.LOCATIONS_SUCCESS,
      places: { places: ['do something'] }
    }];

    const store = mockStore({ places: [] });

    // return store.dispatch(actions.fetchTodos()).then(() => {
    return store.dispatch(actions.locationsRequest(bbox, distance)).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    });
  });
});
