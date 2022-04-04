import React from 'react';
import Layout from 'Layout';
import ThemeProvider from './ThemeProvider';
import Swap from './pages/Swap/index_new';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import Landing from './pages/Landing/Landing';

const App = () => (
  <ThemeProvider>
    <BrowserRouter>
      <Layout>
        <Switch>
          <Redirect exact from="/" to="/main" />
          <Route exact strict path="/main" component={Landing} />
          <Route exact strict path="/swap" component={Swap} />
        </Switch>
      </Layout>
    </BrowserRouter>
  </ThemeProvider>
);

export default App;
