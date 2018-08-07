import React from 'react';
import * as actions from '../../src/actions/locations';

import renderer from 'react-test-renderer';

test('testing works correctly', () => {
  expect(true).toBeTruthy();
});

describe('locations', () => {
  describe('latLon', () => {
    it('should have a latLon function', () => {
      let latLon = actions.latLon;

      expect(latLon).toBeDefined();
    });

    it('should create an action to update latitude and longitude', () => {
      const lat = '45.5';
      const lon = '45.5';
      const expectedAction = {
        type: actions.LAT_LON,
        lat,
        lon
      };

      expect(actions.latLon(lat, lon)).toEqual(expectedAction);
    });
  })

  describe('should create an action when locations fetched successfully', () => {
    const places = {};
    const expectedAction = {
      type: actions.LOCATIONS_SUCCESS,
      places
    };

    expect(actions.locationsSuccess(places)).toEqual(expectedAction);
  });

  describe('should create an action when locations fetch failed', () => {
    const error = "Some error";
    const expectedAction = {
      type: actions.LOCATIONS_FAILURE,
      error
    };

    expect(actions.locationsFailure(error)).toEqual(expectedAction);
  });

  describe('should create an action when images fetch successfully', () => {
    const images = ['https://example.image.src.jpg'];
    const expectedAction = {
      type: actions.IMAGES_SUCCESS,
      images
    };

    expect(actions.imagesSuccess(images)).toEqual(expectedAction);
  });

  describe('should create an action when images fetch failed', () => {
    const error = "Some error when getting images";
    const expectedAction = {
      type: actions.IMAGES_FAILURE,
      error
    };

    expect(actions.imagesFailure(error)).toEqual(expectedAction);
  })

  describe('should create an action when images are done fetching', () => {
    const expectedAction = {
      type: actions.IMAGES_DONE
    }

    expect(actions.imagesDone()).toEqual(expectedAction);
  })
});
