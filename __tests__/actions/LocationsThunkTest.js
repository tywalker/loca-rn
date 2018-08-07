import React from 'react';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';

import * as actions from '../../src/actions/locations';
import * as api from '../../src/services/api';
import { mockLocations } from '../../src/mockdata/locations';

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
    const store = mockStore({ locations: [] });
    expect(store.dispatch).toBeDefined();
  })

  describe('locations', () => {
    it('creates LOCATIONS_SUCCESS when fetching locations is successful', () => {
      const expectedAction = { type: actions.LOCATIONS_SUCCESS };
      const store = mockStore({ locations: [] });

      return store.dispatch(actions.locationsRequest(bbox, distance)).then(() => {
        const storeActions = store.getActions();

        expect(storeActions[0]["type"]).toEqual(expectedAction.type);
      });
    });
  });

  describe.skip('images', () => {
    it('creates IMAGES_SUCCESS when fetching images has been done', () => {
      const expectedAction = { type: actions.IMAGES_SUCCESS };
      const store = mockStore({ images: [] });

      const locations = mockLocations();

      return store.dispatch(actions.buildImagePromiseArray(locations)).then( () => {
          const storeActions = store.getActions();

          expect(storeActions).toEqual(expectedAction);
      });
    });
  });
});
