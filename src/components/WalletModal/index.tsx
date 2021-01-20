import React, { useState, useEffect } from 'react';
import ReactGA from 'react-ga';
import DocLink from '../../components/DocLink';
import styled from 'styled-components';
import { isMobile } from 'react-device-detect';
import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core';
import usePrevious from '../../hooks/usePrevious';
import { useWalletModalOpen, useWalletModalToggle } from '../../state/application/hooks';

import Modal from '../Modal';
import AccountDetails from '../AccountDetails';
import PendingView from './PendingView';
import Option from './Option';
import { SUPPORTED_WALLETS } from '../../constants';
import { ExternalLink } from '../../theme';
import MetamaskIcon from '../../assets/images/metamask.png';
import { ReactComponent as Close } from '../../assets/images/x.svg';
import { injected, fortmatic, portis } from '../../connectors';
import { OVERLAY_READY } from '../../connectors/Fortmatic';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { Distributor } from '../AccountDetails/Distributor'

const CloseIcon = styled.div`
  position: absolute;
  top: 30px;
  right: 30px;
  &:hover {
    cursor: pointer;
    opacity: 0.6;
  }

  ${({ theme }) => theme.mediaWidth.upToMedium`
    top: 14px;
    right: 16px;
  `};
`;

const CloseColor = styled(Close)`
  path {
    stroke: ${({ theme }) => theme.text4};
  }
`;

const Wrapper = styled.div`
  ${({ theme }) => theme.flexColumnNoWrap}
  margin: 0;
  padding: 0;
  width: 100%;
`;

const HeaderRow = styled.div`
  ${({ theme }) => theme.flexRowNoWrap};
  padding: 34px 30px;
  font-weight: 500;
  color: ${props => (props.color === 'blue' ? ({ theme }) => theme.green5 : 'inherit')};
  ${({ theme }) => theme.mediaWidth.upToMedium`
    padding: 1rem;
  `};
`;

const ContentWrapper = styled.div`
  background-color: ${({ theme }) => theme.bg2};
  padding: 2rem;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;

  ${({ theme }) => theme.mediaWidth.upToMedium`padding: 1rem`};
`;

const UpperSection = styled.div`
  position: relative;

  h5 {
    margin: 0;
    margin-bottom: 0.5rem;
    font-size: 1rem;
    font-weight: 400;
  }

  h5:last-child {
    margin-bottom: 0px;
  }

  h4 {
    margin-top: 0;
    font-weight: 500;
  }
`;

const Blurb = styled.div`
  ${({ theme }) => theme.flexRowNoWrap}
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 2rem;
  ${({ theme }) => theme.mediaWidth.upToMedium`
    margin: 1rem;
    font-size: 12px;
  `};
`;

const OptionGrid = styled.div`
  display: grid;
  grid-gap: 10px;
  ${({ theme }) => theme.mediaWidth.upToMedium`
    grid-template-columns: 1fr;
    grid-gap: 10px;
  `};
`;

const HoverText = styled.div`
  :hover {
    cursor: pointer;
  }
`;

const TermsRow = styled.div`
  margin-bottom: 10px;
  display: flex;
  justify-content: center;
`;

const WarningRow = styled.div`
  margin-bottom: 15px;
  color: ${({ theme }) => theme.red1};
  display: flex;
  justify-content: center;
`;

const WALLET_VIEWS = {
  OPTIONS: 'options',
  OPTIONS_SECONDARY: 'options_secondary',
  ACCOUNT: 'account',
  PENDING: 'pending',
};

