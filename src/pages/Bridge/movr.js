const MOVR_API = 'https://backend.movr.network/';

const movr = {
  fetchSupportedChains: () => fetch(MOVR_API + 'v0/supported/chains').then(res => res.json()),
  fetchSupportedTokensByChain: (chainId, isReceivingSide = false) =>
    fetch(
      MOVR_API + `v0/supported/tokens/chain?chainId=${chainId}&isReceivingSide=${isReceivingSide}`,
    ).then(res => res.json()),
  fetchSupportedRoutes: (chainId, assetAddress, isReceivingSide = false) =>
    fetch(
      MOVR_API +
        `v0/supported/routes?chainId=${chainId}&assetAddress=${assetAddress}&isReceivingSide=${isReceivingSide}`,
    ).then(res => res.json()),
  getRoutes: async (chainId, assetAddress, isReceivingSide = false) => {
    return await movr.fetchSupportedRoutes(chainId, assetAddress, isReceivingSide);
  },
  // Only FOR MATIC !!!
  getSupportedTokensByChain: async (chainId, isReceivingSide = false) => {
    const tokens = await movr.fetchSupportedTokensByChain(chainId, isReceivingSide);
    return tokens.filter(t => t.token.symbol === 'MATIC').map(t => t.token);
  },
  getSupportedTokensByChains: async (fromChainId, toChainId) => {
    const fromChainTokens = await movr
      .fetchSupportedTokensByChain(fromChainId, false)
      .then(res => res.json());
    if (fromChainTokens.length === 0) return [];

    const toChainTokens = await movr
      .fetchSupportedTokensByChain(toChainId, true)
      .then(res => res.json());
    if (toChainTokens.length === 0) return [];

    const fromChainTokensAddresses = fromChainTokens.map(t => t.token.address);
    const toChainTokensAddresses = toChainTokens.map(t => t.token.address);

    const commonAddresses = fromChainTokensAddresses.filter(address =>
      toChainTokensAddresses.includes(address),
    );

    console.log(
      'commonAddresses',
      fromChainTokens.length,
      toChainTokens.length,
      commonAddresses.length,
    );

    return commonAddresses.reduce(
      (memo, curr) => {
        const item = fromChainTokens.find(t => t.token.address === curr);
        if (item) memo.push(item.token);
        return memo;
      },
      [],
    );
  },
  fetchQuoteByChains: async (
    fromAsset,
    fromChain,
    toAsset,
    toChain,
    amount,
    sort = 'cheapestRoute',
  ) =>
    fetch(
      MOVR_API +
        `v0/quote?fromAsset=${fromAsset}&fromChainId=${fromChain}&toAsset=${toAsset}&toChainId=${toChain}&amount=${amount}&sort=${sort}`,
    ).then(res => res.json()),
  fetchSupportedRoutesByChains: async (fromChainId, toChainId, assetAddress, amount, sort) => {
    console.log('ROUTES:', fromChainId, toChainId, assetAddress);

    try {
      const routesFrom = await movr
        .fetchSupportedRoutes(fromChainId, assetAddress, false)
        .then(res => res.json());
      const routesTo = await movr
        .fetchSupportedRoutes(toChainId, assetAddress, true) // TODO: refactor
        .then(res => res.json());

      const res = await movr.fetchQuoteByChains(
        assetAddress,
        fromChainId,
        assetAddress,
        toChainId,
        amount,
        sort,
      );
      console.log('quote:', res);
      return res;
    } catch (error) {
      console.log('ERROR', error);
    }
  },
  approveAndSendWithRoute: async (
    route,
    token,
    fromChain,
    toChain,
    options,
    signer,
    shouldApprove = true 
  ) => {
};

export default movr;
