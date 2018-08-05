import React from 'react';
import { isEmpty } from '../src/helpers/helpers';

import renderer from 'react-test-renderer';

test('testing works correctly', () => {
  expect(true).toBeTruthy();
});

describe("isEmpty", () => {
  test('isEmpty function exists', () => {
    expect(isEmpty).toBeDefined();
  });

  test('isEmpty returns correct Boolean when passed object', () => {
    let obj = {a: 'a', b: 'b'};
    expect(isEmpty(obj)).toBeFalsy();

    let emptyObj = {};
    expect(isEmpty(emptyObj)).toBeTruthy();

    expect(typeof isEmpty(emptyObj)).toEqual('boolean');
  });

})
