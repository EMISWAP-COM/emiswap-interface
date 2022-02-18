import React, { useCallback, useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from 'state/hooks';
import { useTokenListFrom } from './hooks';
import { selectAmountFromToken, selectFromToken, setAmountFromToken, setFromToken } from './slice';
import TokenInput from './TokenInput';
import { Token } from './types';
import { getUniqueTokens } from './utils';

const FromTokenInput = () => {
  const fromToken = useAppSelector(selectFromToken);
  const amount = useAppSelector(selectAmountFromToken);
  const dispatch = useDispatch();
  const { data, isSuccess } = useTokenListFrom();

  const setToken = useCallback((value: Token) => dispatch(setFromToken(value)), [
    dispatch,
    setFromToken,
  ]);

  const tokenList = useMemo(() => {
    if (isSuccess) {
      return getUniqueTokens(data.result);
    }
  }, [data]);

  useEffect(() => {
    if (isSuccess) {
      setToken(tokenList.find(({ name }) => name === fromToken?.name) || tokenList[0]);
    }
  }, [tokenList]);

  return (
    <TokenInput
      tokens={isSuccess ? tokenList : 'loading'}
      token={fromToken}
      amount={amount}
      onAmountInput={(value: string) => dispatch(setAmountFromToken(value))}
      setToken={setToken}
    />
  );
};

export default FromTokenInput;
