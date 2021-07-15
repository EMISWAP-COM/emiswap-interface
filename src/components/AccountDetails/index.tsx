import React, { useCallback, useContext } from 'react';
import { useDispatch } from 'react-redux';
import { ExternalLink as LinkIcon } from 'react-feather';
import styled, { ThemeContext } from 'styled-components';
import { useActiveWeb3React } from '../../hooks';
import { useAccountInfo } from '../../hooks/useAccountInfo';
import { AppDispatch } from '../../state';
import { clearAllTransactions } from '../../state/transactions/actions';
import { getEtherscanLink, shortenAddress } from '../../utils';
import { ButtonSecondary } from '../Button';
import { AutoRow } from '../Row';
import Copy from './Copy';
import Transaction from './Transaction';
import TotalEarnDividends from './TotalEarnDividends';
import SourcesList from './SourcesList';

import { injected, walletlink } from '../../connectors';
import { ReactComponent as Close } from '../../assets/images/x.svg';
import { ExternalLink, LinkStyledButton, TYPE } from '../../theme';
import { formatConnectorName } from './uitls';
import { StatusIcon } from './StatusIcon';

const HeaderRow = styled.div`
  ${({ theme }) => theme.flexRowNoWrap};
  padding: 1rem 1rem;
  font-weight: 450;
  color: ${props => (props.color === 'blue' ? ({ theme }) => theme.primary1 : 'inherit')};
  ${({ theme }) => theme.mediaWidth.upToMedium`
    padding: 1rem;
  `};
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
    margin-bottom: 0;
  }

  h4 {
    margin-top: 0;
    font-weight: 450;
  }
`;

const InfoCard = styled.div`
  padding: 1rem;
  border: 1px solid ${({ theme }) => theme.bg3};
  border-radius: 20px;
  position: relative;
  display: grid;
  grid-row-gap: 12px;
  margin-bottom: 20px;
`;

const AccountGroupingRow = styled.div`
  ${({ theme }) => theme.flexRowNoWrap};
  justify-content: space-between;
  align-items: center;
  font-weight: 400;
  color: ${({ theme }) => theme.text1};

  div {
    ${({ theme }) => theme.flexRowNoWrap}
    align-items: center;
  }
`;

const AccountSection = styled.div`
  background-color: ${({ theme }) => theme.bg1};
  overflow-y: scroll;
  max-height: calc(100vh - 200px);
`;

const YourAccount = styled.div`
  padding: 0 1rem 1.5rem;

  h5 {
    margin: 0 0 1rem 0;
    font-weight: 400;
  }

  h4 {
    margin: 0;
    font-weight: 450;
  }
`;

const LowerSection = styled.div`
  ${({ theme }) => theme.flexColumnNoWrap}
  padding: 1.5rem;
  flex-grow: 1;
  overflow: auto;
  background-color: ${({ theme }) => theme.bg2};

  h5 {
    margin: 0;
    font-weight: 400;
    color: ${({ theme }) => theme.text3};
  }
`;

const AccountControl = styled.div`
  display: flex;
  justify-content: space-between;
  min-width: 0;
  width: 100%;

  font-weight: 450;
  font-size: 1.25rem;

  a:hover {
    text-decoration: underline;
  }

  p {
    min-width: 0;
    margin: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

const AddressLink = styled(ExternalLink)<{ hasENS: boolean; isENS: boolean }>`
  font-size: 0.825rem;
  color: ${({ theme }) => theme.text3};
  margin-left: 1rem;
  display: flex;
  :hover {
    color: ${({ theme }) => theme.text2};
  }
`;

const CloseIcon = styled.div`
  position: absolute;
  right: 1rem;
  top: 14px;
  &:hover {
    cursor: pointer;
    opacity: 0.6;
  }
`;

const CloseColor = styled(Close)`
  path {
    stroke: ${({ theme }) => theme.text4};
  }
`;

const WalletName = styled.div`
  width: initial;
  font-size: 0.825rem;
  font-weight: 450;
  color: ${({ theme }) => theme.text3};
`;

const TransactionListWrapper = styled.div`
  ${({ theme }) => theme.flexColumnNoWrap};
`;

const WalletAction = styled(ButtonSecondary)`
  width: fit-content;
  font-weight: 400;
  margin-left: 8px;
  font-size: 0.825rem;
  padding: 4px 6px;
  :hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;

function renderTransactions(transactions) {
  return (
    <TransactionListWrapper>
      {transactions.map((hash, i) => {
        return <Transaction key={i} hash={hash} />;
      })}
    </TransactionListWrapper>
  );
}

interface AccountDetailsProps {
  toggleWalletModal: () => void;
  pendingTransactions: any[];
  confirmedTransactions: any[];
  ENSName?: string;
  openOptions: () => void;
}

