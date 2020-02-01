import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'jest-styled-components';
import 'isomorphic-fetch';

const mockGeolocation = {
  getCurrentPosition: jest
    .fn()
    .mockImplementationOnce((success) => Promise.resolve(
      success({
        coords: {
          latitude: 51.1,
          longitude: 45.3,
        },
      }),
    ))
    .mockImplementationOnce((success) => Promise.resolve(
      success({
        coords: {
          latitude: 51.1,
          longitude: 45.3,
        },
      }),
    )),
  watchPosition: jest.fn(),
};

global.navigator.geolocation = mockGeolocation;

configure({ adapter: new Adapter() });
