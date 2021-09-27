import React from 'react';
import { useToken } from '../../hooks/Tokens';

const TokenOption = ({ token }) => {
  const tokenT = useToken(token.address);
  return <option>{token.address}</option>;
};

export default TokenOption;
