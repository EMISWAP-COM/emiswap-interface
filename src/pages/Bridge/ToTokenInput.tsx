import React, { useCallback, useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { formatUnits } from '@ethersproject/units';
import { useAppSelector } from 'state/hooks';
import { selectToToken, setToToken } from './slice';
import TokenInput from './TokenInput';
import { getUniqueTokens } from './utils';
import { useQuoteData } from './hooks';
import { useTokenListTo } from './hooks';

const formatTokenAmount = (amount: string, dicimals?: number): string => {
  const stringOfNumber = parseFloat(amount).toLocaleString('fullwide', { useGrouping: false });
  return formatUnits(stringOfNumber, dicimals || 1);
};

const ToTokenInput = () => {
  const { data, isSuccess } = useTokenListTo();
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
      setToken(tokenList.find(({ name }) => name === toToken?.name) || tokenList[0]);
    }
  }, [tokenList]);

  return (
    <TokenInput
      tokens={isSuccess ? tokenList : 'loading'}
      token={toToken}
      amount={formatTokenAmount(toAmount || '0', toToken?.decimals)}
      onAmountInput={null}
      setToken={setToken}
    />
  );
};

export default ToTokenInput;
