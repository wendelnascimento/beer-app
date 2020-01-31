import React from 'react';
import { shallow, mount } from 'enzyme';

import Header from '../Header';

describe('<Header />', () => {
  it('does render properly', () => {
    shallow(<Header />);
  });

  it('matches stored snapshot', () => {
    const wrapper = mount(<Header />);

    expect(wrapper).toMatchSnapshot();
  });

  it('does have Beer App title', () => {
    const wrapper = mount(<Header />);

    expect(wrapper.find('h1').text()).toBe('Beer App🍺');
  });
});
