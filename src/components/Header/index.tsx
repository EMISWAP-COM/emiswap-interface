import { ChainId } from '@uniswap/sdk';
import React from 'react';
import { Text } from 'rebass';
import styled from 'styled-components/macro';
import Logo from '../../assets/svg/logo.svg';
import LogoDark from '../../assets/svg/logo_dark.svg';
// import Wordmark from '../../assets/svg/wordmark.svg';
// import WordmarkDark from '../../assets/svg/wordmark_white.svg';
import { useActiveWeb3React } from '../../hooks';
import { useDarkModeManager } from '../../state/user/hooks';
import { useETHBalances } from '../../state/wallet/hooks';
import Settings from '../Settings';
import Menu from '../Menu';
import Row, { RowBetween } from '../Row';
import Web3Status from '../Web3Status';
import { tokenAmountToString } from '../../utils/formats';
import { ReactComponent as MagicIcon } from '../../assets/images/magic_icon.svg';
import { ButtonGray, ButtonOutlined } from '../Button';
import NetworkSwitchModal from './NetworkSwitchModal';
import { useBridgeModalToggle, useNetworkSwitchModalToggle } from '../../state/application/hooks';
import chainIds from '../../constants/chainIds';
import { useNetworkData } from '../../hooks/Coins';
import { useLocation } from 'react-router-dom';
import { isMobile } from "react-device-detect";
import BridgeModal from './BridgeModal';

const HeaderFrame = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  width: 100%;
  top: 0;
  position: relative;
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
    height: 40px;
    background-color: white;
    margin-right: 10px;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    user-select: none;
    cursor: pointer;

    font-family: 'IBM Plex Sans';
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

  .purple-btn {
    width: 180px;
    height: 40px;
    padding: 12px 22px;
    text-decoration: none;
    background: ${({ theme }) => theme.purple};
    border-radius: 4px;
    font-family: IBM Plex Sans;
    font-style: normal;
    font-weight: 500;
    font-size: 13px;
    line-height: 17px;
    display: flex;
    align-items: center;
    text-align: center;
    letter-spacing: 0.02em;
    color: #ffffff;
    margin-right: 16px;

    &:hover,
    &:focus {
      box-shadow: ${({ theme }) => theme.purpleBoxShadow};
    }
  }

  .purple-btn > span {
    width: 100%;
  }

  ${({ theme }) => theme.mediaWidth.upToTabletop`
    border-radius: 0.5rem;
    width: 100%;
    padding: 18px 16px;
    justify-content: space-between;
    .white-btn {
      width: 100%;
      margin-right: 10px;
      margin-bottom: 0;
    }
    .purple-btn {
      display: none;
    }
  `};
`;

const LogoElem = styled(HeaderElement)`
  ${({ theme }) => theme.mediaWidth.upToMedium`
    order: 1;
    width: calc(100% - 124px);
  `};
  ${({ theme }) => theme.mediaWidth.upToTabletop`
    width: calc(100% - 160px);
    padding: 22px 0px 22px 16px;
    border-radius: 0;
  `};
`;

const StyledMagicButton = styled.a`
  display: none;
  position: relative;
  border: none;
  height: 40px;
  background-color: ${({ theme }) => theme.purple};
  align-items: center;
  transition: all 0.3s ease-in-out;

  padding: 0.15rem 0.625rem;
  border-radius: 0.5rem;

  svg {
    margin-top: 6px;
    height: 20px;
    width: 20px;
  }

  ${({ theme }) => theme.mediaWidth.upToTabletop`
    display: inline-block;
  `};
`;

const StyledGoToButton = styled.a`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: center;
  padding: 0.15rem 2rem;
  height: 40px;
  background-color: ${({ theme }) => theme.blue};
  border: none;
  transition: all 0.3s ease-in-out;
  border-radius: 4px;
  color:  ${({ theme }) => theme.dark2};
  text-decoration: none;

  ${({ theme }) => theme.mediaWidth.upToTabletop`
    position: fixed;
    bottom: 0;
    width: calc(100% - 48px);
    margin: 0 auto 16px;
    height: 56px;
    left: 0;
    right: 0;
  `};
