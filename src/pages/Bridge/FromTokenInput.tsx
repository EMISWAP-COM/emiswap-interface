import React from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from 'state/hooks';
import {
  selectAmountFromToken,
  selectFromToken,
  selectFromTokenList,
  setAmountFromToken,
  setFromToken,
} from './slice';
import TokenInput from './TokenInput';

const FromTokenInput = () => {
  const fromTokenList = useAppSelector(selectFromTokenList);
  const fromToken = useAppSelector(selectFromToken);
  const amount = useAppSelector(selectAmountFromToken);
  const dispatch = useDispatch();
  return (
    <TokenInput
      tokens={fromTokenList}
      token={fromToken}
      amount={amount}
      onAmountInput={value => dispatch(setAmountFromToken(value))}
      setToken={value => dispatch(setFromToken(value))}
    />
  );
};

export default FromTokenInput;
