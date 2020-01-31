import React from 'react';
import { shallow, mount } from 'enzyme';

import Footer from '../Footer';

describe('<Footer />', () => {
  it('does render properly', () => {
    shallow(<Footer />);
  });

  it('matches stored snapshot', () => {
    const wrapper = mount(<Footer />);

    expect(wrapper).toMatchSnapshot();
  });

  it('does have current year after copyright', () => {
    const wrapper = mount(<Footer />);

    expect(
      wrapper
        .find('span')
        .first()
        .text(),
    ).toBe(`Beer App 🍺 - © ${new Date().getFullYear()}`);
  });
});
