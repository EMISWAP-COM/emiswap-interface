import React from 'react';
import { createGlobalStyle } from 'styled-components';
import Sidebar from 'Sidebar';
import sanitizeStyle from './sanitize';
import { Grid } from '../ThemeProvider/components';
import Settings from './Settings';

const GlobalStyle = createGlobalStyle`
  ${sanitizeStyle}
`;

const Layout = ({ children }) => {
  return (
    <>
      <GlobalStyle />
      <Grid height="100vh" gridTemplateColumns="230px auto">
        <Sidebar />
        <div>
          <Settings />
          {children}
        </div>
      </Grid>
    </>
  );
};

export default Layout;
