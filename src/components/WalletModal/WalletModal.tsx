import ReactGA from 'react-ga';
import ReactPixel from 'react-facebook-pixel';
import { isMobile } from 'react-device-detect';
import React, { useEffect, useState } from 'react';
import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core';

import DocLink from '../../components/DocLink';
import usePrevious from '../../hooks/usePrevious';
import { useWalletModalOpen, useWalletModalToggle } from '../../state/application/hooks';
import Modal from '../Modal';
import PendingView from './PendingView';
import Option from './Option';
import { SUPPORTED_WALLETS } from '../../constants';
import { ExternalLink } from '../../theme';
import MetamaskIcon from '../../assets/images/metamask.png';
import { fortmatic, injected, portis } from '../../connectors';
import { OVERLAY_READY } from '../../connectors/Fortmatic';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { Distributor } from '../AccountDetails/Distributor';
import { useLogin } from '../../state/user/hooks';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '../../state';
import { Ambassador } from '../AccountDetails/Ambassador';
import { Owner } from '../AccountDetails/Owner';

import * as Styled from './styled';
import { useActiveWeb3React } from '../../hooks';
import styled from 'styled-components/macro';
import { useNetworkData } from '../../hooks/Coins';
import { loadPolygonBalance } from '../../state/cabinets/action-polygon';

export enum UserRoles {
  client = 'client',
  distributor = 'distributor',
  ambassador = 'ambassador',
  owner = 'owner',
}

export interface WalletModalProps {
  pendingTransactions: string[]; // hashes of pending
  confirmedTransactions: string[]; // hashes of confirmed
  ENSName?: string;
}

const WALLET_VIEWS = {
  OPTIONS: 'options',
  OPTIONS_SECONDARY: 'options_secondary',
  ACCOUNT: 'account',
  PENDING: 'pending',
};

const WalletCustomModal = styled(Modal)`
  overflow-y: visible !important;
`;

