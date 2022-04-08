import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Layout, { GlobalStyle } from 'Layout';
import Landing from './Landing';
import ThemeProvider from './ThemeProvider';
import DevelopmentGalery from 'ui-kit/examples';

const App = () => (
  <BrowserRouter>
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
  </BrowserRouter>
);

export default App;
