import React from 'react';
import { convertBigDecimal, getWalletByConnector } from '../uitls';
import { Header, WalletAction } from '../styleds';
import styled from 'styled-components/macro';
import { useActiveWeb3React } from '../../../hooks';
import { getExplorerLink, shortenAddress } from '../../../utils';
import { useHistory } from 'react-router';
import { useWalletModalToggle } from '../../../state/application/hooks';
import { ExternalLink as LinkIcon } from 'react-feather';
import Copy from '../Copy';
import { ExternalLink } from '../../../theme';
import { useSelector } from 'react-redux';
import { AppState } from '../../../state';
import { darken } from 'polished';
import { ChangeAddress } from './ChangeAddress';
import { useIsKuCoinActive, useIsPolygonActive, useNetworkData } from '../../../hooks/Coins';
import { MessageTooltip } from '../../../base/ui';
import { css } from 'styled-components';
import { Balance as BalanceType } from '../../../state/cabinets/reducer';
import { ReactComponent as DropDown } from '../../../assets/images/dropdown.svg';
import { isMobile } from 'react-device-detect';
import { useCollectData } from '../Owner/hooks';
import QuestionHelper from '../../QuestionHelper';
import { RowBetween } from '../../Row';

const Container = styled.div`
  font-size: 13px;
  color: ${({ theme }) => theme.darkText};
  border: 1px solid ${({ theme }) => theme.darkGrey};
  border-radius: 12px;

  @media screen and (max-width: 1200px) {
    border-radius: 8px;
  }
`;

const Main = styled.div`
  padding: 20px;

  @media screen and (max-width: 1200px) {
    padding: 16px;
  }
`;

const DarkText = styled.span`
  color: ${({ theme }) => theme.white};
`;

const Account = styled(DarkText)`
  font-size: 18px;
`;

const Wallet = styled.div`
  display: flex;
  width: 100%;
  margin-top: 5px;
  margin-bottom: 5px;
`;

const BalanceWrapper = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  flex: 1;
`;

const BalanceItem = styled.div`
  flex: 1;
  flex-basis: 25%;
  padding: 14px;
  background: ${({ theme }) => theme.darkGrey};
`;

const BalanceValue = styled(DarkText)`
  font-size: 16px;
  font-weight: 600;
`;

const Options = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;

  @media screen and (max-width: 800px) {
    flex-direction: column-reverse;
    align-items: stretch;
  }
`;

const ActionBtn = styled(WalletAction)`
  height: 32px;
`;

const ChangeWalletMessageTooltip = styled(MessageTooltip)`
  max-width: 400px !important;

  &:before {
    display: none;
  }
`;

const CollectBtn = styled(ActionBtn)<{ inactive?: boolean }>`
  min-width: 180px;
  margin-bottom: 10px;

  &:hover,
  &:focus,
  &:active {
    background: ${({ theme, inactive }) => (inactive ? 'transparent' : theme.purple)} !important;
    box-shadow: none;
  }

  ${({ inactive }) =>
    inactive &&
    css`
      background-color: transparent !important;
      color: #615c69;
      cursor: auto;
      border: 1px solid rgb(97, 92, 105) !important;
      opacity: 1 !important;
      text-decoration: none !important;
    `}
`;

const AccountControl = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 53px;
  font-weight: 400;
  font-size: 1.25rem;
  background: ${({ theme }) => theme.darkGrey};

  a:hover {
    text-decoration: underline;
  }

  padding: 20px;

  @media screen and (max-width: 1200px) {
    padding: 16px;
  }

  button {
    padding: 0;

    span {
      margin-left: 0;
    }
  }
`;

const AddressLink = styled(ExternalLink)`
  font-size: 0.825rem;
  color: ${({ theme }) => theme.blue};
  margin-left: 1rem;
  display: flex;

  :hover {
    color: ${({ theme }) => darken(0.3, theme.blue)};
  }
`;

const ButtonText = styled.span`
  white-space: nowrap;
  padding-right: 0.2rem;
`;

const WalletImg = styled.img`
  display: block;
  height: 24px;
`;

const DropdownBlock = styled.div`
  display: flex;
  align-items: center;
  padding: 4px 8px;
  border-radius: 16px;
  cursor: pointer;

  :hover {
    background: #272530;
  }
`;

export const StyledDropDown = styled(DropDown)`
  margin: 0 0.25rem 0 0.5rem;
  height: 35%;

  path {
    stroke: ${({ theme }) => theme.white};
    stroke-width: 1.5px;
  }
