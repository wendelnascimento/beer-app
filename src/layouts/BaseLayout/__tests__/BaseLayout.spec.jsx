import React from 'react';
import { shallow, mount } from 'enzyme';

import BaseLayout from '../BaseLayout';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';

describe('<BaseLayout />', () => {
  it('does render properly', () => {
    shallow(
      <BaseLayout>
        <h1>Test</h1>
      </BaseLayout>,
    );
  });

  it('matches stored snapshot', () => {
    const wrapper = mount(
      <BaseLayout>
        <h1>Test</h1>
      </BaseLayout>,
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('does have <Header /> component inside of it', () => {
    const wrapper = mount(
      <BaseLayout>
        <h1>Test</h1>
      </BaseLayout>,
    );

    expect(wrapper.contains(Header)).toEqual(true);
  });

  it('does have <Footer /> component inside of it', () => {
    const wrapper = mount(
      <BaseLayout>
        <h1>Test</h1>
      </BaseLayout>,
    );

    expect(wrapper.contains(Footer)).toEqual(true);
  });

  it('does render children between <Header /> and <Footer />', () => {
    const wrapper = mount(
      <BaseLayout>
        <h1>Test</h1>
      </BaseLayout>,
    );

    expect(
      wrapper
        .find('h1')
        .at(1)
        .text(),
    ).toBe('Test');
    expect(wrapper.find('Header + h1')).toHaveLength(1);
    expect(wrapper.find('h1 + Footer')).toHaveLength(1);
  });
});
