import React from 'react';
import styled from 'styled-components/macro';
import { lighten } from 'polished';
import { useTranslation } from 'react-i18next';
import { Link as HistoryLink, NavLink } from 'react-router-dom';

import { ArrowLeft } from 'react-feather';
import { RowBetween } from '../Row';
import QuestionHelper from '../QuestionHelper';
import { useIsEthActive, useNetworkData } from '../../hooks/Coins';
import { isMobile } from 'react-device-detect';

const Tabs = styled.div`
  ${({ theme }) => theme.flexRowNoWrap}
  align-items: center;
  border-radius: 3rem;
  justify-content: space-evenly;
  width: 380px;
  margin: 0 auto;

  ${({ theme }) => theme.mediaWidth.upToMedium`
    width: 310px;
  `};
`;

const activeClassName = 'ACTIVE';

const StyledNavLink = styled(NavLink).attrs({
  activeClassName,
})`
  ${({ theme }) => theme.flexRowNoWrap}
  align-items: center;
  justify-content: center;
  height: 3rem;
  border-radius: 3rem;
  outline: none;
  cursor: pointer;
  text-decoration: none;
  color: ${({ theme }) => theme.lightGrey};
  font-size: 16px;

  &.${activeClassName} {
    border-radius: 12px;
    font-weight: 500;
    color: ${({ theme }) => theme.white};

    :hover,
    :focus {
      color: ${({ theme }) => theme.white};
    }
  }

  :hover,
  :focus {
    color: ${({ theme }) => lighten(0.3, theme.lightGrey)};
  }
`;

const ExternalNavLink = styled.div`
  ${({ theme }) => theme.flexRowNoWrap}
  align-items: center;
  justify-content: center;
  height: 3rem;
  border-radius: 3rem;
  outline: none;
  cursor: pointer;
  text-decoration: none;
  color: ${({ theme }) => theme.lightGrey};
  font-size: 16px;
  
  :hover,
  :focus {
    color: ${({ theme }) => lighten(0.3, theme.lightGrey)};
  }
`;

const ActiveText = styled.div`
  font-weight: 500;
  font-size: 20px;
`;

const StyledArrowLeft = styled(ArrowLeft)`
  color: ${({ theme }) => theme.text1};
`;

export enum TabNames {
  SWAP,
  POOL,
  MIGRATE,
  INVEST,
  FARM,
}
//TODO refactor. Component index.tsx must return single component

export function SwapPoolTabs({ active }: { active: TabNames }) {
  const { t } = useTranslation();

  const networkItem = useNetworkData();

  // const isKuCoinActive = useIsKuCoinActive();
  const isEthereumActive = useIsEthActive();

  const handleClickBridge = () => {
    if (isMobile && networkItem.bridgeUrl) {
      window.open(networkItem.bridgeUrl);
    } else {

    }
  };

  return (
    <Tabs style={{ marginBottom: '24px' }}>
      <StyledNavLink id={`swap-nav-link`} to={'/swap'} isActive={() => active === TabNames.SWAP}>
        {t('swap')}
      </StyledNavLink>
      <StyledNavLink id={`pool-nav-link`} to={'/pool'} isActive={() => active === TabNames.POOL}>
        {t('pool')}
      </StyledNavLink>
      <StyledNavLink
        id={`migrate-nav-link`}
        to={'/migrate'}
        isActive={() => active === TabNames.MIGRATE}
      >
        {t('migrate')}
      </StyledNavLink>
      {/*<StyledNavLink
        id={`pool-nav-link`}
        to={'/invest'}
        isActive={() => active === TabNames.INVEST}
      >
        {t('invest')}
      </StyledNavLink>*/}
      {isEthereumActive && (
        <StyledNavLink
          id={`farm-nav-link`}
          to={'/farm'}
          isActive={() => active === TabNames.FARM}
        >
          {t('Stake & Farm')}
        </StyledNavLink>
      )}
      <ExternalNavLink
        onClick={handleClickBridge}
      >
        {t('Bridge')}
      </ExternalNavLink>
    </Tabs>
  );
}

export function FindPoolTabs() {
  return (
    <Tabs>
      <RowBetween style={{ padding: '1rem' }}>
        <HistoryLink to="/pool">
          <StyledArrowLeft />
        </HistoryLink>
        <ActiveText>Import Pool</ActiveText>
        <QuestionHelper
          text={"Use this tool to find pairs that don't automatically appear in the interface."}
        />
      </RowBetween>
    </Tabs>
  );
}

export function AddRemoveTabs({ adding }: { adding: boolean }) {
  return (
    <Tabs>
      <RowBetween style={{ padding: '1rem' }}>
        <HistoryLink to="/pool">
          <StyledArrowLeft />
        </HistoryLink>
        <ActiveText>{adding ? 'Add' : 'Remove'} Liquidity</ActiveText>
        <QuestionHelper
          text={
            adding
              ? 'When you add liquidity, you are given pool tokens representing your position. These tokens automatically earn fees proportional to your share of the pool, and can be redeemed at any time.'
              : 'Removing pool tokens converts your position back into underlying tokens at the current rate, proportional to your share of the pool. Accrued fees are included in the amounts you receive.'
          }
        />
      </RowBetween>
    </Tabs>
  );
}
