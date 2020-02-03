import React from 'react';
import { shallow, mount } from 'enzyme';

import ProductItem from '../ProductItem';
import {
  ProductImage, AddButton, RemoveButton, QuantityCount,
} from '../styles';

describe('<ProductItem />', () => {
  const product = {
    id: '8868',
    title: 'Skol 269ml - Unidade',
    rgb: false,
    images: [
      {
        url:
          'https://courier-images-codechallenge.s3-us-west-2.amazonaws.com/product/8868_205f958d-2e51-48a3-b4d5-a2998765571a.jpg',
        __typename: 'ProductImage',
      },
    ],
    productVariants: [
      {
        availableDate: '2018-10-31T00:00:00',
        productVariantId: '8502',
        price: 2.09,
        inventoryItemId: '80149',
        shortDescription: null,
        title: 'Skol 269ml - Unidade',
        published: null,
        volume: '0,00269',
        volumeUnit: null,
        description: null,
        subtitle: 'Cervejas',
        components: [],
        __typename: 'ProductVariant',
      },
    ],
    __typename: 'Product',
  };

  it('should render', () => {
    shallow(<ProductItem product={product} />);
  });

  it('should render with image', () => {
    const wrapper = mount(<ProductItem product={product} />);

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find(ProductImage)).toHaveLength(1);
  });

  it('should render without image', () => {
    const newProduct = { ...product };
    newProduct.images[0].url = '';

    const wrapper = mount(<ProductItem product={newProduct} />);

    wrapper.update();

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find(ProductImage)).toHaveLength(0);
  });

  it('should increment item quantity when AddButton is clicked', () => {
    const wrapper = mount(<ProductItem product={product} />);

    wrapper.find(AddButton).simulate('click');

    const counter = wrapper.find(QuantityCount);

    expect(counter.text()).toBe('1');
  });

  it('should decrement item quantity when RemoveButton is clicked and quantity is more than 0', () => {
    const wrapper = mount(<ProductItem product={product} />);

    wrapper.find(AddButton).simulate('click');
    wrapper.find(RemoveButton).simulate('click');

    const counter = wrapper.find(QuantityCount);

    expect(counter.text()).toBe('0');
  });

  it('should not decrement item quantity when RemoveButton is clicked and quantity is 0', () => {
    const wrapper = mount(<ProductItem product={product} />);

    wrapper.find(RemoveButton).simulate('click');

    const counter = wrapper.find(QuantityCount);

    expect(counter.text()).toBe('0');
  });
});
