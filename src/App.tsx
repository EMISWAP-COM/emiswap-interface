import React from 'react';
import Landing from './Landing';
import Sidebar from './Sidebar';
import ThemeProvider from './ThemeProvider';

const App = () => (
  <ThemeProvider>
    <Landing />
    <Sidebar />
  </ThemeProvider>
);

export default App;
