import React, { useCallback, useContext, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled, { ThemeContext } from 'styled-components';
import { useTranslation } from 'react-i18next';
import { Text } from 'rebass';
import { Token } from '@uniswap/sdk';
import { useActiveWeb3React } from '../../hooks';
import { useAllCoinBalances } from '../../state/wallet/hooks';
import { AppDispatch } from '../../state';
import { clearAllTransactions } from '../../state/transactions/actions';
import { shortenAddress, getEtherscanLink } from '../../utils';
import { AutoRow } from '../Row';
import Copy from './Copy';
import Transaction from './Transaction';

import { SUPPORTED_WALLETS } from '../../constants';
import { ReactComponent as Close } from '../../assets/images/x.svg';
import { injected, walletconnect, walletlink, fortmatic, portis } from '../../connectors';
import CoinbaseWalletIcon from '../../assets/images/coinbaseWalletIcon.svg';
import WalletConnectIcon from '../../assets/images/walletConnectIcon.svg';
import FortmaticIcon from '../../assets/images/fortmaticIcon.png';
import PortisIcon from '../../assets/images/portisIcon.png';
import Identicon from '../Identicon';
import { ButtonPrimary, ButtonSecondary } from '../Button';
import CurrencyList from './CurrencyList';
import { ExternalLink as LinkIcon } from 'react-feather';
import { ExternalLink, LinkStyledButton, TYPE } from '../../theme';
import { useAllCoins } from '../../hooks/Coins';
import TotalEarnDividends from './TotalEarnDividends';
import SourcesList from './SourcesList';

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
    margin-bottom: 0px;
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

const AccountGroupingInfoRow = styled.div`
  ${({ theme }) => theme.flexRowNoWrap};
  flex-direction: row;
  border-right: 1px solid #edeef2;
  padding: 0.5rem 1rem;
  justify-content: space-between;
  flex: 1 1 auto;
`;

const AccountGroupingInfoColumn = styled.div`
  ${({ theme }) => theme.flexRowNoWrap};
  flex-direction: column;
  border-right: 1px solid #edeef2;
  padding: 0.5rem 1rem;
  flex: 1 1 auto;
  div {
    ${({ theme }) => theme.flexRowNoWrap};
    justify-content: space-between;
    flex: 1 1 auto;
  }
`;

const AccountGroupingInfoTitleRow = styled.div`
  flex: 1;
  justify-content: center;
  font-weight: 600;
  border-right: 1px solid #edeef2;
  padding: 0.5rem 0.5rem 0.5rem 1rem;
`;

const AccountSectionHeader = styled(AccountGroupingRow)`
  margin-bottom: 0.5rem;
  justify-content: center;
`;

const AccountSectionBody = styled.div`
  display: grid;
  margin-bottom: 1.5rem;
  border: 1px solid ${({ theme }) => theme.bg3};
  border-radius: 20px;
  font-size: 0.825rem;
  color: ${({ theme }) => theme.text3};
  > div:first-of-type > div > div > span:first-of-type {
    display: inline;
  }
`;

const Divider = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.bg3};
`;

const AccountSectionBodyPart = styled.div`
  display: flex;
  flex-wrap: wrap;
  position: relative;
  flex-direction: row;
  ${({ theme }) => theme.mediaWidth.upToMedium`
    flex-direction: column;
  `};
`;

const AccountSectionTable = styled.div`
  display: flex;
  flex: 5;
  flex-wrap: wrap;
  position: relative;
  flex-direction: row;
  > div {
    ${({ theme }) => theme.flexRowNoWrap};
    justify-content: space-between;
    flex: 1;
    flex-grow: 1;
    padding: 0.5em 0.25em;
    overflow: hidden;
    flex-direction: column;
    text-align: center;
    background-color: ${({ theme }) => theme.bg2};
    > span:first-of-type {
      display: none;
    }
  }
  ${({ theme }) => theme.mediaWidth.upToMedium`
    display: block;
    flex-direction: column;
    > div {
      width: 100% !important;
      flex-direction: row;
      justify-content: space-between;
      padding: 0.25em 0.5em;
      &:first-of-type {
        padding: 0.5em 0.5em 0.25em;
      }
      &:last-of-type {
        padding: 0.25em 0.5em 0.5em;
      }
      > span:first-of-type {
        display: inline;
      }
    }
  `};
