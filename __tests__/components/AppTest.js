import React from 'react';
import Locations from '../../src/components/locations/Locations';

import renderer from 'react-test-renderer';

test('renders correctly', () => {
  const tree = renderer.create(<Locations />).toJSON();
  expect(tree).toMatchSnapshot();
});
