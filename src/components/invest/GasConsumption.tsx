import React from 'react';
import { useContext } from 'react';
import { Text } from 'rebass';
import styled, { ThemeContext } from 'styled-components';
import QuestionHelper from '../QuestionHelper';

interface GasConsumptionProps {
  gas?: number;
  gasWhenUseChi?: number;
}

const Text2 = styled(Text)<{ color?: string }>`
  margin: 0 0 0 5px !important;
  justify-content: center;
  align-items: center;
  font-weight: 500;
  font-size: 14;
  color: ${({ color, theme }) => (color ? color : theme.text2)};
`;

export default function GasConsumption({ gas, gasWhenUseChi }: GasConsumptionProps) {
  const theme = useContext(ThemeContext);

  // const formattedPrice = showInverted ? price?.toSignificant(6) : price?.invert()?.toSignificant(6)
  // const show = Boolean(inputCurrency && outputCurrency)
  // const label = showInverted
  //   ? `${outputCurrency?.symbol} per ${inputCurrency?.symbol}`
  //   : `${inputCurrency?.symbol} per ${outputCurrency?.symbol}`

  // {/*theme.red1, theme.yellow2, theme.green1*/}

  // const ready = true;
  // const tooltipText = 'hi!!';

  // if(true){
  //   return (
  //     <Text2> - </Text2>
  //   )
  // }
  //

  // if(true){
  //   return (
  //     <Text2>1000 Gwei</Text2>
  //   )
  // }

  return (
    <div style={{ display: 'flex' }}>
      <Text2
        color={gasWhenUseChi ? theme.red1 : theme.text2}
        style={{ textDecoration: 'line-through' }}
      >
        {gas}
      </Text2>

      <Text2 color={gasWhenUseChi ? theme.green1 : theme.text2}>
        {gasWhenUseChi ? gasWhenUseChi : gas}
      </Text2>

      <Text2 style={{ marginLeft: '2px' }}>Gwei</Text2>
      <QuestionHelper
        text="The burning of CHI token decreases Gas consumption.
Metamask shows a higher gas estimation because it doesn't include gas return out of CHI token burn."
      />
    </div>
  );
}
