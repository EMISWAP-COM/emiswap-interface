import React from 'react';
import { Text } from 'rebass';
import styled from 'styled-components';
import Logo from '../../assets/svg/logo.svg';
import { useActiveWeb3React } from '../../hooks';
import { useETHBalances } from '../../state/wallet/hooks';
import Settings from '../Settings';
import Menu from '../Menu';
import Row, { RowBetween } from '../Row';
import Web3Status from '../Web3Status';
import { tokenAmountToString } from '../../utils/formats';
import { ReactComponent as MagicIcon } from '../../assets/images/magic_icon.svg';
import Networks from '../Newtorks'

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
    background: #9a56d1;
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
    background-color: white;
    width: calc(100% - 156px);
    padding-right: 0px;
  `};
`;

const StyledMagicButton = styled.a`
  display: none;
  position: relative;
  border: none;
  height: 40px;
  background-color: #9a56d1;
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
    background-color: white;
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
  background-color: ${({ theme, active }) => (!active ? theme.bg1 : 'transparent')};
  color: ${({ theme }) => theme.grey3};
  border-radius: 12px;
  white-space: nowrap;
  width: 100%;

  :focus {
    border: 1px solid blue;
  }
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
  width: calc(100% - 285px);
  justify-content: flex-end;

  :last-child {
    margin-left: auto;
  }

  ${({ theme }) => theme.mediaWidth.upToMedium`
    order: 3;
    width: 100%;
    justify-content: center;
  `};

  ${({ theme }) => theme.mediaWidth.upToTabletop`
  :last-child {
    margin-left: 0;
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


export default function Header() {
  const { account } = useActiveWeb3React();

  //TODO refactor hook to get BNB balance as well
  const userEthBalance = useETHBalances([account])[account];

  return (
    <HeaderFrame>
      <RowBetweenStyled>
        <LogoElem>
          <Title href=".">
            <UniIcon>
              <img src={Logo} alt="logo" />
            </UniIcon>
            <TitleText/>
          </Title>
        </LogoElem>
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
            <a className="purple-btn" href={`${window.location.origin}/magic_cards/`}>
              <span>Magic Hall</span>
            </a>


            <Networks/>


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
