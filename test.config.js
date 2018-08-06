import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

const mockGeolocation = {
  geolocation: {
    getCurrentPosition: jest.fn(),
    watchPosition: jest.fn(),
    requestAuthorization: jest.fn()
  },
};

global.navigator = mockGeolocation;
