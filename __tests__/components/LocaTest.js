import React from 'react';
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
  const wrapper = shallow(<AppContainer store={store}/>);

  
});
