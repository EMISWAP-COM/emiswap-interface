import ReactGA from 'react-ga';

export const getConnectGAEvent = name => {
  switch (name) {
    case 'MetaMask':
      return () => {
        ReactGA.event({
          category: 'wallet',
          action: 'connect_metamask',
          label: 'metamask',
        });
      };
    case 'WalletConnect':
      return () => {
        ReactGA.event({
          category: 'wallet',
          action: 'connect_walletconnect',
          label: 'walletconnect',
        });
      };
    case 'Open in Coinbase Wallet':
      return () => {
        ReactGA.event({
          category: 'wallet',
          action: 'connect_coinbasewallet',
          label: 'coinbasewallet',
        });
      };
    case 'Fortmatic':
      return () => {
        ReactGA.event({
          category: 'wallet',
          action: 'connect_fortmatic',
          label: 'fortmatic',
        });
      };
    case 'Portis':
      return () => {
        ReactGA.event({
          category: 'wallet',
          action: 'connect_portis',
          label: 'portis',
        });
      };
    default:
      return () => {};
  }
};

export const getConfirmGAEvent = name => {
  switch (name) {
    case 'MetaMask':
      return () => {
        ReactGA.event({
          category: 'wallet',
          action: 'confirm',
          label: 'metamask',
        });
      };
    case 'WalletConnect':
      return () => {
        ReactGA.event({
          category: 'wallet',
          action: 'confirm',
          label: 'walletconnect',
        });
      };
    case 'Open in Coinbase Wallet':
      return () => {
        ReactGA.event({
          category: 'wallet',
          action: 'confirm',
          label: 'coinbasewallet',
        });
      };
    case 'Fortmatic':
      return () => {
        ReactGA.event({
          category: 'wallet',
          action: 'confirm',
          label: 'fortmatic',
        });
      };
    case 'Portis':
      return () => {
        ReactGA.event({
          category: 'wallet',
          action: 'confirm',
          label: 'portis',
        });
      };
    default:
      return () => {};
  }
};

export const changeWalletGA = name => {
  ReactGA.event({
    category: 'Wallet',
    action: 'Change Wallet',
    label: name,
  });
};

export const confirmWalletGA = () => {
  ReactGA.event({
    category: 'wallet',
    action: 'confirm',
    label: 'everyone',
  });
};

export const successWalletGA = () => {
  ReactGA.event({
    category: 'wallet',
    action: 'connect_success',
    label: 'success',
  });
};
