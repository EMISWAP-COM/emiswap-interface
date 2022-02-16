import React, { useCallback, useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { formatUnits } from '@ethersproject/units';
import { useAppSelector } from 'state/hooks';
import { selectFromToChains, selectToToken, setToToken } from './slice';
import TokenInput from './TokenInput';
import { useGetSupportTokenToQuery } from './api';
import { getUniqueTokens } from './utils';
import { useQuoteData } from './hooks/useQuoteData';

const ToTokenInput = () => {
  const { fromChain, toChain } = useAppSelector(selectFromToChains);
  const { data, isSuccess } = useGetSupportTokenToQuery({ fromChain, toChain });
  const toToken = useAppSelector(selectToToken);
  const { quotes, isSuccess: quoteIsSuccess } = useQuoteData();

  const toAmount = quoteIsSuccess ? quotes.routes[0]?.bridgeRoute?.outputAmount : null;
  const dispatch = useDispatch();

  const tokenList = useMemo(() => {
    if (isSuccess) {
      return getUniqueTokens(data.result);
    }
  }, [data]);

  const setToken = useCallback(value => dispatch(setToToken(value)), [dispatch, setToToken]);

  useEffect(() => {
    if (isSuccess) {
      setToken(tokenList[0]);
    }
  }, [tokenList]);

  return (
    <TokenInput
      tokens={isSuccess ? tokenList : 'loading'}
      token={toToken}
      amount={formatUnits(toAmount || 0, toToken?.decimals || 1)}
      onAmountInput={null}
      setToken={setToken}
    />
  );
};

export default ToTokenInput;
