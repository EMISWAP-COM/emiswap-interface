import React from 'react';

const Condition = ({ when, children }) =>  Boolean(when) && children ? <>{children}</> : null;


export default Condition;
