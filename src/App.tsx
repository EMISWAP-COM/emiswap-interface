import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Layout, { GlobalStyle } from 'Layout';
import Landing from './Landing';
import ThemeProvider from './ThemeProvider';
import DevelopmentGalery from 'ui-kit/examples';
import store from './state';
import { Provider } from 'react-redux';
import { Web3ReactProvider } from '@web3-react/core';
import { getLibrary, Web3ProviderNetwork } from './index';

const App = () => (
  <BrowserRouter>
    <Provider store={store}>
      <ThemeProvider>
        <Web3ReactProvider getLibrary={getLibrary}>
          <Web3ProviderNetwork getLibrary={getLibrary}>
            <GlobalStyle />
            <Switch>
              {process.env.NODE_ENV === 'development' && (
                <Route path="/developmentGalery" component={DevelopmentGalery} />
              )}
              <Layout>
                <Route path="/" component={Landing} />
              </Layout>
            </Switch>
          </Web3ProviderNetwork>
        </Web3ReactProvider>
      </ThemeProvider>
    </Provider>
  </BrowserRouter>
);

export default App;
