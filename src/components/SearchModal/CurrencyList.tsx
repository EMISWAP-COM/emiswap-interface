import { ChainId, currencyEquals, JSBI, Token, TokenAmount } from '@uniswap/sdk';
import React, { CSSProperties, memo, useContext, useMemo } from 'react';
import { Text } from 'rebass';
import { ThemeContext } from 'styled-components';
import { useActiveWeb3React } from '../../hooks';
import { useAllTokens } from '../../hooks/Tokens';
import { useDefaultTokenList } from '../../state/lists/hooks';
import { useAddUserToken, useRemoveUserAddedToken } from '../../state/user/hooks';
import { useETHBalances } from '../../state/wallet/hooks';
import { LinkStyledButton, TYPE } from '../../theme';
import { ButtonSecondary } from '../Button';
import Column, { AutoColumn } from '../Column';
import { RowFixed } from '../Row';
import CurrencyLogo from '../CurrencyLogo';
import { FadedSpan, StyledFixedSizeList, StyledMenuItem } from './styleds';
import Loader from '../Loader';
import { isDefaultToken } from '../../utils';
import { currencyKey } from '../../utils/currencyId';
import { tokenAmountToString } from '../../utils/formats';
import defaultCoins from '../../constants/defaultCoins';
import { KOVAN_WETH } from '../../constants';
import { useIsAuroraActive, useNetworkData } from '../../hooks/Coins';

export default function CurrencyList({
  currencies,
  allBalances,
  selectedCurrency,
  onCurrencySelect,
  otherCurrency,
  showSendWithSwap,
  showName = false,
  isMatchEth = false,
  isLpTokens = false,
}: {
  currencies: Token[];
  selectedCurrency: Token;
  allBalances: { [tokenAddress: string]: TokenAmount };
  onCurrencySelect: (currency: Token) => void;
  otherCurrency: Token;
  showSendWithSwap?: boolean;
  showName?: boolean;
  isMatchEth?: boolean;
  isLpTokens?: boolean;
}) {
  const { account, chainId } = useActiveWeb3React();
  const networkData = useNetworkData();

  const theme = useContext(ThemeContext);
  const [allTokens] = useAllTokens();
  const defaultTokens = useDefaultTokenList();
  const addToken = useAddUserToken();
  const removeToken = useRemoveUserAddedToken();
  const ETHBalance = useETHBalances([account])[account];
  const isAuroraActive = useIsAuroraActive();

  const CurrencyRow = useMemo(() => {
    return memo(function CurrencyRow({ index, style }: { index: number; style: CSSProperties }) {
      const mainToken = networkData.token;

      let currency = currencies[index];
      if (!isLpTokens)
        if (index === 0) {
          currency = mainToken;
        } else {
          currency = currencies[index - 1];
        }

      const key = currencyKey(currency);
      const isDefault = isDefaultToken(defaultTokens, currency);
      const customAdded = Boolean(
        !isDefault && currency instanceof Token && allTokens[currency.address],
      );
      const balance = currency === mainToken ? ETHBalance : allBalances[key];

      const zeroBalance = balance && JSBI.equal(JSBI.BigInt(0), balance.raw);
      const wethTokenInfo = defaultCoins.tokens.find(
        token => token.symbol === networkData.currencySymbolWeth && token.chainId === chainId,
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

      const isSelected = Boolean(
        (selectedCurrency && currencyEquals(currency, selectedCurrency)) ||
          (isMatchEth &&
            ((otherCurrency &&
              (otherCurrency.isEther || (!isAuroraActive && otherCurrency.equals(WETH))) &&
              currency.isEther) ||
              (!isAuroraActive && currency.equals(WETH)))),
      );
      const otherSelected = Boolean(otherCurrency && currencyEquals(otherCurrency, currency));

      return (
        <StyledMenuItem
          style={style}
          className={`token-item-${key}`}
          onClick={() => (isSelected ? null : onCurrencySelect(currency))}
          disabled={isSelected}
          selected={otherSelected}
        >
          <RowFixed>
            <CurrencyLogo currency={currency} size={'18px'} style={{ marginRight: '16px' }} />
            <Column>
              <Text fontWeight={500}>{showName ? currency.name : currency.symbol}</Text>
              <FadedSpan>
                {customAdded ? (
                  <TYPE.main fontWeight={500}>
                    Added by user
                    <LinkStyledButton
                      onClick={event => {
                        event.stopPropagation();
                        if (currency instanceof Token) removeToken(chainId, currency.address);
                      }}
                    >
                      (Remove)
                    </LinkStyledButton>
                  </TYPE.main>
                ) : null}
                {!isDefault && !customAdded ? (
                  <TYPE.main fontWeight={500}>
                    Found by address
                    <LinkStyledButton
                      onClick={event => {
                        event.stopPropagation();
                        if (currency instanceof Token) addToken(currency);
                      }}
                    >
                      (Add)
                    </LinkStyledButton>
                  </TYPE.main>
                ) : null}
              </FadedSpan>
            </Column>
          </RowFixed>
          <AutoColumn>
            {balance ? (
              <Text>
                {zeroBalance && showSendWithSwap ? (
                  <ButtonSecondary padding={'4px 8px'}>
                    <Text textAlign="center" fontWeight={500} fontSize={14} color={theme.primary1}>
                      Send With Swap
                    </Text>
                  </ButtonSecondary>
                ) : balance ? (
                  tokenAmountToString(balance)
                ) : (
                  '-'
                )}
              </Text>
            ) : account ? (
              <Loader />
            ) : (
              '-'
            )}
          </AutoColumn>
        </StyledMenuItem>
      );
    });
  }, [
    ETHBalance,
    account,
    addToken,
    allBalances,
    allTokens,
    chainId,
    currencies,
    defaultTokens,
    onCurrencySelect,
    otherCurrency,
    removeToken,
    selectedCurrency,
    showSendWithSwap,
    theme.primary1,
    isMatchEth,
    networkData,
    showName,
    isLpTokens,
    isAuroraActive,
  ]);

  return (
    <StyledFixedSizeList
      width="auto"
      height={500}
      itemCount={isLpTokens ? currencies.length : currencies.length + 1}
      itemSize={50}
      style={{ flex: '1', margin: '0 30px' }}
      itemKey={index => currencyKey(currencies[index])}
    >
      {CurrencyRow}
    </StyledFixedSizeList>
  );
}
