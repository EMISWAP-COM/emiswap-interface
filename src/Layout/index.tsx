import Header from 'Header';
import React from 'react';
import Sidebar from 'Sidebar';

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <div>
        <Sidebar />
        {children}
      </div>
    </>
  );
};

export default Layout;
