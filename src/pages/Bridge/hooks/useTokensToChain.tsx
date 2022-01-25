import { useState, useEffect } from 'react';
import customMovr from '../movr';

const useTokensByChain = (fromChainId, toChainId) => {
  const [tokens, setTokens] = useState<any[]>([]);

  useEffect(() => {
    if (!fromChainId) return;

    customMovr.getSupportedTokensToChain(fromChainId, toChainId).then(tokens => {
      setTokens(
        tokens.filter(({ address }) => address === '0x7122d7661c4564b7c6cd4878b06766489a6028a2'),
      );
    });
  }, [fromChainId, toChainId]);

  return tokens;
};

export default useTokensByChain;
