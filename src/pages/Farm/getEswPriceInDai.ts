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
  const daiCoin = defaultCoins.tokens.find(
    token => token.chainId === chainId && token.symbol === 'DAI',
  );
  const KCCCoin = defaultCoins.tokens.find(
    token => token.chainId === chainId && token.symbol === 'WKCS',
  );
  const koffeeCoin = defaultCoins.tokens.find(
    token => token.chainId === chainId && token.symbol === 'KOFFEE',
  );
  const usdtCoin = defaultCoins.tokens.find(
    token => token.chainId === chainId && token.symbol === 'USDT',
  );
  const usdсCoin = defaultCoins.tokens.find(
    token => token.chainId === chainId && token.symbol === 'USDС',
  );
  const stableTokens = [
    usdtCoin?.address,
    daiCoin?.address,
    usdсCoin?.address,
    KCCCoin?.address,
  ].filter(value => value !== undefined);

  let mainCoinPrice = emiPrice2.getCoinPrices([eswCoin.address], stableTokens, 0);
  if (chainId === chainIds.KCC) {
    mainCoinPrice = emiPrice2.getCoinPrices([koffeeCoin.address], stableTokens, 0);
  } else if (chainId === chainIds.POLYGON || chainId === chainIds.MUMBAI) {
    mainCoinPrice = emiPrice2.getCoinPrices([eswCoin.address], stableTokens, 0);
  }

  return mainCoinPrice.then((value: BigInt[]) => {
    let coin = daiCoin;
    if (chainId === chainIds.KCC) {
      coin = koffeeCoin;
    } else if (chainId === chainIds.POLYGON || chainId === chainIds.MUMBAI) {
      coin = daiCoin;
    }

    const token = new Token(chainId, coin.address, coin.decimals, coin.symbol, coin.name);

    const tokenAmount = new TokenAmount(token, JSBI.BigInt(value.toString()));

    return tokenAmountToString(tokenAmount, token.decimals);
  });
};

export default getEswPriceInDai;
