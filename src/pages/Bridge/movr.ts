import { BigNumber } from '@ethersproject/bignumber';
import { Chain, Token } from './types';

const MOVR_API = 'https://backend.movr.network/';

const movr = {
  fetchSupportedTokensByChain: (fromChainId, toChainId) =>
    fetch(
      MOVR_API +
        `v1/supported/from-token-list?` +
        new URLSearchParams({ fromChainId, toChainId }).toString(),
    )
      .then(res => res.json())
      .then(res => res.result),
  fetchSupportedTokensToChain: (fromChainId: number, toChainId: number) =>
    fetch(
      MOVR_API +
        `v1/supported/to-token-list?` +
        new URLSearchParams({
          fromChainId: fromChainId.toString(),
          toChainId: toChainId.toString(),
        }).toString(),
    )
      .then(res => res.json())
      .then(res => res.result),
  fetchApprovalBuildTx: (chainId, owner, allowanceTarget, tokenAdress, amount) =>
    fetch(
      MOVR_API +
        `v1/approval/build-tx?` +
        new URLSearchParams({
          chainID: chainId,
          owner,
          allowanceTarget,
          tokenAddress: tokenAdress,
          amount,
        }).toString(),
    )
      .then(res => res.json())
      .then(res => res.result),
  fetchBuildTx: (
    recipient,
    fromAsset,
    fromChainId,
    toAsset,
    toChainId,
    amount,
    output,
    fromAddress,
    routePath,
  ) =>
    fetch(
      MOVR_API +
        `v1/send/build-tx?` +
        new URLSearchParams({
          recipient,
          fromAsset,
          fromChainId,
          toAsset,
          toChainId,
          amount,
          output,
          fromAddress,
          routePath,
        }).toString(),
    )
      .then(res => res.json())
      .then(res => res.result),

  getSupportedTokensByChain: async (fromChainId, toChainId) => {
    const tokens = await movr.fetchSupportedTokensByChain(fromChainId, toChainId);
    return tokens.map(t => t.token);
  },
  getSupportedTokensToChain: async (fromChainId, toChainId) => {
    const tokens = await movr.fetchSupportedTokensToChain(fromChainId, toChainId);
    return tokens.map(t => t.token);
  },
  getApprovalBuildTx: async (chainId, owner, allowanceTarget, tokenAdress, amount) => {
    const buildTX = await movr.fetchApprovalBuildTx(
      chainId,
      owner,
      allowanceTarget,
      tokenAdress,
      amount,
    );
    return buildTX;
  },
  getBuildTx: async (
    recipient,
    fromAsset,
    fromChainId,
    toAsset,
    toChainId,
    amount,
    output,
    fromAddress,
    routePath,
  ) => {
    const buildTX = await movr.fetchBuildTx(
      recipient,
      fromAsset,
      fromChainId,
      toAsset,
      toChainId,
      amount,
      output,
      fromAddress,
      routePath,
    );
    return buildTX;
  },
};

export default movr;
