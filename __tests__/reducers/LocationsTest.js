import * as reducers from '../../src/reducers/locations';
import * as types from '../../src/actions/locations';

describe('locations reducers', () => {
  describe('views', () => {
    it('should return the initial state', () => {
      expect(reducers.views(undefined, {})).toEqual(
        { view: 'loading', scrollable: true }
      );
    });
  });

  describe('locations', () => {
    it('should handle LAT_LON', () => {
      expect(reducers.locations(
        [],
        {
          type: types.LAT_LON,
          lat: 45,
          lon: 45
        }
      ))
      .toEqual({
        lat: 45,
        lon: 45
      });
    });

    it('should handle LOCATIONS_SUCCESS', () => {
      expect(reducers.locations(
        [],
        {
          type: types.LOCATIONS_SUCCESS,
          locations: [{ places: { id: 1, woe_name: 'raleigh'} }],
          isFetching: true
        }
      ))
      .toEqual({
        locations: [{ places: { id: 1, woe_name: 'raleigh'} }],
        isFetching: false
      });
    });

    it('should handle LOCATIONS_FAILURE', () => {
      expect(reducers.locations(
        [],
        {
          type: types.LOCATIONS_FAILURE,
          error: 'This is an error',
          isFetching: true
        }
      ))
      .toEqual({
        error: 'This is an error',
        isFetching: false
      });
    });
  });

  describe('Images', () => {
    it('should handle IMAGES_DONE', () => {
      expect(reducers.images(
        { imagesDone: false },
        {
          type: types.IMAGES_DONE
        }
      ))
      .toEqual({
        imagesDone: true
      });
    });

    it('should handle IMAGES_SUCCESS', () => {
      expect(reducers.images(
        {
          isFetching: false,
          images: {}
        },
        {
          type: types.IMAGES_SUCCESS,
          images: [{ url: "http://exmple.com" }, { url: "http://test.com" }],
        }
      ))
      .toEqual({
        images: [{ url: "http://exmple.com" }, { url: "http://test.com" }],
        isFetching: false
      });
    });

    it('should handle IMAGES_FAILURE', () => {
      expect(reducers.images(
        {
          isFetching: false,
        },
        {
          type: types.IMAGES_FAILURE,
          error: 'This is an error',
          isFetching: true
        }
      ))
      .toEqual({
        error: 'This is an error',
        isFetching: false
      });
    });
  });
})
