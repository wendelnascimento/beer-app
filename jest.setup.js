import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'jest-styled-components';
import 'isomorphic-fetch';

configure({ adapter: new Adapter() });
