import { Web3Provider } from '@ethersproject/providers';
import { getEmiPrice2Contract } from '../../utils';
import defaultCoins from '../../constants/defaultCoins';
import { JSBI, Token, TokenAmount } from '@uniswap/sdk';
import { tokenAmountToString } from '../../utils/formats';
import chainIds from '../../constants/chainIds';

const getEswPriceInDai = (library: Web3Provider, account: string, chainId: number) => {
  const emiPrice2 = getEmiPrice2Contract(library, account, chainId);
  const eswCoin = defaultCoins.tokens.find(
    token => token.chainId === chainId && token.symbol === 'ESW',
  );
  const defaultCoin = defaultCoins.tokens.find(
    token =>
      token.chainId === chainId &&
      (chainId === chainIds.KUCOIN ? token.symbol === 'WKCS' : token.symbol === 'DAI'),
  );
  return emiPrice2
    .getCoinPrices([eswCoin.address], [defaultCoin.address], 0)
    .then((value: BigInt[]) => {
      const daiToken = new Token(
        chainId,
        defaultCoin.address,
        defaultCoin.decimals,
        defaultCoin.symbol,
        defaultCoin.name,
      );
      const tokenAmount = new TokenAmount(daiToken, JSBI.BigInt(value.toString()));
      return tokenAmountToString(tokenAmount, daiToken.decimals);
    });
};

export default getEswPriceInDai;
