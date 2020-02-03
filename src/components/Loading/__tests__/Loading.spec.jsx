import React from 'react';
import { shallow, mount } from 'enzyme';
import { css } from 'styled-components';

import Loading from '../Loading';

import { bounceAndRotate, Beer } from '../styles';

describe('<Loading />', () => {
  it('should render', () => {
    shallow(<Loading />);
  });

  it('should match stored snapshot', () => {
    const wrapper = mount(<Loading />);

    expect(wrapper).toMatchSnapshot();
  });

  it('should be animating', () => {
    const wrapper = mount(<Loading />);

    const keyframesObject = css`
      ${bounceAndRotate}
    `;
    const animation = `${keyframesObject[1].name} 2s infinite linear`;

    expect(wrapper.find(Beer)).toHaveStyleRule('animation', animation);
  });
});
