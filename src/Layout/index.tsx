import React from 'react';
import Sidebar from 'Sidebar';

const Layout = ({ children }) => {
  return (
    <>
      <Sidebar />
      {children}
    </>
  );
};

export default Layout;
