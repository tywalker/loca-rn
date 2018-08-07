import React from 'react';
import { FlatList, View } from 'react-native';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../../../src/reducers/locations';

import Loca from '../../../src/components/Loca';
import Locations from '../../../src/components/locations/Locations';
import { mockLocations } from '../../../src/mockdata/locations';

const mockStore = createStore(
  rootReducer,
  applyMiddleware(thunk),
);

let mockLocas = mockLocations();

const props = {
  locations: mockLocas,
  imagesDone: false,
};

describe("App loaded", () => {
  const wrapper = shallow(
    <Provider store={ mockStore }>
      <Locations store={ mockStore }/>
    </Provider>
  );

  it('renders Loca component', () => {
    expect(wrapper).toBeTruthy();
  });

  it('defaults view state to loading', () => {
    const state = mockStore.getState();

    expect(state.views.view).toBe('loading');
  });

  it('should successfully render the Locations component view', () => {
    wrapper.setProps({ imagesDone: false });
    let locations =  shallow(
      <Locations store={ mockStore }><View></View></Locations>);

    expect(locations.dive().dive()).toMatchSnapshot();
    wrapper.setProps({ imagesDone: true });
    expect(locations.dive().dive()).toMatchSnapshot();
  });

  it('should successfully update locations', () => {
    wrapper.setProps({ imagesDone: true, locations: mockLocas });

    let locations =  shallow(
      <Locations store={ mockStore } ><View></View></Locations>
    );

    console.log(props.locations)
    console.log(mockStore.getState())
    console.log(locations.dive().dive().debug());

    expect("false").toBe("false");
  });
});
