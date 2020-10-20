import React, { useContext, useMemo } from 'react';
import { ThemeContext } from 'styled-components';
import { Pair, ZERO_ADDRESS } from '@uniswap/sdk';
import { Link } from 'react-router-dom';
import { SwapPoolTabs } from '../../components/NavigationTabs';

import Question from '../../components/QuestionHelper';
import FullPositionCard from '../../components/PositionCard';
import { useTokenBalancesWithLoadingIndicator } from '../../state/wallet/hooks';
import { StyledInternalLink, TYPE } from '../../theme';
import { Text } from 'rebass';
import { LightCard } from '../../components/Card';
import { RowBetween } from '../../components/Row';
import { ButtonPrimary, ButtonSecondary } from '../../components/Button';
import { AutoColumn } from '../../components/Column';

import { useActiveWeb3React } from '../../hooks';
import { usePairs } from '../../data-mooniswap/Reserves';
import { useTrackedTokenPairs } from '../../state/user/hooks';
import AppBody from '../AppBody';
import { Dots } from '../../components/swap/styleds';
import ReferralLink from '../../components/RefferalLink';
import { ButtonText } from './styleds';

export default function Pool() {
  const theme = useContext(ThemeContext);
  const { account } = useActiveWeb3React();

  const trackedTokenPairs = useTrackedTokenPairs();
  const pairs = usePairs(trackedTokenPairs);

  const tokenPairsWithLiquidityTokens = pairs.map(([state, pair]) => {
    if (!pair) {
      return undefined;
    }
    return {
      liquidityToken: pair?.liquidityToken,
    };
  });
  const liquidityTokens = useMemo(
    () => tokenPairsWithLiquidityTokens.map(tpwlt => tpwlt?.liquidityToken),
    [tokenPairsWithLiquidityTokens],
  );

  const [v2PairsBalances, fetchingV2PairBalances] = useTokenBalancesWithLoadingIndicator(
    account ?? undefined,
    liquidityTokens,
  );

  // fetch the reserves for all V2 pools in which the user has a balance
  const liquidityTokensWithBalances = useMemo(
    () =>
      tokenPairsWithLiquidityTokens.filter(data => {
        if (!data) {
          return false;
        }
        return v2PairsBalances[data.liquidityToken.address]?.greaterThan('0');
      }),
    [tokenPairsWithLiquidityTokens, v2PairsBalances],
  );

  const v2IsLoading =
    fetchingV2PairBalances ||
    pairs?.length < liquidityTokensWithBalances.length ||
    pairs?.some(pair => !pair);

  const allV2PairsWithLiquidity = pairs
    .map(([, pair]) => pair)
    .filter((pair): pair is Pair => {
      if (!pair) {
        return false;
      }
      return (
        liquidityTokensWithBalances.findIndex(x => {
          return x?.liquidityToken?.equals(pair.liquidityToken);
        }) !== -1
      );
    });

  return (
    <>
      <AppBody>
        <SwapPoolTabs active={'pool'} />
        <Text fontWeight={500} fontSize={20} color={theme.text2}>
          Coming soon!
        </Text>
      </AppBody>
    </>
  );
}
