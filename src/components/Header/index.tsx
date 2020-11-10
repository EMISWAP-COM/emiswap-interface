import { ChainId } from '@uniswap/sdk';
import React from 'react';
import { isMobile } from 'react-device-detect';
import { Text } from 'rebass';

import styled from 'styled-components';

import Logo from '../../assets/svg/logo.svg';
import LogoDark from '../../assets/svg/logo_dark.svg';
// import Wordmark from '../../assets/svg/wordmark.svg'
// import WordmarkDark from '../../assets/svg/wordmark_white.svg'
import { useActiveWeb3React } from '../../hooks';
import { useDarkModeManager } from '../../state/user/hooks';
import { useETHBalances } from '../../state/wallet/hooks';

import { YellowCard } from '../Card';
import Settings from '../Settings';
import Menu from '../Menu';

import Row, { RowBetween } from '../Row';
import Web3Status from '../Web3Status';
import { tokenAmountToString } from '../../utils/formats';

const HeaderFrame = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  width: 100%;
  top: 0;
  position: absolute;
  z-index: 2;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    position: relative;
  `};
`;

const HeaderElement = styled.div`
  display: flex;
  align-items: center;

  .white-btn {
    width: 250px;
    height: 41px;
    background-color: white;
    margin-right: 10px;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    user-select: none;
    cursor: pointer;

    font-family: IBM Plex Sans;
    font-style: normal;
    font-weight: 500;
    font-size: 13px;
    line-height: 17px;
    display: flex;
    align-items: center;
    text-align: center;
    letter-spacing: 0.02em;
    color: #11b382;
  }
`;

const HeaderElementWrap = styled.div`
  display: flex;
  align-items: center;
`;

const Title = styled.a`
  display: flex;
  align-items: center;
  pointer-events: auto;
  margin-right: 10px;

  :hover {
    cursor: pointer;
  }
`;

const TitleText = styled(Row)`
  width: fit-content;
  white-space: nowrap;
  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    display: none;
  `};
`;

const AccountElement = styled.div<{ active: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: ${({ theme, active }) => (!active ? theme.bg1 : 'transparent')};
  color: ${({ theme }) => theme.grey3};
  border-radius: 12px;
  white-space: nowrap;
  width: 100%;

  :focus {
    border: 1px solid blue;
  }
`;

const TestnetWrapper = styled.div`
  white-space: nowrap;
  width: fit-content;
  margin-left: 10px;
  pointer-events: auto;
`;

const NetworkCard = styled(YellowCard)`
  width: fit-content;
  margin-right: 10px;
  border-radius: 12px;
  padding: 8px 12px;
`;

const UniIcon = styled.div`
  transition: transform 0.3s ease;
  :hover {
    transform: rotate(-5deg);
  }
`;

const HeaderControls = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  :last-child {
    margin-left: auto;
  }
`;

const BalanceText = styled(Text)`
  font-weight: 450;
  font-size: 13px;
  line-height: 19px;
  letter-spacing: 0.02em;
  display: flex;
  align-items: center;

  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    display: none;
  `};
`;

const RowBetweenStyled = styled(RowBetween)`
  padding: 1rem 1rem 0 1rem;
  align-items: flex-start;

  ${({ theme }) => theme.mediaWidth.upToSmall`
      padding: 1rem 1rem 0.5rem 1rem;
      flex-wrap: wrap;
  `};
`;

const NETWORK_LABELS: { [chainId in ChainId]: string | null } = {
  [ChainId.MAINNET]: null,
  [ChainId.RINKEBY]: 'Rinkeby',
  [ChainId.ROPSTEN]: 'Ropsten',
  [ChainId.GÖRLI]: 'Görli',
  [ChainId.KOVAN]: 'Kovan',
};

export default function Header() {
  const { account, chainId } = useActiveWeb3React();

  const userEthBalance = useETHBalances([account])[account];
  const [isDark] = useDarkModeManager();

  return (
    <HeaderFrame>
      <RowBetweenStyled>
        <HeaderElement>
          <Title href=".">
            <UniIcon>
              <img src={isDark ? LogoDark : Logo} alt="logo" />
            </UniIcon>
            <TitleText>
              {/*<img style={{ marginLeft: '4px', marginTop: '4px' }} src={isDark ? WordmarkDark : Wordmark} alt="logo" width="160px"/>*/}
            </TitleText>
          </Title>
        </HeaderElement>
        <HeaderControls>
          <HeaderElement>
            <a
              className="white-btn"
              href="http://emirex.com/?refid=ID0A9FBA8B3E&utm_source=emiswap_website&utm_medium=main&utm_campaign=button"
              target="_blank"
              rel="noopener noreferrer"
            >
              Buy Crypto with fiat
            </a>
            {!isMobile && NETWORK_LABELS[chainId] && (
              <TestnetWrapper>
                <NetworkCard>{NETWORK_LABELS[chainId]}</NetworkCard>
              </TestnetWrapper>
            )}
            <AccountElement active={!!account} style={{ pointerEvents: 'auto' }}>
              {account && userEthBalance ? (
                <>
                  <BalanceText
                    style={{ flexShrink: 0 }}
                    pl="0.75rem"
                    pr="1.125rem"
                    fontWeight={450}
                  >
                    {tokenAmountToString(userEthBalance, 4)} ETH
                  </BalanceText>
                </>
              ) : null}
              <Web3Status />
            </AccountElement>
          </HeaderElement>
          <HeaderElementWrap>
            {/*<VersionSwitch />*/}
            <Settings />
            <Menu />
          </HeaderElementWrap>
        </HeaderControls>
      </RowBetweenStyled>
    </HeaderFrame>
  );
}
