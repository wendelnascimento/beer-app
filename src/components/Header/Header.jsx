import React from 'react';

import { Wrapper, Title } from './styles';

const Header = () => (
  <Wrapper>
    <Title>
      Beer App
      <span role="img" aria-label="Beer">
        🍺
      </span>
    </Title>
  </Wrapper>
);

export default Header;
