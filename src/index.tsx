import { Web3Provider } from '@ethersproject/providers';
import { createWeb3ReactRoot, Web3ReactProvider } from '@web3-react/core';
import React from 'react';
import { isMobile } from 'react-device-detect';
import ReactDOM from 'react-dom';
import ReactGA from 'react-ga';
import { Provider } from 'react-redux';
import { NetworkContextName } from './constants';
import 'inter-ui';
import './i18n';
import App from './pages/App';
import store from './state';
import ApplicationUpdater from './state/application/updater';
import TransactionUpdater from './state/transactions/updater';
import ListsUpdater from './state/lists/updater';
import UserUpdater from './state/user/updater';
import MulticallUpdater from './state/multicall/updater';
import InvestUpdater from './state/invest/updater';
import ThemeProvider, { FixedGlobalStyle, ThemedGlobalStyle } from './theme';
import HttpsRedirect from './https-redirect';
import { ErrorBoundary } from './components/ErrorBoundary/ErrorBoundary';
import ReactPixel from 'react-facebook-pixel';
import RootV2 from './App';

import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';

import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import duration from 'dayjs/plugin/duration';

dayjs.extend(customParseFormat);
dayjs.extend(duration);

const { REACT_APP_SENTRY_DSN, REACT_APP_SENTRY_PROJECT, REACT_APP_SENTRY_RELEASE } = window['env'];
Sentry.init({
  dsn: REACT_APP_SENTRY_DSN,
  release: `${REACT_APP_SENTRY_PROJECT}@${REACT_APP_SENTRY_RELEASE}`,
  integrations: [new Integrations.BrowserTracing()],
  tracesSampleRate: 1.0,
});

const advancedMatching = { em: 'some@email.com' } as any;
const options = {
  autoConfig: true,
  debug: true,
};
ReactPixel.init('980043795863508', advancedMatching, options);
ReactPixel.pageView();

const Web3ProviderNetwork = createWeb3ReactRoot(NetworkContextName);

if (window.ethereum && (window.ethereum as any).hasOwnProperty('autoRefreshOnNetworkChange')) {
  (window.ethereum as any).autoRefreshOnNetworkChange = false;
}

function getLibrary(provider: any): Web3Provider {
  const library = new Web3Provider(provider);
  library.pollingInterval = 15000;
  return library;
}

const GOOGLE_ANALYTICS_ID: string | undefined = window['env'].REACT_APP_GOOGLE_ANALYTICS_ID;
if (typeof GOOGLE_ANALYTICS_ID === 'string') {
  ReactGA.initialize(GOOGLE_ANALYTICS_ID, {
    gaOptions: {
      allowLinker: true,
    },
  });
  ReactGA.ga('require', 'linker');
  ReactGA.ga('linker:autoLink', ['crowdsale.emidao.org']);
  ReactGA.set({
    customBrowserType: !isMobile
      ? 'desktop'
      : 'web3' in window || 'ethereum' in window
      ? 'mobileWeb3'
      : 'mobileRegular',
  });
} else {
  ReactGA.initialize('test', { testMode: true, debug: true });
}

window.addEventListener('error', error => {
  ReactGA.exception({
    description: `${error.message} @ ${error.filename}:${error.lineno}:${error.colno}`,
    fatal: true,
  });
});

// eslint-disable-next-line no-extend-native
Object.defineProperty(Array.prototype, 'flat', {
  value: function(depth = 1) {
    return this.reduce(function(flat, toFlatten) {
      return flat.concat(
        Array.isArray(toFlatten) && depth > 1 ? toFlatten.flat(depth - 1) : toFlatten,
      );
    }, []);
  },
});

function Updaters() {
  return (
    <>
      <ListsUpdater />
      <UserUpdater />
      <ApplicationUpdater />
      <TransactionUpdater />
      <MulticallUpdater />
      <InvestUpdater />
    </>
  );
}

const Root = Sentry.withProfiler(() => (
  <HttpsRedirect>
    <Provider store={store}>
      <ThemeProvider>
        <ErrorBoundary title={'Oops, something goes wrong...'}>
          <FixedGlobalStyle />
          <Web3ReactProvider getLibrary={getLibrary}>
            <Web3ProviderNetwork getLibrary={getLibrary}>
              <Updaters />
              <ThemedGlobalStyle />
              <App />
            </Web3ProviderNetwork>
          </Web3ReactProvider>
        </ErrorBoundary>
      </ThemeProvider>
    </Provider>
  </HttpsRedirect>
));

const isAPPV2 = Boolean(process.env.REACT_APP_V2);

ReactDOM.render(isAPPV2 ? <RootV2 /> : <Root />, document.getElementById('root'));
