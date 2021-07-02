import React, { useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import styled, { css } from 'styled-components';
import { useTranslation } from 'react-i18next';
import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core';
import { darken } from 'polished';
import { Activity, X } from 'react-feather';

import { useActiveWeb3React } from '../../hooks';
import useENSName from '../../hooks/useENSName';
import { useWalletModalToggle } from '../../state/application/hooks';
import { TransactionDetails } from '../../state/transactions/reducer';
import { clearAllTransactions } from '../../state/transactions/actions';

import Identicon from '../Identicon';
import PortisIcon from '../../assets/images/portisIcon.png';
import WalletModal from '../WalletModal';
import { ButtonSecondary } from '../Button';
import FortmaticIcon from '../../assets/images/fortmaticIcon.png';
import WalletConnectIcon from '../../assets/images/walletConnectIcon.svg';
import CoinbaseWalletIcon from '../../assets/images/coinbaseWalletIcon.svg';
import { RowBetween } from '../Row';
import { shortenAddress } from '../../utils';
import { useAllTransactions } from '../../state/transactions/hooks';
import { NetworkContextName } from '../../constants';
import { fortmatic, injected, portis, walletconnect, walletlink } from '../../connectors';
import SingleLoader from '../Loader/SingleLoader';

const IconWrapper = styled.div<{ size?: number }>`
  ${({ theme }) => theme.flexColumnNoWrap};
  align-items: center;
  justify-content: center;
  & > * {
    height: ${({ size }) => (size ? size + 'px' : '32px')};
    width: ${({ size }) => (size ? size + 'px' : '32px')};
  }
`;

const CloseIcon = styled(X)<{ onClick: (event: React.MouseEvent) => void }>`
  cursor: pointer;
`;

const Web3StatusGeneric = styled(ButtonSecondary)`
  ${({ theme }) => theme.flexRowNoWrap}
  width: 240px;
  align-items: center;
  padding: 0.35rem 0.5rem;
  border-radius: 4px;
  cursor: pointer;
  user-select: none;
  height: 40px;

  @media screen and (max-width: 768px) {
    width: 100%;
  }

  :focus {
    outline: none;
  }

  > p {
    width: 50px;
  }
`;
const Web3StatusError = styled(Web3StatusGeneric)`
  background-color: ${({ theme }) => theme.red1};
  border: 1px solid ${({ theme }) => theme.red1};
  color: ${({ theme }) => theme.white};
  font-weight: 500;
  :hover,
  :focus {
    background-color: ${({ theme }) => darken(0.1, theme.red1)};
  }
`;

const Web3StatusConnect = styled(Web3StatusGeneric)<{ faded?: boolean }>`
  background-color: ${({ theme }) => theme.primary4};
  border: none;
  color: ${({ theme }) => theme.primaryText1};
  font-weight: 500;
  padding: 10px 12px;
  font-size: 13px;
  line-height: 19px;
  letter-spacing: 0.02em;

  :hover,
  :focus {
    border: 1px solid ${({ theme }) => darken(0.05, theme.primary4)};
    color: ${({ theme }) => theme.primaryText1};
  }

  ${({ faded }) =>
    faded &&
    css`
      background-color: transparent;
      border: 1px solid ${({ theme }) => theme.whiteTransparent};
      color: ${({ theme }) => theme.white};

      :hover,
      :focus {
        border-color: ${({ theme }) => theme.purple};
        background-color: transparent;
        color: ${({ theme }) => theme.white};
      }
    `}
`;

const Web3StatusConnected = styled(Web3StatusGeneric)<{ pending?: boolean }>`
  background-color: ${({ pending, theme }) => (pending ? theme.green5 : theme.purple)};
  border: 0 !important;
  color: ${({ theme }) => theme.white};
  font-weight: 500;
  :hover,
  :focus {
    background-color: ${({ pending, theme }) => (pending ? theme.green5 : theme.purple)};
    box-shadow: ${({ theme }) => theme.purpleBoxShadow};
  }
`;

const Text = styled.p`
  flex: 1 1 auto;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin: 0 0.5rem 0;
  width: fit-content;
  font-weight: 450;
`;

const NetworkIcon = styled(Activity)`
  margin-left: 0.25rem;
  margin-right: 0.5rem;
  width: 16px;
  height: 16px;
`;

// we want the latest one to come first, so return negative if a is after b
function newTranscationsFirst(a: TransactionDetails, b: TransactionDetails) {
  return b.addedTime - a.addedTime;
}

function recentTransactionsOnly(a: TransactionDetails) {
  return new Date().getTime() - a.addedTime < 86_400_000;
}

export default function Web3Status() {
  const { t } = useTranslation();
  const { active, account, connector, error } = useWeb3React();
  const { chainId } = useActiveWeb3React();
  const contextNetwork = useWeb3React(NetworkContextName);
  const dispatch = useDispatch();

  const { ENSName } = useENSName(account);

  const allTransactions = useAllTransactions();

  const sortedRecentTransactions = useMemo(() => {
    const txs = Object.values(allTransactions);
    return txs.filter(recentTransactionsOnly).sort(newTranscationsFirst);
  }, [allTransactions]);

  const clearAllTransactionsCallback = useCallback(
    (event: React.MouseEvent) => {
      event.stopPropagation();
      dispatch(clearAllTransactions({ chainId }));
    },
    [dispatch, chainId],
  );

  const pending = sortedRecentTransactions.filter(tx => !tx.receipt).map(tx => tx.hash);
  const confirmed = sortedRecentTransactions.filter(tx => tx.receipt).map(tx => tx.hash);

  const hasPendingTransactions = !!pending.length;
  // const hasSocks = useHasSocks()
  const toggleWalletModal = useWalletModalToggle();

  // handle the logo we want to show with the account
  function getStatusIcon() {
    if (connector === injected) {
      return <Identicon />;
    } else if (connector === walletconnect) {
      return (
        <IconWrapper size={16}>
          <img src={WalletConnectIcon} alt={''} />
        </IconWrapper>
      );
    } else if (connector === walletlink) {
      return (
        <IconWrapper size={16}>
          <img src={CoinbaseWalletIcon} alt={''} />
        </IconWrapper>
      );
    } else if (connector === fortmatic) {
      return (
        <IconWrapper size={16}>
          <img src={FortmaticIcon} alt={''} />
        </IconWrapper>
      );
    } else if (connector === portis) {
      return (
        <IconWrapper size={16}>
          <img src={PortisIcon} alt={''} />
        </IconWrapper>
      );
    }
  }

  function getWeb3Status() {
    if (account) {
      return (
        <Web3StatusConnected
          id="web3-status-connected"
          onClick={toggleWalletModal}
          pending={hasPendingTransactions}
        >
          {hasPendingTransactions ? (
            <RowBetween>
              <SingleLoader stroke="white" />
              <Text>{pending?.length} Pending</Text>
              <CloseIcon onClick={clearAllTransactionsCallback} />
            </RowBetween>
          ) : (
            <>
              {/*SOCK*/}
              <Text>{ENSName || shortenAddress(account)}</Text>
            </>
          )}
          {!hasPendingTransactions && getStatusIcon()}
        </Web3StatusConnected>
      );
    } else if (error) {
      return (
        <Web3StatusError onClick={toggleWalletModal}>
          <NetworkIcon />
          <Text>{error instanceof UnsupportedChainIdError ? 'Wrong Network' : 'Error'}</Text>
        </Web3StatusError>
      );
    } else {
      return (
        <Web3StatusConnect id="connect-wallet" onClick={toggleWalletModal} faded={!account}>
          <Text>{t('Connect to a Wallet')}</Text>
        </Web3StatusConnect>
      );
    }
  }

  if (!contextNetwork.active && !active) {
    return null;
  }

  return (
    <>
      {getWeb3Status()}
      <WalletModal
        ENSName={ENSName}
        pendingTransactions={pending}
        confirmedTransactions={confirmed}
      />
    </>
  );
}
