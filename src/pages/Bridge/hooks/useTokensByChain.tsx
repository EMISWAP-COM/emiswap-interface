import { useState, useEffect } from 'react';
import customMovr from '../movr';

const useTokensByChain = (fromChainId, toChainId) => {
  const [tokens, setTokens] = useState<any[]>([]);

  useEffect(() => {
    if (!fromChainId) return;

    customMovr.getSupportedTokensByChain(fromChainId, toChainId).then(tokens => {
      setTokens(
        tokens.filter(({ address }) => '0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270' === address),
      );
    });
  }, [fromChainId, toChainId]);

  return tokens;
};

export default useTokensByChain;
