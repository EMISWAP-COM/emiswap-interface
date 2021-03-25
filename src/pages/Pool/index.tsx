import React, { useContext, useMemo } from 'react';
import styled, { ThemeContext } from 'styled-components';
import { Pair, ZERO_ADDRESS } from '@uniswap/sdk';
import { Link } from 'react-router-dom';
import { SwapPoolTabs, TabNames } from '../../components/NavigationTabs';

import Question from '../../components/QuestionHelper';
import FullPositionCard from '../../components/PositionCard';
import { useTokenBalancesWithLoadingIndicator } from '../../state/wallet/hooks';
import { ExternalLink, StyledInternalLink, TYPE } from '../../theme';
import { Text } from 'rebass';
import { LightCard } from '../../components/Card';
import { RowBetween } from '../../components/Row';
import { ButtonPrimary, ButtonGreen } from '../../components/Button';
import { AutoColumn } from '../../components/Column';

import { useActiveWeb3React } from '../../hooks';
import { usePairs } from '../../data-mooniswap/Reserves';
import { useTrackedTokenPairs } from '../../state/user/hooks';
import AppBody from '../AppBody';
import { Dots } from '../../components/swap/styleds';
import ReferralLink from '../../components/RefferalLink';
import WarningBlock, { StyledButton } from '../../components/Warning/WarningBlock';

const StyledHr = styled.hr`
  width: 100%;
  background: #eaeeee;
  border: none;
  height: 1px;
`;

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

  const warningBottomContent = () => {
    return (
      <StyledButton href={'https://link.medium.com/gNa3ztuvkdb'} target="_blank">
        <span> READ MORE </span> {'>>'}
      </StyledButton>
    );
  };

  const warningContent = () => {
    return (
      <p>
        The beta testing runs for about 2 weeks, and the users who join us within this period will
        have 50,000 ESW distributed among them during the first week after the official launch.
      </p>
    );
  };

  return (
    <>
      <WarningBlock
        title="EMISWAP soft launch"
        content={warningContent}
        bottomContent={warningBottomContent}
      />
      <AppBody>
        <SwapPoolTabs active={TabNames.POOL} />
        <AutoColumn gap="lg" justify="center">
          <>
            <AutoColumn gap="12px" style={{ width: '100%' }}>
              <RowBetween padding={'0 8px'}>
                <Text color={theme.text1} fontWeight={500}>
                  Your Liquidity
                </Text>
                <Question text="When you add liquidity, you are given pool tokens that represent your share. If you don’t see a pool you joined in this list, try importing a pool below." />
              </RowBetween>
              {!account ? (
                <LightCard padding="40px">
                  <TYPE.body color={theme.text3} textAlign="center">
                    Connect to a wallet to view your liquidity.
                  </TYPE.body>
                </LightCard>
              ) : v2IsLoading ? (
                <LightCard padding="40px">
                  <TYPE.body color={theme.text3} textAlign="center">
                    <Dots>Loading</Dots>
                  </TYPE.body>
                </LightCard>
              ) : allV2PairsWithLiquidity?.length > 0 ? (
                <>
                  {allV2PairsWithLiquidity.map(v2Pair => (
                    <FullPositionCard key={v2Pair.liquidityToken.address} pair={v2Pair} />
                  ))}
                </>
              ) : (
                <LightCard padding="40px">
                  <TYPE.body color={theme.text3} textAlign="center">
                    No liquidity found.
                  </TYPE.body>
                </LightCard>
              )}
              <ButtonPrimary
                id="join-pool-button"
                as={Link}
                style={{ padding: '15px 16px' }}
                to={'/add/' + ZERO_ADDRESS}
              >
                <Text fontWeight={500} fontSize={16}>
                  Add Liquidity
                </Text>
              </ButtonPrimary>
              <ButtonGreen
                style={{ width: 'initial', padding: '15px 16px' }}
                as={Link}
                to="/migrate"
              >
                <Text fontWeight={500} fontSize={16}>
                  Migrate Liquidity
                </Text>
              </ButtonGreen>
              <div>{account ? <ReferralLink /> : 'Please connect to get a referral link.'}</div>
              <StyledHr />
              <div>
                <Text textAlign="center" fontSize={14} style={{ padding: '.5rem 0 .5rem 0' }}>
                  {"Don't see a pool you joined?"}{' '}
                  <StyledInternalLink id="import-pool-link" to={false ? '/migrate' : '/find'}>
                    {'Import it.'}
                  </StyledInternalLink>
                </Text>
                <TYPE.black fontSize={14} fontWeight={400} color={theme.text2}>
                  <ExternalLink
                    href="https://crowdsale.emidao.org/en"
                    style={{ color: theme.text1 }}
                  >
                    Discover EmiSwap Crowdsale Terms
                  </ExternalLink>
                </TYPE.black>
              </div>
            </AutoColumn>
          </>
        </AutoColumn>
      </AppBody>
    </>
  );
}
