import React from 'react';
import PropTypes from 'prop-types';

import ProductItem from '../ProductItem';

import { List } from './styles';

const ProductsList = ({ products }) => (
  <List>
    {products.map((p) => (
      <ProductItem key={p.id} product={p} />
    ))}
  </List>
);

ProductsList.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ProductsList;