`;

const HeaderElementWrap = styled.div`
  display: flex;
  align-items: center;
  ${({ theme }) => theme.mediaWidth.upToLarge`
    order: 2;
  `};
  ${({ theme }) => theme.mediaWidth.upToTabletop`
    width: auto;
    padding: 18px 0;
    padding-right: 16px;
    height: 55px;
    box-sizing: content-box;
  `};
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
  background-color: transparent;
  color: ${({ theme }) => theme.grey3};
  border-radius: 12px;
  white-space: nowrap;
  // width: 100%;
  background: #000000;

  @media screen and (max-width: 768px) {
    width: 100%;
    max-width: 440px;
    margin: auto;
  }

  :focus {
    border: 1px solid blue;
  }
`;

const AprButton = styled(ButtonOutlined)`
  box-sizing: border-box;
  width: auto;
  height: 40px;
  margin-right: 14px;
  padding: 8.5px 20px;
  border-color: #615c69;
  border-radius: 4px;
  color: white;

  &:focus,
  &:hover {
    border: 1px solid ${({ theme }) => theme.purple};
    background: ${({ theme }) => theme.darkGrey};
    box-shadow: none;
  }
`;

const NetworkWrapper = styled.div`
  white-space: nowrap;
  width: fit-content;
  margin-left: 10px;
  pointer-events: auto;
`;

const NetworkButtonSwitch = styled(ButtonGray)`
  box-sizing: border-box;
  width: fit-content;
  min-width: 120px;
  height: 40px;
  margin-right: 24px;
  padding: 0 16px;
  border: 1px solid #615c69;
  border-radius: 4px;
  background: ${({ theme }) => theme.darkGrey};
  color: white;

  &:focus,
  &:hover {
    border: 1px solid ${({ theme }) => theme.purple};
    background: ${({ theme }) => theme.darkGrey};
    box-shadow: none;
  }
  &:active {
    border: 1px solid #615c69;
    background: ${({ theme }) => theme.darkGrey};
    box-shadow: none;
  }
`;

const NetworkIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 24px;
  height: 24px;
  margin-right: 8px;
  border-radius: 50%;
  background: white;
`;

const NetworkLabel = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 18px;
  margin-left: 16px;
  padding: 0 8px;
  border-radius: 50px;
  font-size: 8px;
  background: #e478ff;
  color: ${({ theme }) => theme.dark2};
`;

const UniIcon = styled.div`
  width: 175px;
  height: 47px;
  transition: transform 0.3s ease;
  :hover {
    transform: rotate(-5deg);
  }
`;

const LogoImg = styled.img`
  width: 100%;