export default function AccountDetails({
  toggleWalletModal,
  pendingTransactions,
  confirmedTransactions,
  ENSName,
  openOptions,
}: AccountDetailsProps) {
  const { chainId, account, connector } = useActiveWeb3React();
  const theme = useContext(ThemeContext);
  const dispatch = useDispatch<AppDispatch>();
  const {
    totalAcquired,
    totalAcquiredInDAI,
    availableToCollect,
    frozenTokens,
    nextUnlockAmount,
    nextUnlockDate,
    crowdSaleAcquired,
    crowdSaleAlreadyMinted,
    crowdSaleAvailableForMinting,
    crowdSaleReferralRewardAcquired,
    crowdSaleReferralRewardAlreadyMinted,
    crowdSaleReferralRewardAvailableForMinting,
  } = useAccountInfo();



  const clearAllTransactionsCallback = useCallback(
    (event: React.MouseEvent) => {
      event.preventDefault();
      dispatch(clearAllTransactions({ chainId }));
    },
    [dispatch, chainId],
  );

  return (
    <>
      <UpperSection>
        <CloseIcon onClick={toggleWalletModal}>
          <CloseColor />
        </CloseIcon>
        <HeaderRow>Account</HeaderRow>
        <AccountSection>
          <YourAccount>
            <InfoCard>
              <AccountGroupingRow>
                <WalletName>Connected with {formatConnectorName(connector)}</WalletName>
                <div>
                  {connector !== injected && connector !== walletlink && (
                    <WalletAction
                      style={{ fontSize: '.825rem', fontWeight: 400, marginRight: '8px' }}
                      onClick={() => {
                        (connector as any).close();
                      }}
                    >
                      Disconnect
                    </WalletAction>
                  )}
                  <WalletAction
                    style={{ fontSize: '.825rem', fontWeight: 400 }}
                    onClick={() => {
                      openOptions();
                    }}
                  >
                    Change
                  </WalletAction>
                </div>
              </AccountGroupingRow>
              <AccountGroupingRow id="web3-account-identifier-row">
                <AccountControl>
                  {ENSName ? (
                    <>
                      <div>
                        <StatusIcon connectorName={connector} />
                        <p> {ENSName}</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div>
                        <StatusIcon connectorName={connector} />
                        <p> {shortenAddress(account)}</p>
                      </div>
                    </>
                  )}
                </AccountControl>
              </AccountGroupingRow>
              <AccountGroupingRow>
                {ENSName ? (
                  <>
                    <AccountControl>
                      <div>
                        <Copy toCopy={account}>
                          <span style={{ marginLeft: '4px' }}>Copy Address</span>
                        </Copy>
                        <AddressLink
                          hasENS={!!ENSName}
                          isENS={true}
                          href={getEtherscanLink(chainId, ENSName, 'address')}
                        >
                          <LinkIcon size={16} />
                          <span style={{ marginLeft: '4px' }}>View on Etherscan</span>
                        </AddressLink>
                      </div>
                    </AccountControl>
                  </>
                ) : (
                  <>
                    <AccountControl>
                      <div>
                        <Copy toCopy={account}>
                          <span style={{ marginLeft: '4px' }}>Copy Address</span>
                        </Copy>
                        <AddressLink
                          hasENS={!!ENSName}
                          isENS={false}
                          href={getEtherscanLink(chainId, account, 'address')}
                        >
                          <LinkIcon size={16} />
                          <span style={{ marginLeft: '4px' }}>View on Etherscan</span>
                        </AddressLink>
                      </div>
                    </AccountControl>
                  </>
                )}
                {/* {formatConnectorName()} */}
              </AccountGroupingRow>
            </InfoCard>
            <SourcesList
              totalAcquired={totalAcquired}
              totalAcquiredInDAI={totalAcquiredInDAI}
              crowdSaleAcquired={crowdSaleAcquired}
              crowdSaleAlreadyMinted={crowdSaleAlreadyMinted}
              crowdSaleAvailableForMinting={crowdSaleAvailableForMinting}
              crowdSaleReferralRewardAcquired={crowdSaleReferralRewardAcquired}
              crowdSaleReferralRewardAlreadyMinted={crowdSaleReferralRewardAlreadyMinted}
              crowdSaleReferralRewardAvailableForMinting={
                crowdSaleReferralRewardAvailableForMinting
              }
            />
            <TotalEarnDividends
              availableToCollect={availableToCollect}
              frozenTokens={frozenTokens}
              nextUnlockAmount={nextUnlockAmount}
              nextUnlockDate={nextUnlockDate}
            />
          </YourAccount>
          {!!pendingTransactions.length || !!confirmedTransactions.length ? (
            <LowerSection>
              <AutoRow mb={'1rem'} style={{ justifyContent: 'space-between' }}>
                <TYPE.body>Recent Transactions</TYPE.body>
                <LinkStyledButton onClick={clearAllTransactionsCallback}>
                  (clear all)
                </LinkStyledButton>
              </AutoRow>
              {renderTransactions(pendingTransactions)}
              {renderTransactions(confirmedTransactions)}
            </LowerSection>
          ) : (
            <LowerSection>
              <TYPE.body color={theme.text1}>Your transactions will appear here...</TYPE.body>
            </LowerSection>
          )}
        </AccountSection>
      </UpperSection>
    </>
  );
}
