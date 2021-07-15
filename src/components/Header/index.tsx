import { ChainId } from '@uniswap/sdk';
import React from 'react';
import { isMobile, isTablet } from 'react-device-detect';
import { Text } from 'rebass';
import styled from 'styled-components/macro';
import Logo from '../../assets/svg/logo.svg';
import LogoDark from '../../assets/svg/logo_dark.svg';
// import Wordmark from '../../assets/svg/wordmark.svg';
// import WordmarkDark from '../../assets/svg/wordmark_white.svg';
import { useActiveWeb3React } from '../../hooks';
import { useDarkModeManager } from '../../state/user/hooks';
import { useETHBalances } from '../../state/wallet/hooks';
import { WhiteCard } from '../Card';
import Settings from '../Settings';
import Menu from '../Menu';
import Row, { RowBetween } from '../Row';
import Web3Status from '../Web3Status';
import { tokenAmountToString } from '../../utils/formats';
import { ReactComponent as MagicIcon } from '../../assets/images/magic_icon.svg';
import chainIds from '../../constants/chainIds';

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
    margin-right: 10px;

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

const TestnetWrapper = styled.div`
  white-space: nowrap;
  width: fit-content;
  margin-left: 10px;
  pointer-events: auto;
`;

const NetworkCard = styled(WhiteCard)`
  width: fit-content;
  margin-right: 10px;
  border-radius: 12px;
  padding: 8px 12px;
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

const NETWORK_LABELS: { [chainId in ChainId]: string | null } = {
  [ChainId.MAINNET]: null,
  [ChainId.RINKEBY]: 'Rinkeby',
  [ChainId.ROPSTEN]: 'Ropsten',
  [ChainId.GÖRLI]: 'Görli',
  [ChainId.KOVAN]: 'Kovan',
  // @ts-ignore
  [chainIds.KUCOIN]: 'Kucoin',
};

export default function Header() {
  const { account, chainId } = useActiveWeb3React();
  const userEthBalance = useETHBalances([account])[account];
  const [isDark] = useDarkModeManager();
  return (
    <HeaderFrame>
      <RowBetweenStyled>
        <LogoElem>
          <Title href=".">
            <UniIcon>
              <LogoImg src={isDark ? LogoDark : Logo} alt="logo" />
            </UniIcon>
            <TitleText>
              {/*<img style={{ marginLeft: '4px', marginTop: '4px' }} src={isDark ? WordmarkDark : Wordmark} alt="logo" width="160px"/>*/}
            </TitleText>
          </Title>
        </LogoElem>
        <HeaderControls>
          <HeaderElement>
            <a className="purple-btn" href={`${window.location.origin}/magic_cards/`}>
              <span>Magic Hall</span>
            </a>
            {!isMobile && !isTablet && NETWORK_LABELS[chainId] && (
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
                    {tokenAmountToString(userEthBalance, 4)}{' '}
                    {/*// @ts-ignore*/}
                    {chainId === chainIds.KUCOIN ? 'KCS' : 'ETH'}
                  </BalanceText>
                </>
              ) : null}
              <Web3Status />
            </AccountElement>
          </HeaderElement>
        </HeaderControls>
        <HeaderElementWrap>
          <StyledMagicButton href={`${window.location.origin}/magic_cards/`}>
            <MagicIcon />
          </StyledMagicButton>
          <Settings />
          <Menu />
        </HeaderElementWrap>
      </RowBetweenStyled>
    </HeaderFrame>
  );
}
