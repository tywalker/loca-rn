import * as reducers from '../../src/reducers/locations';
import * as types from '../../src/actions/locations';
describe('locations reducer', () => {

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
  });
})
