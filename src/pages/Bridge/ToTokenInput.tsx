import React from 'react';
import { useDispatch } from 'react-redux';
import { formatUnits } from '@ethersproject/units';
import { useAppSelector } from 'state/hooks';
import { selectQuote, selectToToken, selectToTokenList, setToToken } from './slice';
import TokenInput from './TokenInput';

const ToTokenInput = () => {
  const toTokenList = useAppSelector(selectToTokenList);
  const toToken = useAppSelector(selectToToken);
  const quotes = useAppSelector(selectQuote);

  const toAmount = typeof quotes !== 'string' ? quotes.routes[0]?.bridgeRoute?.outputAmount : null;
  const dispatch = useDispatch();
  return (
    <TokenInput
      tokens={toTokenList}
      token={toToken}
      amount={formatUnits(toAmount || 0, toToken?.decimals || 1)}
      onAmountInput={() => {}}
      setToken={value => dispatch(setToToken(value))}
    />
  );
};

export default ToTokenInput;
