import { useAppSelector } from 'state/hooks';
import { useGetQuoteQuery } from '../api';
import {
  selectAmountFromToken,
  selectFromToChains,
  selectFromToken,
  selectToToken,
} from '../slice';
import { Quote } from '../types';

type QuoteData = ReturnType<typeof useGetQuoteQuery> & { quotes?: Quote };

export const useQuoteData = (): QuoteData => {
  const { fromChain, toChain } = useAppSelector(selectFromToChains);
  const fromToken = useAppSelector(selectFromToken);
  const amount = useAppSelector(selectAmountFromToken);
  const toToken = useAppSelector(selectToToken);
  const { data, ...restProps } = useGetQuoteQuery(
    {
      fromAsset: fromToken,
      toAsset: toToken,
      fromChain,
      toChain,
      amount,
    },
    { skip: !fromToken || !toToken || !fromChain || !toChain || !amount },
  );
  const quotes = data?.result;
  return { ...restProps, data, quotes };
};
