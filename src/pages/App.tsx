import React, { Suspense, useEffect } from 'react';
import { BrowserRouter, Redirect, Route, RouteComponentProps, Switch } from 'react-router-dom';
import Wordmark from '../components/Wordmark';
import styled from 'styled-components';
import GoogleAnalyticsReporter from '../components/analytics/GoogleAnalyticsReporter';
import Header from '../components/Header';
import Popups from '../components/Popups';
import Web3ReactManager from '../components/Web3ReactManager';
import Polling from '../components/Header/Polling';
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
// TODO removed Invest tab until further notice. import Invest from './Invest';
import { RedirectPathToSwapOnly, RedirectToSwap } from './Swap/redirects';
import ReferralUrlParser from '../referral-url-parser';
// import MigrateV1 from './MigrateV1';
// import MigrateV1Exchange from './MigrateV1/MigrateV1Exchange';
import { AppWrapper } from '../base/ui/AppWrapper/AppWrapper';
import { ErrorBoundary } from '../components/ErrorBoundary/ErrorBoundary';
import Claim from './Claim';
import MigrateV1 from './MigrateV1';
import MigrateV1Exchange from './MigrateV1/MigrateV1Exchange';
// import Invest from './Invest';
import Farm from './Farm';
import NotFound from './NotFound';

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
  padding-top: 65px;
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  z-index: 10;

  ${({ theme }) => theme.mediaWidth.upToSmall`
      padding: 16px;
  `};

  z-index: 1;
`;

export function RedirectPathToSwap({ location }: RouteComponentProps) {
  return <Redirect to={{ ...location, pathname: '/swap' }} />;
}

export default function App() {
  useEffect(() => {
    const search = window.location.hash.split('?');
    // throw new TypeError('type invalid')

    if (search[1] && search[1].length) {
      localStorage.setItem('UTMMarks', `?${search[1]}`);
    }
  }, []);

  const is404Page = window.location.pathname === '/404';

  return (
    <Suspense fallback={null}>
      <BrowserRouter>
        <ReferralUrlParser>
          <Route component={GoogleAnalyticsReporter} />
          <Route component={DarkModeQueryParamReader} />
          <AppWrapper is404Page={is404Page}>
            <LogoWrapper>
              <Wordmark />
            </LogoWrapper>
            <HeaderWrapper>
              <Header is404Page={is404Page} />
            </HeaderWrapper>
            <BodyWrapper>
              <Popups />
              <Polling />
              <Web3ReactManager>
                <ErrorBoundary title={'Oops, try again later...'} onDismiss={() => {}}>
                  <Switch>
                    {/*<Route exact strict path="/invest" component={Invest} />*/}
                    <Redirect exact from="/" to="/swap" />
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
                    <Route exact strict path="/claim/:tokenName" component={Claim} />
                    <Route exact strict path="/farm" component={Farm} />
                    <Route path="/404" component={NotFound} />
                    <Redirect to="/404" />
                    {/* <Route component={RedirectPathToSwap} /> */}
                  </Switch>
                </ErrorBoundary>
              </Web3ReactManager>
            </BodyWrapper>
          </AppWrapper>
        </ReferralUrlParser>
      </BrowserRouter>
    </Suspense>
  );
}
