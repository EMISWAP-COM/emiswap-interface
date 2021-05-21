import { Token, Fraction, Percent } from '@uniswap/sdk';
import React, { useContext } from 'react';
import { Text } from 'rebass';
import { ThemeContext } from 'styled-components';
import { AutoColumn } from '../../components/Column';
import { AutoRow } from '../../components/Row';
import { ONE_BIPS } from '../../constants';
import { Field } from '../../state/mint/actions';
import { TYPE } from '../../theme';
import { tokenAmountToString } from '../../utils/formats';

export const PoolPriceBar = ({
  currencies,
  noLiquidity,
  poolTokenPercentage,
  price,
}: {
  currencies: { [field in Field]?: Token };
  noLiquidity?: boolean;
  poolTokenPercentage?: Percent;
  price?: Fraction;
}) => {
  const theme = useContext(ThemeContext);
  return (
    <AutoColumn gap="md">
      <AutoRow justify="space-around" gap="4px">
        <AutoColumn justify="center">
          <TYPE.black>{tokenAmountToString(price) ?? '0'}</TYPE.black>
          <Text fontWeight={500} fontSize={14} color={theme.darkWhite} pt={1}>
            {currencies[Field.CURRENCY_B]?.symbol} per {currencies[Field.CURRENCY_A]?.symbol}
          </Text>
        </AutoColumn>
        <AutoColumn justify="center">
          <TYPE.black>{tokenAmountToString(price?.invert()) ?? '0'}</TYPE.black>
          <Text fontWeight={500} fontSize={14} color={theme.darkWhite} pt={1}>
            {currencies[Field.CURRENCY_A]?.symbol} per {currencies[Field.CURRENCY_B]?.symbol}
          </Text>
        </AutoColumn>
        <AutoColumn justify="center">
          <TYPE.black color={theme.darkWhite}>
            {noLiquidity && price
              ? '100'
              : (poolTokenPercentage?.lessThan(ONE_BIPS)
                  ? '<0.01'
                  : poolTokenPercentage?.toFixed(2)) ?? '0'}
            %
          </TYPE.black>
          <Text fontWeight={500} fontSize={14} color={theme.darkWhite} pt={1}>
            Share of Pool
          </Text>
        </AutoColumn>
      </AutoRow>
    </AutoColumn>
  );
};