const WalletModal: React.FC<WalletModalProps> = ({ ENSName }) => {
  // important that these are destructed from the account-specific web3-react context
  const { active, account, connector, activate, error } = useWeb3React();
  const { chainId } = useActiveWeb3React();
  const { value: network } = useNetworkData();
  const dispatch = useDispatch();

  const user = useSelector((state: AppState) => state.user.info);

  useLogin(account);

  const [walletView, setWalletView] = useState(WALLET_VIEWS.ACCOUNT);

  const [pendingWallet, setPendingWallet] = useState();

  const [pendingError, setPendingError] = useState<boolean>();

  const walletModalOpen = useWalletModalOpen();
  const toggleWalletModal = useWalletModalToggle();

  const previousAccount = usePrevious(account);
  // close on connection, when logged out before
  useEffect(() => {
    if (account && !previousAccount && walletModalOpen) {
      toggleWalletModal();
    }
  }, [account, previousAccount, toggleWalletModal, walletModalOpen]);

  // always reset to account view
  useEffect(() => {
    dispatch(loadPolygonBalance({ userId: user.id, network }));
    if (walletModalOpen) {
      setPendingError(false);
      setWalletView(WALLET_VIEWS.ACCOUNT);
    }
  }, [walletModalOpen, dispatch, network, user.id]);

  // close modal when a connection is successful
  const activePrevious = usePrevious(active);
  const connectorPrevious = usePrevious(connector);

  useEffect(() => {
    if (
      walletModalOpen &&
      ((active && !activePrevious) || (connector && connector !== connectorPrevious && !error))
    ) {
      setWalletView(WALLET_VIEWS.ACCOUNT);
    }
  }, [setWalletView, active, error, connector, walletModalOpen, activePrevious, connectorPrevious]);

  const getConnectGAEvent = name => {
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

  const getConfirmGAEvent = name => {
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

  const tryActivation = async connector => {
    let name = '';
    Object.keys(SUPPORTED_WALLETS).map(key => {
      if (connector === SUPPORTED_WALLETS[key].connector) {
        const connectGAEvent = getConnectGAEvent(SUPPORTED_WALLETS[key].name);
        connectGAEvent && connectGAEvent();
        return (name = SUPPORTED_WALLETS[key].name);
      }
      return true;
    });
    // log selected wallet
    ReactGA.event({
      category: 'Wallet',
      action: 'Change Wallet',
      label: name,
    });
    setPendingWallet(connector); // set wallet for pending view
    setWalletView(WALLET_VIEWS.PENDING);

    // if the connector is walletconnect and the user has already tried to connect, manually reset the connector
    if (connector instanceof WalletConnectConnector && connector.walletConnectProvider?.wc?.uri) {
      connector.walletConnectProvider = undefined;
    }

    activate(connector, undefined, true)
      .then(() => {
        const confirmGAEvent = getConfirmGAEvent(name);
        if (confirmGAEvent) {
          confirmGAEvent();
        }

        ReactGA.event({
          category: 'wallet',
          action: 'confirm',
          label: 'everyone',
        });

        ReactGA.event({
          category: 'wallet',
          action: 'connect_success',
          label: 'success',
        });

        ReactPixel.track('wallet_connect_success');
      })
      .catch(error => {
        console.log(error);
        if (error instanceof UnsupportedChainIdError) {
          activate(connector); // a little janky...can't use setError because the connector isn't set
        } else {
          setPendingError(true);
        }
        console.error(error);
      });
  };

  // close wallet modal if fortmatic modal is active
  useEffect(() => {
    fortmatic.on(OVERLAY_READY, () => {
      toggleWalletModal();
    });
  }, [toggleWalletModal]);

  const [termAndConditionsAccepted, setTermAndConditionsAccepted] = useLocalStorage(
    'termAndConditionsAccepted',
    false,
  );

  const [warning, setWarning] = useState(false);

  // get wallets user can switch too, depending on device/browser
  function getOptions(isAccepted: boolean) {
    const isMetamask = window.ethereum && window.ethereum.isMetaMask;
    return Object.keys(SUPPORTED_WALLETS).map(key => {
      const option = SUPPORTED_WALLETS[key];

      if (option.unavailableNetworksIds.includes(chainId)) {
        return null;
      }

      // check for mobile options
      if (isMobile) {
        //disable portis on mobile for now
        if (option.connector === portis) {
          return null;
        }

        if (!window.web3 && !window.ethereum && option.mobile) {
          return (
            <Option
              onClick={() => {
                if (isAccepted !== true) {
                  setWarning(true);
                  return;
                }
                option.connector !== connector && !option.href && tryActivation(option.connector);
              }}
              id={`connect-${key}`}
              key={key}
              active={option.connector && option.connector === connector}
              color={option.color}
              link={option.href}
              header={option.name}
              subheader={null}
              icon={require('../../assets/images/' + option.iconName)}
            />
          );
        }
        return null;
      }

      // overwrite injected when needed
      if (option.connector === injected) {
        // don't show injected if there's no injected provider
        if (!(window.web3 || window.ethereum)) {
          if (option.name === 'MetaMask') {
            return (
              <Option
                id={`connect-${key}`}
                key={key}
                color={'#E8831D'}
                header={'Install Metamask'}
                subheader={null}
                link={'https://metamask.io/'}
                icon={MetamaskIcon}
              />
            );
          } else {
            return null; //dont want to return install twice
          }
        }
        // don't return metamask if injected provider isn't metamask
        else if (option.name === 'MetaMask' && !isMetamask) {
          return null;
        }
        // likewise for generic
        else if (option.name === 'Injected' && isMetamask) {
          return null;
        }
      }

      // return rest of options
      return (
        !isMobile &&
        !option.mobileOnly && (
          <Option
            id={`connect-${key}`}
            onClick={() => {
              if (termAndConditionsAccepted !== true) {
                setWarning(true);
                return;
              }

              option.connector === connector
                ? setWalletView(WALLET_VIEWS.ACCOUNT)
                : !option.href && tryActivation(option.connector);
            }}
            key={key}
            active={option.connector === connector}
            color={option.color}
            link={option.href}
            header={option.name}
            subheader={null} //use option.descriptio to bring back multi-line
            icon={require('../../assets/images/' + option.iconName)}
          />
        )
      );
    });
  }

  function getModalContent(): {} {
    if (error) {
      return (
        <>
          <Styled.HeaderRow>
            {error instanceof UnsupportedChainIdError ? 'Wrong Network' : 'Error connecting'}
          </Styled.HeaderRow>
          <Styled.ContentWrapper>
            {error instanceof UnsupportedChainIdError ? (
              <h5>Please connect to the appropriate Ethereum network.</h5>
            ) : (
              'Error connecting. Try refreshing the page.'
            )}
          </Styled.ContentWrapper>
        </>
      );
    }
    if (account && user && walletView === WALLET_VIEWS.ACCOUNT) {
      switch (user.role) {
        case UserRoles.distributor:
          return (
            <Distributor
              ENSName={ENSName}
              openOptions={() => setWalletView(WALLET_VIEWS.OPTIONS)}
            />
          );
        case UserRoles.ambassador:
          return (
            <Ambassador ENSName={ENSName} openOptions={() => setWalletView(WALLET_VIEWS.OPTIONS)} />
          );
        case UserRoles.client:
          return (
            <Owner ENSName={ENSName} openOptions={() => setWalletView(WALLET_VIEWS.OPTIONS)} />
          );
        default:
          return (
            <Owner ENSName={ENSName} openOptions={() => setWalletView(WALLET_VIEWS.OPTIONS)} />
            /*<Styled.NoUser>
              <WarningBlock
                title={'Login failed'}
                content={() => <div>Something went wrong.</div>}
                bottomContent={() => <div>Please refresh the page and try again.</div>}
              />
            </Styled.NoUser>*/
          );
      }
    } else if (account && !user && walletView === WALLET_VIEWS.ACCOUNT) {
      return (
        <>
          <Styled.HeaderRow>Sorry, we couldn't load user info</Styled.HeaderRow>
          <Styled.ContentWrapper>account - {account}</Styled.ContentWrapper>
        </>
      );
    }
    return (
      <>
        {walletView !== WALLET_VIEWS.ACCOUNT ? (
          <Styled.HeaderRow color="blue">
            <Styled.HoverText
              onClick={() => {
                setPendingError(false);
                setWalletView(WALLET_VIEWS.ACCOUNT);
              }}
            >
              Back
            </Styled.HoverText>
          </Styled.HeaderRow>
        ) : (
          <Styled.HeaderRow>
            <Styled.HoverText>Connect to a wallet</Styled.HoverText>
          </Styled.HeaderRow>
        )}
        <Styled.ContentWrapper>
          <Styled.TermsRow>
            <label>
              <input
                name="isGoing"
                type="checkbox"
                checked={termAndConditionsAccepted}
                onChange={event => {
                  if (event.target.checked) {
                    setWarning(false);
                  }
                  setTermAndConditionsAccepted(event.target.checked);
                }}
              />
              <span>
                <b>
                  I accept {'  '}
                  <DocLink
                    title="Terms of Use"
                    href={window['env'].REACT_APP_PUBLIC_URL + '/docs/EmiSwap_Terms_of_Use.pdf'}
                  />
                  {'  '} and {'  '}
                  <DocLink
                    title="Privacy Policy"
                    href={window['env'].REACT_APP_PUBLIC_URL + '/docs/EmiSwap_Privacy_Policy.pdf'}
                  />
                </b>
              </span>
            </label>
          </Styled.TermsRow>
          {warning ? (
            <Styled.WarningRow>Please accept terms and conditions first</Styled.WarningRow>
          ) : (
            ''
          )}

          {walletView === WALLET_VIEWS.PENDING ? (
            <PendingView
              connector={pendingWallet}
              error={pendingError}
              setPendingError={setPendingError}
              tryActivation={tryActivation}
            />
          ) : (
            <Styled.OptionGrid>{getOptions(termAndConditionsAccepted)}</Styled.OptionGrid>
          )}
          {walletView !== WALLET_VIEWS.PENDING && (
            <Styled.Blurb>
              <span>New to Ethereum? &nbsp;</span>{' '}
              <ExternalLink href="https://ethereum.org/use/#3-what-is-a-wallet-and-which-one-should-i-use">
                Learn more about wallets
              </ExternalLink>
            </Styled.Blurb>
          )}
        </Styled.ContentWrapper>
      </>
    );
  }

  return (
    <WalletCustomModal
      isOpen={walletModalOpen}
      onDismiss={toggleWalletModal}
      minHeight={null}
      maxHeight={90}
      maxWidth={720}
    >
      <Styled.Wrapper tabIndex={0}>
        <Styled.UpperSection>
          <Styled.CloseIcon onClick={toggleWalletModal}>
            <Styled.CloseColor />
          </Styled.CloseIcon>
          {getModalContent()}
        </Styled.UpperSection>
      </Styled.Wrapper>
    </WalletCustomModal>
  );
};

export default WalletModal;
