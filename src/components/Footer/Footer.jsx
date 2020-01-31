import React from 'react';

import { Wrapper } from './styles';

const Footer = () => (
  <Wrapper>
    <span>
      Beer App
      {' '}
      <span role="img" aria-label="Beer">
        🍺
      </span>
      {' '}
      - ©
      {' '}
      {new Date().getFullYear()}
    </span>
  </Wrapper>
);

export default Footer;
