import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

import {
  Card,
  ProductImage,
  ProductPrice,
  QuantityRow,
  AddButton,
  RemoveButton,
  ImagePlaceholder,
  ProductTitle,
  QuantityCount,
} from './styles';

const ProductItem = ({ product }) => {
  const [quantity, setQuantity] = useState(0);
  const [errorImg, setErrorImg] = useState(false);

  const price = useRef(
    Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(product.productVariants[0].price),
  );

  const addItem = () => setQuantity(quantity + 1);

  const removeItem = () => quantity > 0 && setQuantity(quantity - 1);

  const handleOnErrorImg = () => setErrorImg(true);

  useEffect(() => {
    if (!product.images[0].url) {
      handleOnErrorImg();
    }
  }, [product]);

  return (
    <Card>
      {errorImg ? (
        <ImagePlaceholder>
          <span role="img" aria-label={product.title}>
            🍺
          </span>
        </ImagePlaceholder>
      ) : (
        <ProductImage src={product.images[0].url} alt={product.title} onError={handleOnErrorImg} />
      )}
      <ProductTitle>{product.title}</ProductTitle>
      <ProductPrice>{price.current}</ProductPrice>
      <QuantityRow>
        <RemoveButton onClick={removeItem}>
          <span>-</span>
        </RemoveButton>
        <QuantityCount>{quantity}</QuantityCount>
        <AddButton onClick={addItem}>
          <span>+</span>
        </AddButton>
      </QuantityRow>
    </Card>
  );
};

ProductItem.propTypes = {
  product: PropTypes.PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    rgb: PropTypes.bool.isRequired,
    images: PropTypes.arrayOf(PropTypes.object).isRequired,
    productVariants: PropTypes.arrayOf(PropTypes.object).isRequired,
    __typename: PropTypes.string.isRequired,
  }).isRequired,
};

export default ProductItem;
