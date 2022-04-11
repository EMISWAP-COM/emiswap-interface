import React from 'react';

const Condition = ({ when, children }) => {
  return Boolean(when) && children ? <>{children}</> : null;
};

export default Condition;
