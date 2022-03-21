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
    getBuildTx: builder.query<any, { chainID; owner; allowanceTarget; tokenAddress }>({
      query: ({ chainID, owner, allowanceTarget, tokenAddress }) =>
        `v1/approval/check-allowance?${new URLSearchParams({
          chainID,
          owner,
          allowanceTarget,
          tokenAddress,
        }).toString()}`,
      transformResponse: (response: { result: { token: Token; chainId: number }[] }) =>
        getUniqueTokens(response.result),
    }),
    getApprovalBuildTx: builder.query<
      any,
      { chainId; owner; allowanceTarget; tokenAdress; amount }
    >({
      query: ({ chainId, owner, allowanceTarget, tokenAdress, amount }) =>
        `v1/approval/build-tx?${new URLSearchParams({
          chainId,
          owner,
          allowanceTarget,
          tokenAdress,
          amount,
        }).toString()}`,
      transformResponse: (response: { result: { token: Token; chainId: number }[] }) =>
        getUniqueTokens(response.result),
    }),
    getCheckAllowance: builder.query<
      any,
      {
        recipient;
        fromAsset;
        fromChainId;
        toAsset;
        toChainId;
        amount;
        output;
        fromAddress;
        routePath;
      }
    >({
      query: ({
        recipient,
        fromAsset,
        fromChainId,
        toAsset,
        toChainId,
        amount,
        output,
        fromAddress,
        routePath,
      }) =>
        `v1/send/build-tx?${new URLSearchParams({
          recipient,
          fromAsset,
          fromChainId,
          toAsset,
          toChainId,
          amount,
          output,
          fromAddress,
          routePath,
        }).toString()}`,
      transformResponse: (response: { result: { token: Token; chainId: number }[] }) =>
        getUniqueTokens(response.result),
    }),
    getRoutes: builder.query<{ result: Chain[] }, void>({
      query: () => 'v1/supported/bridges',
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
  useGetRoutesQuery,
  useGetCheckAllowanceQuery,
  useGetApprovalBuildTxQuery,
  useGetBuildTxQuery,
} = apiSlice;
export default apiSlice;