`;

const HeaderControls = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: auto;

  ${({ theme }) => theme.mediaWidth.upToMedium`
    order: 3;
    width: 100%;
    justify-content: center;
  `};

  ${({ theme }) => theme.mediaWidth.upToTabletop`
  :last-child {
    width: 100%;
    background: transparent;

    & > div:first-child {
      background: transparent;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }
  `};
`;

const BalanceText = styled(Text)`
  font-weight: 450;
  font-size: 13px;
  line-height: 19px;
  letter-spacing: 0.02em;
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.white};

  ${({ theme }) => theme.mediaWidth.upToTabletop`
    display: none;
  `};
`;

const RowBetweenStyled = styled(RowBetween)`
  padding: 1rem 1rem 0 1rem;
  align-items: flex-start;

  ${({ theme }) => theme.mediaWidth.upToLarge`
      flex-wrap: wrap;
  `};

  ${({ theme }) => theme.mediaWidth.upToTabletop`
      padding: 0;
      flex-wrap: wrap;
  `};
`;

/*const BridgeDropdown = styled.span`
  display: flex;
  flex-direction: column;
  z-index: 100;
  position: absolute;
  top: 48px;
  left: 10px;
  min-width: 20.125rem;

  border-radius: 0.5rem;
  font-size: 1rem;

  background-color: ${({ theme }) => theme.dark1};
  box-shadow: ${({ theme }) => theme.dark1BoxShadow};
`;*/

const NETWORK_LABELS: { [chainId in chainIds]: string | null } = {
  [ChainId.MAINNET]: 'Ethereum',
  [ChainId.RINKEBY]: 'Rinkeby',
  [ChainId.ROPSTEN]: 'Ropsten',
  [ChainId.GÖRLI]: 'Görli',
  [ChainId.KOVAN]: 'Kovan',
  [chainIds.KUCOIN]: 'KuCoin',
  [chainIds.POLYGON]: 'Polygon',
  [chainIds.MUMBAI]: 'Mumbai',
  [chainIds.AVALANCHE]: 'Avalanche',
};

export default function Header() {
  const { pathname } = useLocation();

  const { account, chainId } = useActiveWeb3React();
  const userEthBalance = useETHBalances([account])[account];

  const [isDark] = useDarkModeManager();

  const networkItem = useNetworkData();

  const toggleNetworkSwitchModal = useNetworkSwitchModalToggle();
  const toggleBridgeModal = useBridgeModalToggle();

  const is404Page = pathname === '/404';

  return (
    <HeaderFrame>
      <RowBetweenStyled>
        <LogoElem>
          <Title href=".">
            <UniIcon>
              <LogoImg src={isDark ? LogoDark : Logo} alt="logo"/>
            </UniIcon>
            <TitleText>
              {/*<img style={{ marginLeft: '4px', marginTop: '4px' }} src={isDark ? WordmarkDark : Wordmark} alt="logo" width="160px"/>*/}
            </TitleText>
          </Title>
        </LogoElem>
        {is404Page ? (
          <StyledGoToButton href="/">
            <Text textAlign="center" fontWeight={500} fontSize={16}>
              Go to the platform
            </Text>
          </StyledGoToButton>
        ) : (
          <>
            <HeaderControls>
              <HeaderElement>
                {false && (
                  <AprButton>
                    <Text textAlign="center" fontWeight={500} fontSize={14}>
                      APR settings
                    </Text>
                  </AprButton>
                )}
                {!isMobile && (
                  <>
                    {networkItem.bridgeUrl ? (
                      <a href={networkItem.bridgeUrl} target="_blank" rel="noopener noreferrer">
                        <AprButton>
                          <Text textAlign="center" fontWeight={500} fontSize={14}>
                            Bridge Assets
                          </Text>
                        </AprButton>
                      </a>
                    ) : (
                      <div>
                        <AprButton onClick={toggleBridgeModal}>
                          <Text textAlign="center" fontWeight={500} fontSize={14}>
                            Bridge Assets
                          </Text>
                        </AprButton>
                        <BridgeModal/>
                      </div>
                    )}
                  </>
                )}
                <NetworkWrapper>
                  <NetworkButtonSwitch
                    onClick={toggleNetworkSwitchModal}
                  >
                    {networkItem && (
                      <NetworkIcon>
                        <img
                          style={{ maxHeight: '18px', maxWidth: '18px' }}
                          src={networkItem.icon}
                          alt={networkItem.name}
                        />
                      </NetworkIcon>
                    )}
                    <span>{NETWORK_LABELS[chainId] || 'Change Network'}</span>
                    {![chainIds.MAINNET, chainIds.KUCOIN].includes(chainId as any) && (
                      <NetworkLabel>Beta Version</NetworkLabel>
                    )}
                  </NetworkButtonSwitch>
                  <NetworkSwitchModal/>
                </NetworkWrapper>
                {chainId === (chainIds.MAINNET as any) && (
                  <a className="purple-btn" href={`${window.location.origin}/magic_cards/`}>
                    <span>Magic Hall</span>
                  </a>
                )}
                <AccountElement active={!!account} style={{ pointerEvents: 'auto' }}>
                  {account && userEthBalance ? (
                    <>
                      <BalanceText
                        style={{ flexShrink: 0 }}
                        pl="8px"
                        pr="8px"
                        mr="16px"
                        fontWeight={450}
                      >
                        {tokenAmountToString(userEthBalance, 4)} {/*// @ts-ignore*/}
                        {networkItem.currencySymbol}
                      </BalanceText>
                    </>
                  ) : null}
                  <Web3Status/>
                </AccountElement>
              </HeaderElement>
            </HeaderControls>
            <HeaderElementWrap>
              <StyledMagicButton href={`${window.location.origin}/magic_cards/`}>
                <MagicIcon/>
              </StyledMagicButton>
              <Settings/>
              <Menu/>
            </HeaderElementWrap>
          </>
        )}
      </RowBetweenStyled>
    </HeaderFrame>
  );
}
