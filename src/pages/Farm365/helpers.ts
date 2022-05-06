import chainIds from '../../constants/chainIds';
import { Token } from '@uniswap/sdk';

export function calcFarming365Apr(
  chainId: number,
  liquidity: string,
  blockReward: string,
  eswRate: number,
): number {
  let dayBlocksCount = 36000;

  if (chainId === chainIds.SHIDEN) {
    dayBlocksCount = 7200;
  } else if (chainId === chainIds.ASTAR) {
    dayBlocksCount = 7200;
  }

  const liq = parseFloat(liquidity);
  const reward = parseFloat(blockReward);

  console.log(365, dayBlocksCount, 365, reward, eswRate, 100, liq, 1);

  return 365 + (dayBlocksCount * 365 * reward * eswRate * 100) / (liq + 1);
}

export function calcAprValue(token: Token): number {
  return token.name?.includes('ESW') ? 180 : 365;
}
