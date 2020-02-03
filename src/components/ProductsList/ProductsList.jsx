import React from 'react';
import PropTypes from 'prop-types';

import ProductItem from '../ProductItem';

import { List, EmptyText } from './styles';

const ProductsList = ({ products }) => {
  if (products.length === 0) {
    return <EmptyText>Nenhum produto encontrado</EmptyText>;
  }
  return (
    <List>
      {products.map((p) => (
        <ProductItem key={p.id} product={p} />
      ))}
    </List>
  );
};

ProductsList.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ProductsList;
