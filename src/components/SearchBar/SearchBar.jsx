import React from 'react';
import PropTypes from 'prop-types';

import { CustomInput, InputWrapper, ErrorMessage } from './styles';

const SearchBar = ({
  onChange, value, loading, error,
}) => (
  <div>
    <InputWrapper loading={loading.toString()}>
      <CustomInput
        type="search"
        placeholder="Ex: Rua Américo Brasiliense, São Paulo"
        onChange={onChange}
        value={value}
        error={error.toString()}
        aria-invalid={error}
        aria-errormessage="errorMessageSearchBar"
      />
    </InputWrapper>
    {error && (
      <ErrorMessage id="errorMessageSearchBar">
        Houve um problema ao encontrar o endereço solicitado, tente novamente.
      </ErrorMessage>
    )}
  </div>
);

SearchBar.defaultProps = {
  loading: false,
  error: false,
};

SearchBar.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  loading: PropTypes.bool,
  error: PropTypes.bool,
};

export default SearchBar;
