import React from 'react';
import { Text } from 'rebass';
import { ChainId, currencyEquals, ETHER, Token } from '@uniswap/sdk';
import styled from 'styled-components';

import { KOVAN_WETH, SUGGESTED_BASES } from '../../constants';
import { AutoColumn } from '../Column';
import QuestionHelper from '../QuestionHelper';
import { AutoRow } from '../Row';
import CurrencyLogo from '../CurrencyLogo';
import { darken } from 'polished';
import defaultCoins from '../../constants/defaultCoins';
import getKcsToken from '../../constants/tokens/KCS';
import chainIds from '../../constants/chainIds';

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
  otherSelectedCurrency,
}: {
  chainId?: ChainId;
  selectedCurrency?: Token;
  onSelect: (currency: Token) => void;
  otherSelectedCurrency: Token | undefined;
}) {
  const wethTokenInfo = defaultCoins.tokens.find(
    token =>
      // @ts-ignore
      (chainId === chainIds.KUCOIN ? token.symbol === 'WKCS' : token.symbol === 'WETH') &&
      token.chainId === chainId,
  );

  const WETH: Token =
    wethTokenInfo && chainId
      ? new Token(
          // @ts-ignore
          chainId as ChainId,
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
          <CurrencyLogo
            // @ts-ignore
            currency={chainId === chainIds.KUCOIN ? getKcsToken() : ETHER}
            style={{ marginRight: 8 }}
          />
          <Text fontWeight={500} fontSize={16}>
            {/*// @ts-ignore*/}
            {chainId === chainIds.KUCOIN ? 'KCS' : 'ETH'}
          </Text>
        </BaseWrapper>
        {(chainId ? SUGGESTED_BASES[chainId] : []).map((token: Token) => {
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
