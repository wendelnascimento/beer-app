import React from 'react';
import { shallow, mount } from 'enzyme';
import { MemoryRouter, Link } from 'react-router-dom';

import AddressList from '../AddressList';
import { ListItem } from '../styles';

describe('<AddressList />', () => {
  const addresses = [
    {
      id: 1,
      position: [123456, 456123],
      title: 'Test Address 1',
      vicinity: '<b>Test city 1</b>',
    },
    {
      id: 2,
      position: [123456, 456123],
      title: 'Test Address 2',
      vicinity: '<b>Test city 2</b>',
    },
    {
      id: 3,
      position: [123456, 456123],
      title: 'Test Address 3',
      vicinity: '<b>Test city 3</b>',
    },
    {
      id: 4,
      title: 'Test Address 4',
    },
  ];

  it('does render properly', () => {
    shallow(<AddressList addresses={[]} />);
  });

  it('matches stored snapshot with empty list', () => {
    const wrapper = mount(<AddressList addresses={[]} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('matches stored snapshot with a populated list', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={[{ pathname: '/', key: 'testKey' }]}>
        <AddressList addresses={addresses} />
      </MemoryRouter>,
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('renders only items with "location" property', () => {
    const wrapper = mount(
      <MemoryRouter>
        <AddressList addresses={addresses} />
      </MemoryRouter>,
    );

    expect(wrapper.find(ListItem)).toHaveLength(3);
  });

  it('renders null if there is no addresses', () => {
    const wrapper = mount(<AddressList addresses={[]} />);

    expect(wrapper.isEmptyRender()).toEqual(true);
  });

  it('contains links to list page', () => {
    const wrapper = mount(
      <MemoryRouter>
        <AddressList addresses={addresses} />
      </MemoryRouter>,
    );

    expect(
      wrapper
        .find(Link)
        .first()
        .prop('to'),
    ).toBe(
      `/list?lat=${addresses[0].position[0]}&long=${addresses[0].position[1]}&address=${addresses[0].title}`,
    );
  });
});
