import React, { Suspense } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Wordmark from '../components/Wordmark';
import Logo from '../components/Logo';
import styled from 'styled-components';
import GoogleAnalyticsReporter from '../components/analytics/GoogleAnalyticsReporter';
import Header from '../components/Header';
import Popups from '../components/Popups';
import Web3ReactManager from '../components/Web3ReactManager';
import DarkModeQueryParamReader from '../theme/DarkModeQueryParamReader';
import AddLiquidity from './AddLiquidity';
import {
  RedirectDuplicateTokenIds,
  RedirectOldAddLiquidityPathStructure,
  RedirectToAddLiquidity,
} from './AddLiquidity/redirects';
import Pool from './Pool';
import PoolFinder from './PoolFinder';
import RemoveLiquidity from './RemoveLiquidity';
import { RedirectOldRemoveLiquidityPathStructure } from './RemoveLiquidity/redirects';
import Swap from './Swap';
import Invest from './Invest';
import { RedirectPathToSwapOnly, RedirectToSwap } from './Swap/redirects';
import ReferralUrlParser from '../referral-url-parser';
import MigrateV1 from './MigrateV1';
import MigrateV1Exchange from './MigrateV1/MigrateV1Exchange';
import UnicornSvg from '../assets/images/bg.svg';

const AppWrapper = styled.div`
  display: flex;
  flex-flow: column;
  align-items: flex-start;
  overflow-x: hidden;
  height: 100vh;
  background: center / cover no-repeat url('${UnicornSvg}');
`;

const LogoWrapper = styled.div`
  display: none;

  ${({ theme }) => theme.mediaWidth.upToSmall`
    padding-left: 65px;
    margin: 15px;
    position: relative;
  `};
`;

const HeaderWrapper = styled.div`
  ${({ theme }) => theme.flexRowNoWrap}
  width: 100%;
  justify-content: space-between;
`;

const BodyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  justify-content: center;
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  z-index: 10;

  ${({ theme }) => theme.mediaHeight.upToSmall`
       justify-content: start;
       padding-top: 16px;
  `};

  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
      padding: 16px;
  `};

  z-index: 1;
`;

export default function App() {
  return (
    <Suspense fallback={null}>
      <HashRouter>
        <ReferralUrlParser>
          <Route component={GoogleAnalyticsReporter} />
          <Route component={DarkModeQueryParamReader} />
          <AppWrapper>
            <LogoWrapper>
              <Logo mobile={true} />
              <Wordmark />
            </LogoWrapper>
            <HeaderWrapper>
              <Header />
            </HeaderWrapper>
            <BodyWrapper>
              <Popups />
              <Web3ReactManager>
                <Switch>
                  <Route exact strict path="/invest" component={Invest} />
                  <Route exact strict path="/swap" component={Swap} />
                  <Route exact strict path="/swap/:outputCurrency" component={RedirectToSwap} />
                  <Route exact strict path="/send" component={RedirectPathToSwapOnly} />
                  <Route exact strict path="/find" component={PoolFinder} />
                  <Route exact strict path="/pool" component={Pool} />
                  <Route exact strict path="/create" component={RedirectToAddLiquidity} />
                  <Route exact path="/add" component={AddLiquidity} />
                  <Route
                    exact
                    path="/add/:currencyIdA"
                    component={RedirectOldAddLiquidityPathStructure}
                  />
                  <Route
                    exact
                    path="/add/:currencyIdA/:currencyIdB"
                    component={RedirectDuplicateTokenIds}
                  />
                  <Route
                    exact
                    strict
                    path="/remove/:tokens"
                    component={RedirectOldRemoveLiquidityPathStructure}
                  />
                  <Route
                    exact
                    strict
                    path="/remove/:currencyIdA/:currencyIdB"
                    component={RemoveLiquidity}
                  />
                  <Route exact strict path="/migrate" component={MigrateV1} />
                  <Route exact strict path="/migrate/:address" component={MigrateV1Exchange} />
                  <Route component={RedirectPathToSwapOnly} />
                </Switch>
              </Web3ReactManager>
            </BodyWrapper>
          </AppWrapper>
        </ReferralUrlParser>
      </HashRouter>
    </Suspense>
  );
}
