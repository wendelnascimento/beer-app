import React from 'react';
import PropTypes from 'prop-types';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

import { Wrapper } from './styles';

const BaseLayout = ({ children }) => (
  <Wrapper>
    <Header />
    {children}
    <Footer />
  </Wrapper>
);

BaseLayout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

export default BaseLayout;