`;

interface BalanceItemInterface {
  label: string;
  value: string;
}

const Item = ({ label, value }: BalanceItemInterface) => (
  <BalanceItem>
    <span>{label}</span>
    <div>
      <BalanceValue>{value}</BalanceValue>&nbsp;ESW
    </div>
  </BalanceItem>
);

interface BalanceInterface {
  total: string;
  wallet: string;
  locked: string;
  avalible: string;
  requested: string;
  veryFirstRequestDate: string;
  children?: React.ReactNode;
  handleClaim: () => void;
  isPolygon?: boolean;
  handleRequest: () => void;
}

const Balance = ({
  total,
  wallet,
  locked,
  avalible,
  children,
  handleClaim,
  handleRequest,
  requested,
  veryFirstRequestDate,
}: BalanceInterface) => {
  const isPolygon = useIsPolygonActive();
  const isRequested = requested !== '0.0';
  return (
    <>
      <BalanceWrapper>
        <BalanceWrapper>
          <Item label="Total" value={total} />
          <Item label="Wallet" value={wallet} />
          <Item label="Locked at Emiswap" value={locked} />
          <Item label="Available to collect" value={avalible} />
          <BalanceItem>
            <RowBetween>
              <span>
                Request
                {isRequested && (
                  <>
                    <span>&nbsp;on&nbsp;</span>
                    <DarkText>{veryFirstRequestDate}</DarkText>
                  </>
                )}
              </span>
              <QuestionHelper text="Click the Collect to my wallet button to see more details" />
            </RowBetween>
            <div>
              <BalanceValue>{requested}</BalanceValue>&nbsp;ESW
            </div>
          </BalanceItem>
        </BalanceWrapper>
      </BalanceWrapper>
      <Options>
        {children}
        {isPolygon ? (
          <RemainderButton handleClaim={handleClaim} handleRequest={handleRequest} />
        ) : (
          <CollectBtn inactive>To collect your ESW tokens switch to Polygon</CollectBtn>
        )}
      </Options>
    </>
  );
};

const RemainderButton = ({
  handleRequest,
  handleClaim,
}: {
  handleClaim: () => void;
  handleRequest: () => void;
}) => {
  return (
    <CollectBtn onClick={handleClaim}>
      <ButtonText>Сollect to my wallet</ButtonText>
    </CollectBtn>
  );
};

const sumESW = (currency: string, balance: BalanceType) => {
  const walletESW = balance?.wallet[currency] || 0;
  const availableESW = balance?.available[currency] || 0;
  const lockedESW = balance?.total.locked[currency] || 0;

  const sum = Number(walletESW) + Number(availableESW) + Number(lockedESW);

  return convertBigDecimal(sum.toString());
};

interface Props {
  ENSName?: string;
  openOptions: () => void;
  changeCollectButtonState?: (value: string) => void;
}

export const Connection: React.FC<Props> = ({
  openOptions,
  ENSName,
  children,
  changeCollectButtonState,
}) => {
  const { chainId, account, connector } = useActiveWeb3React();
  const { blockExplorerName, value: network } = useNetworkData();

  const history = useHistory();
  const toggle = useWalletModalToggle();
  const balance = useSelector((state: AppState) => state.cabinets.totalBalance);
  const collectData = useCollectData(false);

  const isKuCoinActive = useIsKuCoinActive();
  /*const isShidenActive = useIsShidenActive();
  const isAvalanceActive = useIsAvalancheActive();*/

  const isEnableChangeWallet = !isKuCoinActive;
  const isCollectDisabled = true || !Number(balance?.available.ESW);

  const wallet = getWalletByConnector(connector);

  return (
    <>
      <Container>
        <AccountControl>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {wallet ? (
              <ChangeWalletMessageTooltip
                disableTooltip={isEnableChangeWallet}
                whiteSpace={'normal'}
                position={{ top: '4px', left: '20px' }}
                text="Only Metamask wallet is supported. You need to change the address inside the Metamask wallet."
              >
                <DropdownBlock
                  onClick={() => {
                    if (!isEnableChangeWallet) {
                      return;
                    }
                    openOptions();
                  }}
                >
                  <WalletImg src={require('../../../assets/images/' + wallet.iconName)} />
                  <StyledDropDown />
                </DropdownBlock>
              </ChangeWalletMessageTooltip>
            ) : null}
            <Wallet>
              <ChangeAddress openOptions={openOptions}>
                <DropdownBlock>
                  <Account>{ENSName || shortenAddress(account)}</Account>
                  <StyledDropDown />
                </DropdownBlock>
              </ChangeAddress>
            </Wallet>
            <div style={{ marginLeft: '8px' }}>
              <Copy toCopy={account} size={isMobile ? 24 : 16} />
            </div>
          </div>
          <AddressLink href={getExplorerLink(chainId, ENSName || account, 'address')}>
            <LinkIcon size={isMobile ? 24 : 16} />
            {!isMobile && <span style={{ marginLeft: '4px' }}>View on {blockExplorerName}</span>}
          </AddressLink>
        </AccountControl>
        <Main>
          {/*<WalletInfo>
            <ChangeActionsBlock>
              <ChangeAddress openOptions={openOptions} />
              <ChangeWalletMessageTooltip
                disableTooltip={isEnableChangeWallet}
                whiteSpace={'normal'}
                position={{ top: '4px', left: '284px' }}
                text="Only Metamask wallet is supported. You need to change the address inside the Metamask wallet."
              >
                <ChangeWalletBtn
                  inactive={!isEnableChangeWallet}
                  onClick={() => {
                    if (!isEnableChangeWallet) {
                      return;
                    }
                    openOptions();
                  }}
                >
                  Change wallet
                </ChangeWalletBtn>
              </ChangeWalletMessageTooltip>
            </ChangeActionsBlock>
          </WalletInfo>*/}
          <Header style={{ marginTop: 4 }}>Your rewards from all networks</Header>
          <Balance
            total={sumESW('ESW', balance)}
            wallet={convertBigDecimal(balance?.wallet.ESW)}
            locked={convertBigDecimal(balance?.total.locked.ESW)}
            avalible={convertBigDecimal(balance?.available.ESW)}
            requested={collectData?.requested}
            veryFirstRequestDate={collectData?.veryFirstRequestDate}
            handleRequest={() => changeCollectButtonState('request')}
            handleClaim={() => {
              changeCollectButtonState('wallet');

              if (isCollectDisabled) {
                return;
              }

              toggle();
              history.push(`/claim/${network}`);
            }}
          >
            {children}
          </Balance>
        </Main>
      </Container>
    </>
  );
};
