import React from 'react';
import { shallow, mount } from 'enzyme';

import CategoriesList from '../CategoriesList';

import { ListItem, ItemButton } from '../styles';

describe('<CategoriesList />', () => {
  const categories = [
    {
      title: 'Cervejas',
      id: '94',
      __typename: 'Category',
    },
    {
      title: 'Destilados',
      id: '95',
      __typename: 'Category',
    },
    {
      title: 'Vinhos',
      id: '92',
      __typename: 'Category',
    },
    {
      title: 'Sem álcool',
      id: '96',
      __typename: 'Category',
    },
    {
      title: 'Petiscos',
      id: '97',
      __typename: 'Category',
    },
    {
      title: 'Outros',
      id: '98',
      __typename: 'Category',
    },
  ];

  it('should render', () => {
    shallow(<CategoriesList categories={categories} onSelect={jest.fn()} />);
  });

  it('should match stored snapshot', () => {
    const wrapper = mount(<CategoriesList categories={categories} onSelect={jest.fn()} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('should render 7 items (6 from the data + 1 static)', () => {
    const wrapper = mount(<CategoriesList categories={categories} onSelect={jest.fn()} />);

    expect(wrapper.find(ListItem)).toHaveLength(7);
  });

  it('should render the first item with the text "Todos"', () => {
    const wrapper = mount(<CategoriesList categories={categories} onSelect={jest.fn()} />);

    expect(
      wrapper
        .find(ListItem)
        .first()
        .text(),
    ).toEqual('Todos');
  });

  it('should call onSelect with the category id when an item is clicked', () => {
    const onSelect = jest.fn();

    const wrapper = mount(<CategoriesList categories={categories} onSelect={onSelect} />);

    wrapper
      .find(ItemButton)
      .at(1)
      .simulate('click');

    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(onSelect).toHaveBeenCalledWith('94');
  });
});
