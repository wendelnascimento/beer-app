import React from 'react';
import { shallow, mount } from 'enzyme';
import { css } from 'styled-components';

import SearchBar from '../SearchBar';
import {
  InputWrapper,
  CustomInput,
  loadingAnimation,
  blinkErrorAnimation,
  opactityAnimationMessage,
} from '../styles';

describe('<SearchBar />', () => {
  const props = {
    onChange: jest.fn(),
    value: '',
  };

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('does render properly', () => {
    shallow(<SearchBar onChange={props.onChange} value={props.value} />);
  });

  it('matches stored snapshot', () => {
    const wrapper = mount(<SearchBar onChange={props.onChange} value={props.value} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('does have correct placeholder', () => {
    const wrapper = mount(<SearchBar onChange={props.onChange} value={props.value} />);

    expect(wrapper.find('input').props().placeholder).toEqual(
      'Ex: Rua Américo Brasiliense, São Paulo',
    );
  });

  it('does call onChange when we type on it', () => {
    const wrapper = mount(<SearchBar onChange={props.onChange} value={props.value} />);

    wrapper.find('input').simulate('change', { target: { value: 'Test' } });

    expect(props.onChange).toHaveBeenCalledTimes(1);
  });

  it('does update the value accordingly to prop change', () => {
    const wrapper = mount(<SearchBar onChange={props.onChange} value={props.value} />);

    wrapper.setProps({
      value: 'Test',
    });

    expect(wrapper.find('input').getDOMNode().value).toEqual('Test');
  });

  it('renders loading state', () => {
    const wrapper = mount(<SearchBar onChange={props.onChange} value={props.value} loading />);

    /* The two lines below are a hack, because if you wrap the entire line into an css`` rule
       you'll gonna see an error from styled components, because the keyframes will stil be an
       object. So I just got the generated name to simulate the rule.
    */
    const keyframesObject = css`
      ${loadingAnimation}
    `;
    const animation = `${keyframesObject[1].name} 3s infinite ease-in-out alternate`;

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find(InputWrapper)).toHaveStyleRule('animation', animation, {
      modifier: ':after',
    });
  });

  it('renders error state', () => {
    const wrapper = mount(<SearchBar onChange={props.onChange} value={props.value} error />);

    const blinkAnimationObject = css`
      ${blinkErrorAnimation}
    `;
    const blinkAnimation = `${blinkAnimationObject[1].name} 2s 4 cubic-bezier(0.19,1,0.22,1)`;

    const opacityAnimationObject = css`
      ${opactityAnimationMessage}
    `;
    const opacityAnimation = `${opacityAnimationObject[1].name} 2s forwards cubic-bezier(0.19,1,0.22,1)`;

    expect(wrapper).toMatchSnapshot();
    expect(
      wrapper
        .find(CustomInput)
        .getDOMNode()
        .getAttribute('aria-invalid'),
    ).toBe('true');
    expect(wrapper.find(CustomInput)).toHaveStyleRule('animation', blinkAnimation);
    expect(wrapper.find('strong').text()).toEqual(
      'Houve um problema ao encontrar o endereço solicitado, tente novamente.',
    );
    expect(wrapper.find('strong')).toHaveStyleRule('animation', opacityAnimation);
  });
});
