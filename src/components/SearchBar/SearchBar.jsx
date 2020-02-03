import React from 'react';
import PropTypes from 'prop-types';

import { CustomInput, InputWrapper, ErrorMessage } from './styles';

const SearchBar = ({
  onChange, value, loading, error, placeholder, errorMessage,
}) => (
  <div>
    <InputWrapper loading={loading.toString()}>
      <CustomInput
        type="search"
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        error={error.toString()}
        aria-invalid={error}
        aria-errormessage="errorMessageSearchBar"
      />
    </InputWrapper>
    {error && <ErrorMessage id="errorMessageSearchBar">{errorMessage}</ErrorMessage>}
  </div>
);

SearchBar.defaultProps = {
  loading: false,
  error: false,
  placeholder: 'Ex: Rua Américo Brasiliense, São Paulo',
  errorMessage: 'Houve um problema ao encontrar o endereço solicitado, tente novamente.',
};

SearchBar.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  loading: PropTypes.bool,
  error: PropTypes.bool,
  placeholder: PropTypes.string,
  errorMessage: PropTypes.string,
};

export default SearchBar;
