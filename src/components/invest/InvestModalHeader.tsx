import { Token } from '@uniswap/sdk';
import React, { useContext } from 'react';
import { ArrowDown } from 'react-feather';
import { Text } from 'rebass';
import { ThemeContext } from 'styled-components';
import { Field } from '../../state/invest/actions';
import { TYPE } from '../../theme';
import { isAddress, shortenAddress } from '../../utils';
import { AutoColumn } from '../Column';
import { RowBetween, RowFixed } from '../Row';
import CurrencyLogo from '../CurrencyLogo';
import { TruncatedText } from './styleds';

export default function InvestModalHeader({
  currencies,
  formattedAmounts,
  independentField,
  recipient,
}: {
  currencies: { [field in Field]?: Token };
  formattedAmounts: { [field in Field]?: string };
  independentField: Field;
  recipient: string | null;
}) {
  const theme = useContext(ThemeContext);

  return (
    <AutoColumn gap={'md'} style={{ marginTop: '20px' }}>
      <RowBetween align="flex-end">
        <TruncatedText fontSize={24} fontWeight={500}>
          {formattedAmounts[Field.INPUT]}
        </TruncatedText>
        <RowFixed gap="4px">
          <CurrencyLogo currency={currencies[Field.INPUT]} size={'24px'} />
          <Text fontSize={24} fontWeight={500} style={{ marginLeft: '10px' }}>
            {currencies[Field.INPUT]?.symbol}
          </Text>
        </RowFixed>
      </RowBetween>
      <RowFixed>
        <ArrowDown size="16" color={theme.text2} />
      </RowFixed>
      <RowBetween align="flex-end">
        <TruncatedText fontSize={24} fontWeight={500}>
          {formattedAmounts[Field.OUTPUT]}
        </TruncatedText>
        <RowFixed gap="4px">
          <CurrencyLogo currency={currencies[Field.OUTPUT]} size={'24px'} />
          <Text fontSize={24} fontWeight={500} style={{ marginLeft: '10px' }}>
            {currencies[Field.OUTPUT]?.symbol}
          </Text>
        </RowFixed>
      </RowBetween>
      {recipient !== null ? (
        <AutoColumn justify="flex-start" gap="sm" style={{ padding: '12px 0 0 0px' }}>
          <TYPE.main>
            Output will be sent to{' '}
            <b title={recipient}>{isAddress(recipient) ? shortenAddress(recipient) : recipient}</b>
          </TYPE.main>
        </AutoColumn>
      ) : null}
    </AutoColumn>
  );
}
