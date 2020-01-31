import React from 'react';
import PropTypes from 'prop-types';

import { CustomInput, InputWrapper } from './styles';

const SearchBar = ({ onChange, value, loading }) => (
  <InputWrapper loading={loading.toString()}>
    <CustomInput
      type="search"
      placeholder="Ex: Rua Américo Brasiliense, São Paulo"
      onChange={onChange}
      value={value}
    />
  </InputWrapper>
);

SearchBar.defaultProps = {
  loading: false,
};

SearchBar.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  loading: PropTypes.bool,
};

export default SearchBar;
