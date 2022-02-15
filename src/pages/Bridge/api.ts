import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BigNumber } from '@ethersproject/bignumber';
import { Chain, Quote, Token } from './types';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://backend.movr.network/v1' }),
  endpoints: builder => ({
    getSupportChain: builder.query<{ result: Chain[] }, void>({
      query: () => 'supported/chains',
    }),
    getSupportTokenFrom: builder.query<{ result: Token[] }, { fromChain: Chain; toChain: Chain }>({
      query: ({ fromChain, toChain }) =>
        `supported/from-token-list?${new URLSearchParams({
          fromChainId: fromChain.chainId.toString(),
          toChainId: toChain.chainId.toString(),
        }).toString()}`,
    }),
    getSupportTokenTo: builder.query<{ result: Token[] }, { fromChain: Chain; toChain: Chain }>({
      query: ({ fromChain, toChain }) =>
        `supported/to-token-list?${new URLSearchParams({
          fromChainId: fromChain.chainId.toString(),
          toChainId: toChain.chainId.toString(),
        }).toString()}`,
    }),
    getQuote: builder.query<
      Quote,
      {
        fromAsset: Token;
        fromChain: Chain;
        toAsset: Token;
        toChain: Chain;
        amount: BigNumber;
        sort: string;
      }
    >({
      query: ({ fromAsset, fromChain, toAsset, toChain, amount, sort }) =>
        `quote?${new URLSearchParams({
          fromAsset: fromAsset.address,
          fromChainId: fromChain.chainId.toString(),
          toAsset: toAsset.address,
          toChainId: toChain.chainId.toString(),
          amount: amount.toString(),
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
