import React from 'react';
import { Text } from 'rebass';
import { ChainId, Token, currencyEquals } from '@uniswap/sdk';
import styled from 'styled-components';

import { ETH_ONLY, SUGGESTED_BASES } from '../../constants';
import { AutoColumn } from '../Column';
import QuestionHelper from '../QuestionHelper';
import { AutoRow } from '../Row';
import CurrencyLogo from '../CurrencyLogo';
import { darken } from 'polished';

const BaseWrapper = styled.div<{ disable?: boolean }>`
  border: 1px solid ${({ theme, disable }) => (disable ? 'transparent' : theme.bg3)};
  border-radius: 10px;
  display: flex;
  padding: 4px 12px 4px 6px;
  transition: all 0.3s ease-in-out;

  align-items: center;
  :hover {
    cursor: ${({ disable }) => !disable && 'pointer'};
    background-color: ${({ theme, disable }) => !disable && darken(0.05, theme.grey5)};
  }

  background-color: ${({ theme, disable }) => (disable ? theme.bg3 : theme.grey5)};
  opacity: ${({ disable }) => disable && '0.4'};
`;

export default function CommonBases({
  chainId,
  onSelect,
  selectedCurrency,
}: {
  chainId?: ChainId;
  selectedCurrency?: Token;
  onSelect: (currency: Token) => void;
}) {
  return (
    <AutoColumn gap="md">
      <AutoRow>
        <Text fontWeight={500} fontSize={14}>
          Common bases
        </Text>
        <QuestionHelper text="These tokens are commonly paired with other tokens." />
      </AutoRow>
      <AutoRow gap="4px">
        <BaseWrapper
          onClick={() => !currencyEquals(selectedCurrency, ETH_ONLY[chainId][0]) && onSelect(ETH_ONLY[chainId][0])}
          disable={selectedCurrency === ETH_ONLY[chainId][0]}
        >
          <CurrencyLogo currency={ETH_ONLY[chainId][0]} style={{ marginRight: 8 }} />
          <Text fontWeight={500} fontSize={16}>
            ETH
          </Text>
        </BaseWrapper>
        {(chainId ? SUGGESTED_BASES[chainId] : []).map((token: Token) => {
          const selected =
            selectedCurrency instanceof Token && selectedCurrency.address === token.address;
          return (
            <BaseWrapper
              onClick={() => !selected && onSelect(token)}
              disable={selected}
              key={token.address}
            >
              <CurrencyLogo currency={token} style={{ marginRight: 8 }} />
              <Text fontWeight={500} fontSize={16}>
                {token.symbol}
              </Text>
            </BaseWrapper>
          );
        })}
      </AutoRow>
    </AutoColumn>
  );
}
