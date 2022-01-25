import { useState, useEffect } from 'react';
import { parseUnits } from '@ethersproject/units';
import customMovr from '../movr';

const useTokensByChain = (fromAsset, fromChainId, toAsset, toChainId, amount, decimals) => {
  const [quotes, setQuotes] = useState<any>(null);

  async function getDefaults(fromAsset, fromChainId, toAsset, toChainId, amount, decimals) {
    if (
      fromAsset === undefined ||
      fromChainId === undefined ||
      toAsset === undefined ||
      toChainId === undefined ||
      !amount
    ) {
      return;
    }
    const quotes = await customMovr.fetchQuoteByChains(
      fromAsset,
      fromChainId,
      toAsset,
      toChainId,
      parseUnits(amount, decimals),
    );

    setQuotes(quotes);
  }

  useEffect(() => {
    getDefaults(fromAsset, fromChainId, toAsset, toChainId, amount, decimals);
  }, [fromAsset, fromChainId, toAsset, toChainId, amount, decimals]);

  return { quotes };
};

export default useTokensByChain;
