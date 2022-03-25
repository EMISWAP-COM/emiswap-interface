import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { layout, grid } from 'styled-system';
import Sidebar from 'Sidebar';
import { Grid, Props } from 'ThemeProvider';
import sanitizeStyle from './sanitize';

const LayoutWrapper = styled(Grid)<Props>`
  ${layout}
  ${grid}
`;

const GlobalStyle = createGlobalStyle`
  ${sanitizeStyle}
`;

const Layout = ({ children }) => {
  return (
    <>
      <GlobalStyle />
      <LayoutWrapper height="100vh" gridTemplateColumns="230px auto">
        <Sidebar />
        <div>{children}</div>
      </LayoutWrapper>
    </>
  );
};

export default Layout;
