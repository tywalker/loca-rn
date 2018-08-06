import React from 'react';
import { View } from 'react-native';
import Locations from '../../src/components/locations/locations';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../../src/reducers/locations';
import Loca from '../../src/components/Loca';

const store = createStore(
  rootReducer,
  applyMiddleware(thunk),
);

describe("App loaded", () => {
  it('renders Loca component', () => {
    const wrapper = shallow(
      <Provider store={ store }>
        <Loca/>
      </Provider>
    );

    expect(wrapper).toBeTruthy();
  });

  it('defaults view state to loading', () => {
    const state = store.getState();

    expect(state.views.view).toBe('loading');
  });

  it('should successfully render the Locations component view', () => {
    let styles = {
      container: {}
    }

    const wrapper = shallow(
      <Loca store={store}>
        <View style={ styles.container }>
          <Locations boundingBox={ this.bbox } />
        </View>
      </Loca> 
    );

    expect(wrapper.dive()).toMatchSnapshot();
  });
});
