import React, { useCallback, useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { formatUnits } from '@ethersproject/units';
import { useAppSelector } from 'state/hooks';
import { selectToToken, setToToken } from './slice';
import TokenInput from './TokenInput';
import { useFirstToken, useQuoteData } from './hooks';
import { useTokenListTo } from './hooks';
import { selectFromToChains } from './slice';

const formatTokenAmount = (amount: string, dicimals?: number): string => {
  const stringOfNumber = parseFloat(amount).toLocaleString('fullwide', { useGrouping: false });
  return formatUnits(stringOfNumber, dicimals || 1);
};

const ToTokenInput = () => {
  const { toChain } = useAppSelector(selectFromToChains);
  const { data: tokenList, isSuccess } = useTokenListTo();
  const toToken = useAppSelector(selectToToken);
  const { quotes, isSuccess: quoteIsSuccess } = useQuoteData();
  const firstToken = useFirstToken(tokenList, toChain?.chainId);

  const toAmount = quoteIsSuccess ? quotes.routes[0]?.bridgeRoute?.outputAmount : null;
  const dispatch = useDispatch();

  const setToken = useCallback(value => dispatch(setToToken(value)), [dispatch, setToToken]);

  useEffect(() => {
    if (isSuccess) {
      setToken(tokenList.find(({ symbol }) => symbol === toToken?.symbol) || firstToken);
    }
  }, [tokenList]);

  return (
    <TokenInput
      tokens={isSuccess ? tokenList : 'loading'}
      token={toToken}
      amount={formatTokenAmount(toAmount || '0', toToken?.decimals)}
      onAmountInput={null}
      setToken={setToken}
      chainId={toChain?.chainId}
    />
  );
};

export default ToTokenInput;
