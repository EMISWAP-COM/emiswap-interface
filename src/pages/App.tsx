import React, { Suspense, useCallback, useEffect } from 'react';
import { BrowserRouter, Redirect, Route, RouteComponentProps, Switch } from 'react-router-dom';
import { isMobile } from 'react-device-detect';
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
// import MigrateV1 from './MigrateV1';
// import MigrateV1Exchange from './MigrateV1/MigrateV1Exchange';
import { AppWrapper } from '../base/ui/AppWrapper/AppWrapper';
import { ErrorBoundary } from '../components/ErrorBoundary/ErrorBoundary';
// import Claim from './Claim';
import MigrateV1 from './MigrateV1';
import MigrateV1Exchange from './MigrateV1/MigrateV1Exchange';
// import Invest from './Invest';
import Farm from './Farm';
import NotFound from './NotFound';
import SocButtons from '../components/SocButtons';
import Landing from './Landing/Landing';
import { useActiveWeb3React } from '../hooks';
import Farm365 from './Farm365/Farm365';
import { useReferralUrlParser } from '../referral-url-parser';
import { fetchWrapper } from '../api/fetchWrapper';

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
  const { connector, account } = useActiveWeb3React();

  const referralAddress = useReferralUrlParser();

  useEffect(() => {
    if (account && referralAddress) {
      const baseUrl = window['env'] ? window['env'].REACT_APP_PUBLIC_URL : '';
      fetchWrapper
        .post(`${baseUrl}/v1/public/users`, {
          body: JSON.stringify({
            address: account,
            referral_address: referralAddress,
          }),
        })
        .then(data => {})
        .catch(e => {
          console.log(e);
        });
    }
  }, [account, referralAddress]);

  const changeChainToPolygon = useCallback(async () => {
    if (!connector) {
      return;
    }

    const provider = await connector.getProvider();

    provider.request({
      jsonrpc: '2.0',
      method: 'wallet_switchEthereumChain',
      params: [
        {
          chainId: '0x89',
        },
      ],
      id: 0,
    });
  }, [connector]);

  useEffect(() => {
    if (window.location.hash) {
      window.location.replace(window.location.href.replace('/#/', '/'));
    }

    const search = window.location.search;

    if (search.length && search.startsWith('?r=')) {
      localStorage.setItem('UTMMarks', search);

      // Redirect from all links with referral
      if (window.location.pathname === '/main') {
        localStorage.setItem('l_redirect', `true`);

        return;
      }

      // Already redirected from landing
      if (localStorage.getItem('l_redirect') === 'true') {
        localStorage.removeItem('l_redirect');

        return;
      }

      window.location.href = `${window.location.origin}/main${window.location.search}`;
      localStorage.setItem('l_redirect', `true`);
    }
  }, []);

  useEffect(() => {
    // Change chain to Polygon if it's referral link
    const search = window.location.search;
    if (search.length && search.startsWith('?r=')) {
      if (isMobile && connector) {
        changeChainToPolygon();
      }
    }
  }, [connector, changeChainToPolygon]);

  const is404Page = window.location.pathname === '/404';

  return (
    <Suspense fallback={null}>
      <BrowserRouter>
        <Route component={GoogleAnalyticsReporter} />
        <Route component={DarkModeQueryParamReader} />
        <AppWrapper is404Page={is404Page}>
          <Header />
          <BodyWrapper>
            <Popups />
            <Polling />
            <Web3ReactManager>
              <ErrorBoundary title={'Oops, try again later...'} onDismiss={() => {}}>
                <Switch>
                  {/*<Route exact strict path="/invest" component={Invest} />*/}
                  <Route exact strict path="/main" component={Landing} />
                  <Redirect exact from="/" to="/main" />
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
                  {/*<Route exact strict path="/claim/:tokenName" component={Claim} />*/}
                  <Route exact strict path="/claim/:tokenName" component={RedirectPathToSwap} />
                  <Route exact strict path="/farm-365" component={Farm365} />
                  <Route exact strict path="/farm" component={Farm} />
                  <Route path="/404" component={NotFound} />
                  <Route component={RedirectPathToSwap} />
                </Switch>
              </ErrorBoundary>
            </Web3ReactManager>
            <SocButtons />
          </BodyWrapper>
        </AppWrapper>
      </BrowserRouter>
    </Suspense>
  );
}
