import React, { Component } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { Geolocation } from 'react-native';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './src/reducers/locations';

import Loca from './src/components/Loca';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

const store = createStore(
  rootReducer,
  applyMiddleware(thunk),
);

type Props = {};

export default class App extends Component<Props> {
  componentDidUpdate(nextProps) {
    let view = store.getState().views.view;
    this._view = view;
  }

  render() {
    return (
      <Provider store={ store } >
        <Loca />
      </Provider>
    );
  }
}
