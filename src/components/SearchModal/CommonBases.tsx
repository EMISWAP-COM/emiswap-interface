import React from 'react';
import { Text } from 'rebass';
import { ChainId, Token, currencyEquals, ETHER } from '@uniswap/sdk';
import styled from 'styled-components';

import { KOVAN_WETH, SUGGESTED_BASES } from '../../constants';
import { AutoColumn } from '../Column';
import QuestionHelper from '../QuestionHelper';
import { AutoRow } from '../Row';
import CurrencyLogo from '../CurrencyLogo';
import { darken } from 'polished';
import defaultCoins from '../../constants/defaultCoins';

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

// filter for task https://emi.myjetbrains.com/youtrack/issue/ES-1114
const suggestedBases = Object.fromEntries(
  Object.entries(SUGGESTED_BASES).map(([key, list]) => {
    return [key, list.filter(t => t?.symbol !== 'ESW')];
  }),
);

export default function CommonBases({
  chainId,
  onSelect,
  selectedCurrency,
  otherSelectedCurrency,
}: {
  chainId?: ChainId;
  selectedCurrency?: Token;
  onSelect: (currency: Token) => void;
  otherSelectedCurrency: Token | undefined;
}) {
  const wethTokenInfo = defaultCoins.tokens.find(
    token => token.symbol === 'WETH' && token.chainId === chainId,
  );

  const WETH: Token =
    wethTokenInfo && chainId
      ? new Token(
          chainId,
          wethTokenInfo.address,
          wethTokenInfo.decimals,
          wethTokenInfo.symbol,
          wethTokenInfo.name,
        )
      : KOVAN_WETH;
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
          onClick={() => !currencyEquals(selectedCurrency, ETHER) && onSelect(ETHER)}
          disable={
            selectedCurrency === ETHER ||
            (selectedCurrency && selectedCurrency.isEther) ||
            (otherSelectedCurrency &&
              (otherSelectedCurrency.isEther || otherSelectedCurrency.equals(WETH)))
          }
        >
          <CurrencyLogo currency={ETHER} style={{ marginRight: 8 }} />
          <Text fontWeight={500} fontSize={16}>
            ETH
          </Text>
        </BaseWrapper>
        {(chainId ? suggestedBases[chainId] : []).map((token: Token) => {
          const selected =
            (selectedCurrency instanceof Token && selectedCurrency.address === token.address) ||
            (token.equals(WETH) &&
              otherSelectedCurrency &&
              (otherSelectedCurrency.isEther || otherSelectedCurrency.equals(WETH)));
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
