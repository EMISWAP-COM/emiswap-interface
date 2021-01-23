import { ETHER, Trade } from '@uniswap/sdk';
import React, { Fragment, memo, useContext } from 'react';
import { useSelector } from 'react-redux';
import { ChevronRight } from 'react-feather';
import { Flex } from 'rebass';
import { ThemeContext } from 'styled-components';
import { TYPE } from '../../theme';
import CurrencyLogo from '../CurrencyLogo';
import { AppState } from '../../state';
import { Field } from '../../state/swap/actions';
import { ZERO_ADDRESS } from '../../constants/one-split';
import { KOVAN_WETH } from '../../constants';

export default memo(function SwapRoute({ trade }: { trade: Trade }) {
  const theme = useContext(ThemeContext);
  const swapState = useSelector<AppState, AppState['swap']>(state => state.swap);
  const routeToRender = trade.route.path.map((token, i, path) => {
    if (
      swapState[Field.INPUT].currencyId === ZERO_ADDRESS ||
      swapState[Field.OUTPUT].currencyId === ZERO_ADDRESS
    ) {
      return token.equals(KOVAN_WETH) ? ETHER : token;
    }
    return token;
  });
  return (
    <Flex
      px="1rem"
      py="0.5rem"
      my="0.5rem"
      style={{ border: `1px solid ${theme.bg3}`, borderRadius: '1rem' }}
      flexWrap="wrap"
      width="100%"
      justifyContent="space-evenly"
      alignItems="center"
    >
      {routeToRender.map((token, i, path) => {
        const isLastItem: boolean = i === path.length - 1;
        return (
          <Fragment key={i}>
            <Flex my="0.5rem" alignItems="center" style={{ flexShrink: 0 }}>
              <CurrencyLogo currency={token} size="1.5rem" />
              <TYPE.black fontSize={14} color={theme.text1} ml="0.5rem">
                {token.symbol}
              </TYPE.black>
            </Flex>
            {isLastItem ? null : <ChevronRight color={theme.text2} />}
          </Fragment>
        );
      })}
    </Flex>
  );
});
