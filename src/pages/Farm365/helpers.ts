import chainIds from '../../constants/chainIds';
import { Token } from '@uniswap/sdk';

export function calcFarming365Apr(
  chainId: number,
  liquidity: string,
  blockReward: string,
  eswRate: number,
): number {
  let dayBlocksCount = 36000;
  let perSeconds = 1;

  if (chainId === chainIds.SHIDEN) {
    dayBlocksCount = 7200;
  } else if (chainId === chainIds.ASTAR) {
    dayBlocksCount = 7200;
    perSeconds = 12;
  }

  const liq = parseFloat(liquidity);
  const reward = parseFloat(blockReward);

  return 365 + (dayBlocksCount * 365 * reward * eswRate * 100 * perSeconds) / (liq + 1);
}

export function calcAprValue(token: Token): number {
  return token.name?.includes('ESW') ? 180 : 365;
}
