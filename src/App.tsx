import React from 'react';
import Layout from 'Layout'
import Landing from './Landing';
import ThemeProvider from './ThemeProvider';

const App = () => (
  <ThemeProvider>
    <Layout>
        <Landing />
    </Layout>
  </ThemeProvider>
);

export default App;
