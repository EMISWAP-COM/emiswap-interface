import { Web3Provider } from '@ethersproject/providers';
import { getEmiPrice2Contract } from '../../utils';
import defaultCoins from '../../constants/defaultCoins';
import { JSBI, Token, TokenAmount } from '@uniswap/sdk';
import { tokenAmountToString } from '../../utils/formats';

const getEswPriceInDai = (library: Web3Provider, account: string, chainId: number) => {
  const emiPrice2 = getEmiPrice2Contract(library, account);
  const eswCoin = defaultCoins.tokens.find(
    token => token.chainId === chainId && token.symbol === 'ESW',
  );
  const daiCoin = defaultCoins.tokens.find(
    token => token.chainId === chainId && token.symbol === 'DAI',
  );
  const usdtCoin = defaultCoins.tokens.find(
    token => token.chainId === chainId && token.symbol === 'USDT',
  );
  const usdсCoin = defaultCoins.tokens.find(
    token => token.chainId === chainId && token.symbol === 'USDС',
  );
  const stableTokens = [usdtCoin?.address, daiCoin?.address, usdсCoin?.address].filter(
    value => value !== undefined,
  );

  return emiPrice2.getCoinPrices([eswCoin.address], stableTokens, 0).then((value: BigInt[]) => {
    const daiToken = new Token(
      chainId,
      daiCoin.address,
      daiCoin.decimals,
      daiCoin.symbol,
      daiCoin.name,
    );
    const tokenAmount = new TokenAmount(daiToken, JSBI.BigInt(value.toString()));
    return tokenAmountToString(tokenAmount, daiToken.decimals);
  });
};

export default getEswPriceInDai;
