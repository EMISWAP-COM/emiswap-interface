import React, { useState, useEffect } from 'react';
import ethers from 'ethers';
import customMovr from '../movr';

const useDefaultChains = () => {
  const [allChains, setChains] = useState<any[]>([]);

  async function getDefaults () {
    const movrChains = await customMovr.fetchSupportedChains();

    setChains(movrChains);
  }

  useEffect(() => {
    getDefaults();
  }, []);

  return { allChains };
};

export default useDefaultChains;
