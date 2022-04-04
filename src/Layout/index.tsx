import React from 'react';
import { createGlobalStyle } from 'styled-components';
import Sidebar from 'Sidebar';
import sanitizeStyle from './sanitize';
import { Grid } from '../ThemeProvider/components';

const GlobalStyle = createGlobalStyle`
  ${sanitizeStyle}
  
  body {
    background: #0F0F13;
  }
`;

const Layout = ({ children }) => {
  return (
    <>
      <GlobalStyle />
      <Grid height="100vh" gridTemplateColumns="230px auto">
        <Sidebar />
        <div>{children}</div>
      </Grid>
    </>
  );
};

export default Layout;
