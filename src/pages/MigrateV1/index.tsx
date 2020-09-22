import { Token, TokenAmount } from '@uniswap/sdk';
import React, { useCallback, useContext, useState, useEffect } from 'react';
import { ThemeContext } from 'styled-components';
import { AutoColumn } from '../../components/Column';
import { AutoRow } from '../../components/Row';
import { SearchInput } from '../../components/SearchModal/styleds';
import { useActiveWeb3React } from '../../hooks';
import { useAllTokens, useToken } from '../../hooks/Tokens';
import { useDefaultTokenList } from '../../state/lists/hooks';
import { BackArrow, TYPE } from '../../theme';
import { LightCard } from '../../components/Card';
import { BodyWrapper, HeadersPlusBodyWrapper } from '../AppBody';
import { EmptyState } from './EmptyState';
import UniV2PositionCard from '../../components/PositionCard/V1';
import QuestionHelper from '../../components/QuestionHelper';
import { Dots } from '../../components/swap/styleds';
import { useAddUserToken } from '../../state/user/hooks';
import { isDefaultToken } from '../../utils';
import { useAllUniswapV2Pairs } from '../../data-mooniswap/UniswapV2';
import Logo from '../../components/Logo';
import Wordmark from '../../components/Wordmark';

export default function MigrateV1() {
  const theme = useContext(ThemeContext);
  const { account, chainId } = useActiveWeb3React();

  const [tokenSearch, setTokenSearch] = useState<string>('');
  const handleTokenSearchChange = useCallback(e => setTokenSearch(e.target.value), [
    setTokenSearch,
  ]);

  // automatically add the search token
  const token = useToken(tokenSearch);
  const defaultTokens = useDefaultTokenList();
  const isDefault = isDefaultToken(defaultTokens, token);
  const allTokens = useAllTokens();

  const addToken = useAddUserToken();

  useEffect(() => {
    if (token && !isDefault && !allTokens[token.address]) {
      addToken(token);
    }
  }, [token, isDefault, addToken, allTokens]);

  // get UniswapV2 pairs with balances
  const [uniswapV2Pairs, pairLoading] = useAllUniswapV2Pairs(account);

  const allUniV2WithLiquidity = [];
  for (let i = 0; i < uniswapV2Pairs.length; i++) {
    const pair = uniswapV2Pairs[i];

    if (!allTokens?.[pair?.token0]) {
      if (pair?.token0?.toLowerCase() === token?.address?.toLowerCase()) {
        pair.token0 = token.address;
      } else {
        continue;
      }
    }

    if (!allTokens?.[pair?.token1]) {
      if (pair?.token1?.toLowerCase() === token?.address?.toLowerCase()) {
        pair.token1 = token.address;
      } else {
        continue;
      }
    }

    const lpToken = new Token(chainId, pair.pair, 18, 'UNI-V2', 'Uniswap V2');
    const token0 = allTokens[pair.token0];
    const token1 = allTokens[pair.token1];
    const bal = new TokenAmount(lpToken, pair.balance.toString());
    const card = (
      <UniV2PositionCard key={pair.pair} token0={token0} token1={token1} V1LiquidityBalance={bal} />
    );
    allUniV2WithLiquidity.push(card);
  }

  const isLoading = uniswapV2Pairs?.length === 0 || pairLoading;

  return (
    <HeadersPlusBodyWrapper>
      <div className="onlyDesktop">
        <Logo />
        <Wordmark />
      </div>
      <BodyWrapper style={{ padding: 24 }}>
        <AutoColumn gap="16px">
          <AutoRow style={{ alignItems: 'center', justifyContent: 'space-between' }} gap="8px">
            <BackArrow to="/pool" />
            <TYPE.mediumHeader>Migrate Liquidity</TYPE.mediumHeader>
            <div>
              <QuestionHelper text="Migrate your liquidity tokens from Uniswap V1 to Uniswap V2." />
            </div>
          </AutoRow>

          <TYPE.body style={{ marginBottom: 8, fontWeight: 400 }}>
            For each pool shown below, click migrate to remove your liquidity from Uniswap V2 and
            deposit it into Emiswap.
          </TYPE.body>

          {!account ? (
            <LightCard padding="40px">
              <TYPE.body color={theme.text3} textAlign="center">
                Connect to a wallet to view your Uniswap V2 liquidity.
              </TYPE.body>
            </LightCard>
          ) : isLoading ? (
            <LightCard padding="40px">
              <TYPE.body color={theme.text3} textAlign="center">
                <Dots>Loading</Dots>
              </TYPE.body>
            </LightCard>
          ) : (
            <>
              <AutoRow>
                <SearchInput
                  value={tokenSearch}
                  onChange={handleTokenSearchChange}
                  placeholder="Enter a token address to find liquidity"
                />
              </AutoRow>
              {allUniV2WithLiquidity?.length > 0 ? (
                <>{allUniV2WithLiquidity}</>
              ) : (
                <EmptyState message="No Uniswap V2 Liquidity found." />
              )}
            </>
          )}
        </AutoColumn>
      </BodyWrapper>
    </HeadersPlusBodyWrapper>
  );
}
