import React, { useState, useEffect } from 'react';
import ethers from 'ethers';
import customMovr from '../movr';

const useRouteByChains = (fromChain, toChain, token, amount) => {
  const [route, setRoute] = useState<any | null>(null);

  async function setRouteByChains(fromChain, toChain, token, amount) {
    if (!fromChain || !toChain || !token) return;

    const fromChainRoutes = await customMovr.getRoutes();

    const commonRoutes = fromChainRoutes.reduce((memo, curr) => {
      if (curr.fromChainId === fromChain.chainId && curr.toChainId === toChain.chainId) {
        memo.push(curr);
      }

      return memo;
    }, []);

    // console.log('commonRoutes', commonRoutes);

    const firstCommonRoute = commonRoutes[0];

    if (!firstCommonRoute) {
      // console.log('No available routes');

      return;
    }

    const amountStr = ethers.utils.parseUnits(String(amount), token.decimals).toString();

    // console.log('Amount', amount, amountStr);

    const quote = await customMovr.fetchQuoteByChains(
      firstCommonRoute.fromToken.address,
      firstCommonRoute.fromChainId,
      firstCommonRoute.toToken.address,
      firstCommonRoute.toChainId,
      amountStr,
      'cheapestRoute',
    );

    // console.log('QUOTE', quote);

    // TODO: select route ? default 'cheapestRoute'
    const firstQuoteRoute = quote.routes[0];

    if (!firstQuoteRoute) {
      // console.log('No availabele route for amount', amountStr);

      return;
    }

    console.log('setRoute', firstQuoteRoute);
    setRoute(firstQuoteRoute);
  }

  useEffect(() => {
    setRouteByChains(fromChain, toChain, token, amount);
  }, [fromChain, toChain, token, amount]);

  return { route };
};

export default useRouteByChains;
