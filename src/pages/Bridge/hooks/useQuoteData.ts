import { useAppSelector } from 'state/hooks';
import { useGetQuoteQuery } from '../api';
import {
  selectAmountFromToken,
  selectFromToChains,
  selectFromToken,
  selectToToken,
} from '../slice';
import { Quote } from '../types';

export const useQuoteData = (): { isSuccess: boolean; quotes?: Quote } => {
  const { fromChain, toChain } = useAppSelector(selectFromToChains);
  const fromToken = useAppSelector(selectFromToken);
  const amount = useAppSelector(selectAmountFromToken);
  const toToken = useAppSelector(selectToToken);
  const { isSuccess, data } = useGetQuoteQuery({
    fromAsset: fromToken,
    toAsset: toToken,
    fromChain,
    toChain,
    amount,
  });
  const quotes = data?.result;
  return { isSuccess, quotes };
};
