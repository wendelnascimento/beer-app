import React from 'react';

import { Wrapper, Beer } from './styles';

const Loading = () => (
  <Wrapper>
    <Beer>
      <span role="img" aria-label="Beer App">
        🍺
      </span>
    </Beer>
  </Wrapper>
);

export default Loading;
