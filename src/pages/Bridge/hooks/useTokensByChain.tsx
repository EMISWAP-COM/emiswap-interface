import React, { useState, useEffect } from 'react';
import customMovr from '../movr';

const useTokensByChain = (fromChain, toChain) => {
  const [tokens, setTokens] = useState<any[]>([]);

  useEffect(() => {
    if (!fromChain) return;

    customMovr.getSupportedTokensByChain(fromChain.chainId, toChain.chainId).then(tokens => {
      setTokens(tokens);
    });
  }, [fromChain]);

  return tokens;
};

export default useTokensByChain;
