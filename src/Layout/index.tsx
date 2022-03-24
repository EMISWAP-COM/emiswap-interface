import React from 'react';
import { Props } from '../ThemeProvider';
import styled from 'styled-components';
import { color, layout, grid } from 'styled-system';
import Sidebar from 'Sidebar';
import { Grid } from 'ThemeProvider/components';

const LayoutWrapper = styled(Grid)<Props>`
  ${layout}
  ${grid}
`;

const Layout = ({ children }) => {
  return (
    <LayoutWrapper height="100vh" gridTemplateColumns="230px auto">
      <Sidebar />
      <div>{children}</div>
    </LayoutWrapper>
  );
};

export default Layout;
