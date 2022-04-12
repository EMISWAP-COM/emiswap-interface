import ReactPixel from 'react-facebook-pixel';
import { isMobile } from 'react-device-detect';
import React, { useEffect } from 'react';
import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core';
import usePrevious from '../../hooks/usePrevious';
import { useNewWalletModalOpen, useNewWalletModalToggle } from '../../state/application/hooks';
import { SUPPORTED_WALLETS } from '../../constants';
import MetamaskIcon from '../../assets/images/metamask.png';
import { injected, portis } from '../../connectors';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { useActiveWeb3React } from '../../hooks';
import styled from 'styled-components';
import {
  changeWalletGA,
  confirmWalletGA,
  getConfirmGAEvent,
  getConnectGAEvent,
  successWalletGA,
} from '../WalletModal/gaEvents';
import Option from './Option';
import NewModal from '../NewModal';
import { toggleNewWalletModal } from '../../state/application/actions';
import { Box, Flex, Link, Text } from '../../ThemeProvider';
import CheckBox from '../../ui-kit/checkBox';

const WalletCustomModal = styled(NewModal)`
  overflow-y: visible !important;
`;

const WalletModal = () => {
  const { account, connector, activate } = useWeb3React();
  const { chainId } = useActiveWeb3React();

  const isWalletModalOpen = useNewWalletModalOpen();
  const toggleWalletModal = useNewWalletModalToggle();

  const previousAccount = usePrevious(account);
  useEffect(() => {
    if (account && !previousAccount && isWalletModalOpen) {
      toggleWalletModal();
    }
  }, [account, previousAccount, toggleWalletModal, isWalletModalOpen]);

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
    changeWalletGA(name);
    if (connector instanceof WalletConnectConnector && connector.walletConnectProvider?.wc?.uri) {
      connector.walletConnectProvider = undefined;
    }
    activate(connector, undefined, true)
      .then(() => {
        const confirmGAEvent = getConfirmGAEvent(name);
        if (confirmGAEvent) confirmGAEvent();
        confirmWalletGA();
        successWalletGA();
        ReactPixel.track('wallet_connect_success');
      })
      .catch(error => {
        if (error instanceof UnsupportedChainIdError) {
          activate(connector);
        }
      });
  };

  const [termAndConditionsAccepted, setTermAndConditionsAccepted] = useLocalStorage(
    'termAndConditionsAccepted',
    false,
  );

  function getMobileOption(option, key) {
    if (option.connector === portis) return null;
    if (!window.web3 && !window.ethereum && option.mobile) {
      return (
        <Option
          onClick={() => {
            if (termAndConditionsAccepted !== true) return;
            option.connector !== connector && !option.href && tryActivation(option.connector);
          }}
          key={key}
          header={option.name}
          icon={option.iconName}
        />
      );
    }
    return null;
  }

  function getNotMobileOption(option, key) {
    return (
      <Option
        onClick={() => {
          if (termAndConditionsAccepted !== true) return;
          option.connector !== connector && !option.href && tryActivation(option.connector);
          if (option.href) {
            window.location.replace(option.href);
          }
        }}
        key={key}
        header={option.name}
        icon={option.iconName}
      />
    );
  }

  function getInjectedOption(option, key) {
    const isMetamask = window.ethereum && window.ethereum.isMetaMask;
    if (!(window.web3 || window.ethereum)) {
      if (option.name === 'MetaMask') {
        return (
          <Option
            onClick={() => {
              window.location.replace('https://metamask.io/');
            }}
            key={key}
            header={'Install Metamask'}
            icon={MetamaskIcon}
          />
        );
      }
      return null;
    } else if (option.name === 'MetaMask' && !isMetamask) {
      return null;
    } else if (option.name === 'Injected' && isMetamask) {
      return null;
    }
  }

  function getOptions() {
    return Object.keys(SUPPORTED_WALLETS).map(key => {
      const option = SUPPORTED_WALLETS[key];
      if (option.unavailableNetworksIds.includes(chainId)) return null;
      if (isMobile) return getMobileOption(option, key);
      if (option.connector === injected) return getInjectedOption(option, key);
      return !isMobile && !option.mobileOnly && getNotMobileOption(option, key);
    });
  }

  return isWalletModalOpen ? (
    <WalletCustomModal onClose={toggleNewWalletModal}>
      <Box mt={-3}>{getOptions()}</Box>
      <Flex mt={4} alignItems="baseline">
        <Box pt={1}>
          <CheckBox
            type="checkbox"
            checked={termAndConditionsAccepted}
            onChange={() => setTermAndConditionsAccepted(!termAndConditionsAccepted)}
          />
        </Box>
        <Flex alignSelf="flex-start">
          <Text variant="mediumRubikRegular" color="disabled">
            I accept&nbsp;
            <Link variant="mediumRubikRegular" href="#">
              Terms of Use
            </Link>
            <br />
            &&nbsp;
            <Link variant="mediumRubikRegular" href="#">
              Privacy Policy
            </Link>
          </Text>
        </Flex>
      </Flex>
    </WalletCustomModal>
  ) : (
    <></>
  );
};

export default WalletModal;
