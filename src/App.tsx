import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Layout, { GlobalStyle } from 'Layout';
import Landing from './Landing';
import ThemeProvider from './ThemeProvider';
import DevelopmentGalery from 'ui-kit/examples';
import store from './state';
import { Provider } from 'react-redux';

const App = () => (
  <BrowserRouter>
    <Provider store={store}>
      <ThemeProvider>
        <GlobalStyle />
        <Switch>
          {process.env.NODE_ENV === 'development' && (
            <Route path="/developmentGalery" component={DevelopmentGalery} />
          )}
          <Layout>
            <Route path="/" component={Landing} />
          </Layout>
        </Switch>
      </ThemeProvider>
    </Provider>
  </BrowserRouter>
);

export default App;