`;

const AccountButtonSecondary = styled(ButtonSecondary)`
  width: fit-content;
  font-size: 0.825rem;
  padding: 4px 6px;
  margin-top: 1rem;
  :hover {
    cursor: pointer;
    text-decoration: none;
  }
`;

const AccountFooter = styled(AutoRow)`
  flex-wrap: nowrap;
`;

const AccountFooterText = styled(Text)`
  white-space: nowrap;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
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
  font-size: 0.825rem;
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

const IconWrapper = styled.div<{ size?: number }>`
  ${({ theme }) => theme.flexColumnNoWrap};
  align-items: center;
  justify-content: center;
  margin-right: 8px;
  & > img,
  span {
    height: ${({ size }) => (size ? size + 'px' : '32px')};
    width: ${({ size }) => (size ? size + 'px' : '32px')};
  }
  ${({ theme }) => theme.mediaWidth.upToMedium`
    align-items: flex-end;
  `};
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

const MainWalletAction = styled(WalletAction)`
  color: ${({ theme }) => theme.primary1};
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
  const [selectedCurrencies, onSelectCurrencies] = useState<Token[]>([]);
  const { chainId, account, connector } = useActiveWeb3React();
  const theme = useContext(ThemeContext);
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();
  const allTokens = useAllCoins();
  const allTokenBalances = useAllCoinBalances();

  function formatConnectorName() {
    const { ethereum } = window;
    const isMetaMask = !!(ethereum && ethereum.isMetaMask);
    const name = Object.keys(SUPPORTED_WALLETS)
      .filter(
        k =>
          SUPPORTED_WALLETS[k].connector === connector &&
          (connector !== injected || isMetaMask === (k === 'METAMASK')),
      )
      .map(k => SUPPORTED_WALLETS[k].name)[0];
    return <WalletName>Connected with {name}</WalletName>;
  }

  function getStatusIcon() {
    if (connector === injected) {
      return (
        <IconWrapper size={16}>
          <Identicon />
        </IconWrapper>
      );
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
        <>
          <IconWrapper size={16}>
            <img src={PortisIcon} alt={''} />
            <MainWalletAction
              onClick={() => {
                portis.portis.showPortis();
              }}
            >
              Show Portis
            </MainWalletAction>
          </IconWrapper>
        </>
      );
    }
  }

  const clearAllTransactionsCallback = useCallback(
    (event: React.MouseEvent) => {
      event.preventDefault();
      dispatch(clearAllTransactions({ chainId }));
    },
    [dispatch, chainId],
  );

  const filteredTokens: Token[] = Object.values(allTokens);

  const handleSelectCurrencies = (currency: Token): void => {
    const isCurrencySelected: boolean = selectedCurrencies.some(
      ({ address }) => address === currency.address,
    );

    onSelectCurrencies(selectedCurrencies =>
      isCurrencySelected
        ? [...selectedCurrencies].filter(({ address }) => address !== currency.address)
        : [...selectedCurrencies, currency],
    );
  };

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
                {formatConnectorName()}
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
                        {getStatusIcon()}
                        <p> {ENSName}</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div>
                        {getStatusIcon()}
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

            <TotalEarnDividends />

            <SourcesList />

            <Text textAlign="center">{t('dividendPool')}</Text>
            <CurrencyList
              currencies={filteredTokens}
              selectedCurrencies={selectedCurrencies}
              allBalances={allTokenBalances}
              onCurrencySelect={handleSelectCurrencies}
            />
            <AccountFooter>
              <AccountButtonSecondary>
                <Text fontSize={16} fontWeight={450}>
                  {t('recountSelectedDividends')}
                </Text>
              </AccountButtonSecondary>
              <AccountFooterText textAlign="center" fontWeight={450} fontSize={14}>
                {t('lastCall')}:<br />
                25/09/2020
              </AccountFooterText>
            </AccountFooter>
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