export default function WalletModal({
  pendingTransactions,
  confirmedTransactions,
  ENSName,
}: {
  pendingTransactions: string[]; // hashes of pending
  confirmedTransactions: string[]; // hashes of confirmed
  ENSName?: string;
}) {
  // important that these are destructed from the account-specific web3-react context
  const { active, account, connector, activate, error } = useWeb3React();

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
    if (walletModalOpen) {
      setPendingError(false);
      setWalletView(WALLET_VIEWS.ACCOUNT);
    }
  }, [walletModalOpen]);

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

  const tryActivation = async connector => {
    let name = '';
    Object.keys(SUPPORTED_WALLETS).map(key => {
      if (connector === SUPPORTED_WALLETS[key].connector) {
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

    activate(connector, undefined, true).catch(error => {
      if (error instanceof UnsupportedChainIdError) {
        activate(connector); // a little janky...can't use setError because the connector isn't set
      } else {
        setPendingError(true);
      }
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
        <UpperSection>
          <CloseIcon onClick={toggleWalletModal}>
            <CloseColor />
          </CloseIcon>
          <HeaderRow>
            {error instanceof UnsupportedChainIdError ? 'Wrong Network' : 'Error connecting'}
          </HeaderRow>
          <ContentWrapper>
            {error instanceof UnsupportedChainIdError ? (
              <h5>Please connect to the appropriate Ethereum network.</h5>
            ) : (
              'Error connecting. Try refreshing the page.'
            )}
          </ContentWrapper>
        </UpperSection>
      );
    }
    if (account && walletView === WALLET_VIEWS.ACCOUNT) {
      const role = 'distributor'
      if (
        role === 'distributor'
      // false
      ) {
         return (
           <Distributor
             ENSName={ENSName}
             openOptions={() => setWalletView(WALLET_VIEWS.OPTIONS)}
           />
         )

      }
      return (
        <AccountDetails
          toggleWalletModal={toggleWalletModal}
          pendingTransactions={pendingTransactions}
          confirmedTransactions={confirmedTransactions}
          ENSName={ENSName}
          openOptions={() => setWalletView(WALLET_VIEWS.OPTIONS)}
        />
      );
    }
    return (
      <UpperSection>
        <CloseIcon onClick={toggleWalletModal}>
          <CloseColor />
        </CloseIcon>
        {walletView !== WALLET_VIEWS.ACCOUNT ? (
          <HeaderRow color="blue">
            <HoverText
              onClick={() => {
                setPendingError(false);
                setWalletView(WALLET_VIEWS.ACCOUNT);
              }}
            >
              Back
            </HoverText>
          </HeaderRow>
        ) : (
          <HeaderRow>
            <HoverText>Connect to a wallet</HoverText>
          </HeaderRow>
        )}
        <ContentWrapper>
          <TermsRow>
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
                    href={window['env'].PUBLIC_URL + '/docs/EmiSwap_Terms_of_Use.pdf'}
                  />
                  {'  '} and {'  '}
                  <DocLink
                    title="Privacy Policy"
                    href={window['env'].PUBLIC_URL + '/docs/EmiSwap_Privacy_Policy.pdf'}
                  />
                </b>
              </span>
            </label>
          </TermsRow>
          {warning ? <WarningRow>Please accept terms and conditions first</WarningRow> : ''}

          {walletView === WALLET_VIEWS.PENDING ? (
            <PendingView
              connector={pendingWallet}
              error={pendingError}
              setPendingError={setPendingError}
              tryActivation={tryActivation}
            />
          ) : (
            <OptionGrid>{getOptions(termAndConditionsAccepted)}</OptionGrid>
          )}
          {walletView !== WALLET_VIEWS.PENDING && (
            <Blurb>
              <span>New to Ethereum? &nbsp;</span>{' '}
              <ExternalLink href="https://ethereum.org/use/#3-what-is-a-wallet-and-which-one-should-i-use">
                Learn more about wallets
              </ExternalLink>
            </Blurb>
          )}
        </ContentWrapper>
      </UpperSection>
    );
  }

  return (
    <Modal
      isOpen={walletModalOpen}
      onDismiss={toggleWalletModal}
      minHeight={null}
      maxHeight={90}
      maxWidth={720}
    >
      <Wrapper>
        {getModalContent()}
      </Wrapper>
    </Modal>
  );
}
