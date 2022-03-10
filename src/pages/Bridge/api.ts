import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Chain, Quote, Token } from './types';
import { parseUnits } from '@ethersproject/units';
import { getUniqueTokens } from './utils';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://backend.movr.network/v1' }),
  endpoints: builder => ({
    getSupportChain: builder.query<{ result: Chain[] }, void>({
      query: () => 'supported/chains',
    }),
    getSupportTokenFrom: builder.query<Token[], { fromChain: Chain; toChain: Chain }>({
      query: ({ fromChain, toChain }) =>
        `supported/from-token-list?${new URLSearchParams({
          fromChainId: fromChain.chainId.toString(),
          toChainId: toChain.chainId.toString(),
        }).toString()}`,
      transformResponse: (response: { result: { token: Token; chainId: number }[] }) =>
        getUniqueTokens(response.result),
    }),
    getSupportTokenTo: builder.query<Token[], { fromChain: Chain; toChain: Chain }>({
      query: ({ fromChain, toChain }) =>
        `supported/to-token-list?${new URLSearchParams({
          fromChainId: fromChain.chainId.toString(),
          toChainId: toChain.chainId.toString(),
        }).toString()}`,
      transformResponse: (response: { result: { token: Token; chainId: number }[] }) =>
        getUniqueTokens(response.result),
    }),
    getQuote: builder.query<
      { result?: Quote },
      {
        fromAsset: Token;
        fromChain: Chain;
        toAsset: Token;
        toChain: Chain;
        amount: string;
        sort?: string;
      }
    >({
      query: ({ fromAsset, fromChain, toAsset, toChain, amount, sort = 'cheapestRoute' }) =>
        `quote?${new URLSearchParams({
          fromAsset: fromAsset.address,
          fromChainId: fromChain.chainId.toString(),
          toAsset: toAsset.address,
          toChainId: toChain.chainId.toString(),
          amount: parseUnits(amount, fromAsset.decimals).toString(),
          sort,
        }).toString()}`,
    }),
  }),
});

export const {
  useGetSupportChainQuery,
  useGetSupportTokenFromQuery,
  useGetSupportTokenToQuery,
  useGetQuoteQuery,
} = apiSlice;
export default apiSlice;
