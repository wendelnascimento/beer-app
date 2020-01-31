import React from 'react';
import PropTypes from 'prop-types';

import { CustomInput } from './styles';

const SearchBar = ({ onChange, value }) => (
  <CustomInput
    type="search"
    placeholder="Ex: Rua Américo Brasiliense, São Paulo"
    onChange={onChange}
    value={value}
  />
);

SearchBar.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default SearchBar;
