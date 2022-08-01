import chainIds from '../../constants/chainIds';
import { Token } from '@uniswap/sdk';
import { useActiveWeb3React } from '../../hooks';
import useNftData from '../../hooks/useNftData';

export function useFarm365Data() {
  const { chainId } = useActiveWeb3React();

  const { isOnlyBasicNft, isOnlyTopNft, isTwoNft } = useNftData();

  const getFarmDays = (): number => {
    return 365;
  };

  const calcAprValue = (liquidity: string, blockReward: string, eswRate: number): number => {
    let dayBlocksCount = 36000;

    if (chainId === (chainIds.SHIDEN as any)) {
      dayBlocksCount = 7200;
    } else if (chainId === (chainIds.ASTAR as any)) {
      dayBlocksCount = 7200;
    }

    const liq = parseFloat(liquidity);
    const reward = parseFloat(blockReward);

    return getFarmDays() + (dayBlocksCount * 365 * reward * eswRate * 100) / (liq + 1);
  };

  const calcAprPercent = (token: Token): number => {
    let eswPercent = 180;
    let lpPercent = 365;

    if (isOnlyBasicNft) {
      eswPercent = 185;
      lpPercent = 375;
    } else if (isOnlyTopNft) {
      eswPercent = 190;
      lpPercent = 385;
    } else if (isTwoNft) {
      eswPercent = 195;
      lpPercent = 395;
    }

    return token.name?.includes('ESW') ? eswPercent : lpPercent;
  };

  return {
    getFarmDays,
    calcAprValue,
    calcAprPercent,
  };
}
