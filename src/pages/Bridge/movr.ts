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

  getSupportedTokensByChain: async (fromChainId, toChainId) => {
    const tokens = await movr.fetchSupportedTokensByChain(fromChainId, toChainId);
    return tokens.map(t => t.token);
  },
  getSupportedTokensToChain: async (fromChainId, toChainId) => {
    const tokens = await movr.fetchSupportedTokensToChain(fromChainId, toChainId);
    return tokens.map(t => t.token);
  },
};

export default movr;
