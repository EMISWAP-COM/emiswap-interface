import React, { useContext } from 'react';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import { Token, TokenAmount } from '@uniswap/sdk';

import { Text } from 'rebass';
import { AutoColumn } from '../Column';
import { ButtonSecondary } from '../Button';
import { RowBetween, RowFixed } from '../Row';
import { FixedHeightRow, HoverCard } from './index';
import DoubleCurrencyLogo from '../DoubleLogo';
import { ThemeContext } from 'styled-components';

interface PositionCardProps extends RouteComponentProps<{}> {
  token0: Token;
  token1: Token;
  V1LiquidityBalance: TokenAmount;
}

function UniV2PositionCard({ token0, token1, V1LiquidityBalance }: PositionCardProps) {
  const theme = useContext(ThemeContext);

  return (
    <HoverCard>
      <AutoColumn gap="12px">
        <FixedHeightRow>
          <RowFixed margin="auto">
            <DoubleCurrencyLogo currency0={token0} currency1={token1} margin={true} size={20} />
            <Text fontWeight={500} fontSize={20} style={{ marginLeft: '' }}>
              {`${token0.symbol}/${token1.symbol}`}
            </Text>
            <Text
              fontSize={12}
              fontWeight={500}
              ml="0.5rem"
              px="0.75rem"
              py="0.25rem"
              style={{ borderRadius: '1rem' }}
              backgroundColor={theme.yellow1}
              color={'black'}
            >
              UniV2
            </Text>
          </RowFixed>
        </FixedHeightRow>

        <AutoColumn gap="8px">
          <RowBetween marginTop="10px">
            <ButtonSecondary
              width="100%"
              as={Link}
              to={`/migrate/${V1LiquidityBalance.token.address}`}
            >
              Migrate
            </ButtonSecondary>

            {/*<ButtonSecondary*/}
            {/*  style={{ backgroundColor: 'transparent' }}*/}
            {/*  width="28%"*/}
            {/*  as={Link}*/}
            {/*  to={`/remove/${V1LiquidityBalance.token.address}`}*/}
            {/*>*/}
            {/*  Remove*/}
            {/*</ButtonSecondary>*/}
          </RowBetween>
        </AutoColumn>
      </AutoColumn>
    </HoverCard>
  );
}

export default withRouter(UniV2PositionCard);
