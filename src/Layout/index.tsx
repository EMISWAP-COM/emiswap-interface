import React from 'react';
import Sidebar from 'Sidebar';
import { Flex } from '../ThemeProvider';

const Layout = ({ children }) => {
  return (
    <Flex width="100wh">
      <Sidebar />
      {children}
    </Flex>
  );
};

export default Layout;
export { default as GlobalStyle } from './globalStyle';
