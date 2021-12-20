import { Token, TokenAmount, Fraction, Percent } from '@uniswap/sdk';
import React from 'react';
import { Text } from 'rebass';
import { ButtonPrimary } from '../../components/Button';
import { RowBetween, RowFixed } from '../../components/Row';
import CurrencyLogo from '../../components/CurrencyLogo';
import { Field } from '../../state/mint/actions';
import { TYPE } from '../../theme';
import { tokenAmountToString } from '../../utils/formats';

export function ConfirmAddModalBottom({
  noLiquidity,
  price,
  currencies,
  parsedAmounts,
  poolTokenPercentage,
  onAdd,
}: {
  noLiquidity?: boolean;
  price?: Fraction;
  currencies: { [field in Field]?: Token };
  parsedAmounts: { [field in Field]?: TokenAmount };
  poolTokenPercentage?: Percent;
  onAdd: () => void;
}) {
  return (
    <>
      <RowBetween>
        <TYPE.body>{currencies[Field.CURRENCY_A]?.symbol} Deposited</TYPE.body>
        <RowFixed>
          <CurrencyLogo currency={currencies[Field.CURRENCY_A]} style={{ marginRight: '8px' }} />
          <TYPE.body>{tokenAmountToString(parsedAmounts[Field.CURRENCY_A])}</TYPE.body>
        </RowFixed>
      </RowBetween>
      <RowBetween>
        <TYPE.body>{currencies[Field.CURRENCY_B]?.symbol} Deposited</TYPE.body>
        <RowFixed>
          <CurrencyLogo currency={currencies[Field.CURRENCY_B]} style={{ marginRight: '8px' }} />
          <TYPE.body>{tokenAmountToString(parsedAmounts[Field.CURRENCY_B])}</TYPE.body>
        </RowFixed>
      </RowBetween>
      <RowBetween>
        <TYPE.body>Rates</TYPE.body>
        <TYPE.body>
          {`1 ${currencies[Field.CURRENCY_A]?.symbol} = ${tokenAmountToString(price, 4)} ${
            currencies[Field.CURRENCY_B]?.symbol
          }`}
        </TYPE.body>
      </RowBetween>
      <RowBetween style={{ justifyContent: 'flex-end' }}>
        <TYPE.body>
          {`1 ${currencies[Field.CURRENCY_B]?.symbol} = ${tokenAmountToString(
            price?.invert(),
            4,
          )} ${currencies[Field.CURRENCY_A]?.symbol}`}
        </TYPE.body>
      </RowBetween>
      <RowBetween>
        <TYPE.body>Share of Pool:</TYPE.body>
        <TYPE.body>{noLiquidity ? '100' : tokenAmountToString(poolTokenPercentage, 4)}%</TYPE.body>
      </RowBetween>
      <ButtonPrimary style={{ margin: '20px 0 0 0' }} onClick={onAdd}>
        <Text fontWeight={500} fontSize={20}>
          {/*{noLiquidity ? 'Create Pool & Supply' : 'Confirm Supply'}*/}
          {'Confirm Supply'}
        </Text>
      </ButtonPrimary>
    </>
  );
}
