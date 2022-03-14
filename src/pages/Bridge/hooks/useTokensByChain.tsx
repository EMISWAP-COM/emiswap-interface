import { useState, useEffect } from 'react';
import customMovr from '../movr';

const useTokensByChain = (fromChainId, toChainId) => {
  const [tokens, setTokens] = useState<any[]>([]);

  useEffect(() => {
    if (!fromChainId) return;

    customMovr.getSupportedTokensByChain(fromChainId, toChainId).then(tokens => {
      setTokens(tokens);
    });
  }, [fromChainId, toChainId]);

  return tokens;
};

export default useTokensByChain;
