import React, { Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import { ApolloProvider } from 'react-apollo';

import client from './apollo/apolloClient';

import Loading from './components/Loading';

const Home = React.lazy(() => import('./screens/Home'));
const Products = React.lazy(() => import('./screens/Products'));

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
    <Suspense fallback={<Loading />}>
      <Router>
        <Switch>
          <Route
            exact
            path="/list"
            component={() => (
              <ApolloProvider client={client}>
                <Products />
              </ApolloProvider>
            )}
          />
          <Route component={Home} />
        </Switch>
      </Router>
    </Suspense>
  </>
);

export default App;
