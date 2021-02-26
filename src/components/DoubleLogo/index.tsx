import { Token } from '@uniswap/sdk';
import React from 'react';
import styled from 'styled-components';
import CurrencyLogo from '../CurrencyLogo';

const Wrapper = styled.div<{ margin: boolean; sizeraw: number; additionalMargin: number }>`
  position: relative;
  display: flex;
  flex-direction: row;
  margin-right: ${({ sizeraw, margin, additionalMargin }) =>
    margin && (sizeraw / 3 + 8 + additionalMargin).toString() + 'px'};
`;

interface DoubleCurrencyLogoProps {
  margin?: boolean;
  size?: number;
  currency0?: Token;
  currency1?: Token;
  additionalMargin?: number;
}

const HigherLogo = styled(CurrencyLogo)`
  z-index: 2;
`;
const CoveredLogo = styled(CurrencyLogo)<{ sizeraw: number }>`
  position: absolute;
  left: ${({ sizeraw }) => (sizeraw / 2).toString() + 'px'};
`;

export default function DoubleCurrencyLogo({
  currency0,
  currency1,
  size = 16,
  margin = false,
  additionalMargin = 0,
}: DoubleCurrencyLogoProps) {
  return (
    <Wrapper sizeraw={size} margin={margin} additionalMargin={additionalMargin}>
      {currency0 && <HigherLogo currency={currency0} size={size.toString() + 'px'} />}
      {currency1 && (
        <CoveredLogo currency={currency1} size={size.toString() + 'px'} sizeraw={size} />
      )}
    </Wrapper>
  );
}
