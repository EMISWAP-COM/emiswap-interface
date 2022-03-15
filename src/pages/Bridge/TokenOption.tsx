import React, { useCallback, useEffect, useState } from 'react';
import { useToken } from '../../hooks/Tokens';
import { useTokenBalancesWithLoadingIndicator } from '../../state/wallet/hooks';
import { useWeb3React } from '@web3-react/core';

const TokenOption = ({ token }) => {
  // IMportant в Metamask должна быть выставлена та же сеть, что и в селекте.
  const { active, account, connector, error } = useWeb3React();

  const tokenT = useToken(token.address);
  // console.log('LT', tokenT);

  // const [balances, loading] = useTokenBalancesWithLoadingIndicator(account, [token || {}]);
  // console.log('Balance', balances);

  return <option>{token.address}</option>;
};

export default TokenOption;
