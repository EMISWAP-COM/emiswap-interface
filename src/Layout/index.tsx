import React from 'react';
import Sidebar from 'Sidebar';
import { Grid } from '../ThemeProvider/components';

const Layout = ({ children }) => {
  return (
    <>
      <Grid height="100vh" gridTemplateColumns="230px auto">
        <Sidebar />
        <div>{children}</div>
      </Grid>
    </>
  );
};

export default Layout;
export { default as GlobalStyle } from './globalStyle';
