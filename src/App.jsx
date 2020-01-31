import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';

import Home from './screens/Home';

const GlobalStyle = createGlobalStyle`
  html {
    margin: 0;
  }

  body {
    margin: 0;
    font-family: 'Open Sans', sans-serif;
  }
`;

const App = () => (
  <>
    <GlobalStyle />
    <Router>
      <Switch>
        <Route component={Home} />
      </Switch>
    </Router>
  </>
);

export default App;
