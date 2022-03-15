import { useEffect, useState } from 'react';
import { getDefaultProvider } from '@ethersproject/providers';
import { Contract } from '@ethersproject/contracts';
import { TokenAmount } from '@uniswap/sdk';
import abi from '../ERC20abi';
import { useActiveWeb3React } from 'hooks';

export const useGetBalance = (adresss, waitingChainId) => {
  const { library, account, chainId } = useActiveWeb3React();
  const [tokenBalances, setTokenBalances] = useState({});

  useEffect(() => {
    const main = async () => {
      if (waitingChainId === chainId) {
        const balances = await Promise.all(
          adresss.map(token => {
            const contract = new Contract(token.address, abi, library as any);
            return contract.balanceOf(account).then(amount => [token, amount]);
          }),
        );
        setTokenBalances(
          balances.reduce((acc, [token, amount]) => {
            acc[token.address] = new TokenAmount(token, amount);
            return acc;
          }, {}),
        );
      } else {
        setTokenBalances({});
      }
    };
    main();
  }, [adresss, chainId]);
  return tokenBalances;
};
