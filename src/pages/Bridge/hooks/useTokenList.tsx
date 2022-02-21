import { useAppSelector } from 'state/hooks';
import { useGetSupportTokenFromQuery, useGetSupportTokenToQuery } from '../api';
import { selectFromToChains } from '../slice';

type TokenFrom = ReturnType<typeof useGetSupportTokenFromQuery>;
type TokenTo = ReturnType<typeof useGetSupportTokenToQuery>;

export const useTokenListFrom = (): TokenFrom => {
  const { fromChain, toChain } = useAppSelector(selectFromToChains);
  const response = useGetSupportTokenFromQuery(
    {
      fromChain,
      toChain,
    },
    { skip: !fromChain || !toChain },
  );
  return response;
};

export const useTokenListTo = (): TokenTo => {
  const { fromChain, toChain } = useAppSelector(selectFromToChains);
  const response = useGetSupportTokenToQuery(
    {
      fromChain,
      toChain,
    },
    { skip: !fromChain || !toChain },
  );
  return response;
};
