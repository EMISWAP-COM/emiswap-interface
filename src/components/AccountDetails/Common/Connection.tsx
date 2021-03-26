import React from 'react';
import { convertBigDecimal, formatConnectorName } from '../uitls';
import { WalletAction } from '../styleds';
import styled from 'styled-components/macro';
import { useActiveWeb3React } from '../../../hooks';
import { StatusIcon } from '../StatusIcon';
import { getEtherscanLink, shortenAddress } from '../../../utils';
import { useHistory } from 'react-router';
import { useWalletModalToggle } from '../../../state/application/hooks';
import { ExternalLink as LinkIcon } from 'react-feather';
import Copy from '../Copy';
import { ExternalLink } from '../../../theme';
import { useSelector } from 'react-redux';
import { AppState } from '../../../state';

const Container = styled.div`
  font-size: 13px;
  color: ${({ theme }) => theme.grey6};
  border: 1px solid #dbdede;
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
  color: ${({ theme }) => theme.grey3};
`;

const Account = styled(DarkText)`
  font-size: 22px;
`;

const WalletInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Wallet = styled.div`
  margin-top: 5px;
  display: flex;
`;
const BalanceWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 12px;

  @media screen and (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 8px;
  }
`;

const BalanceItem = styled.div`
  padding: 14px;
  background: #f7f8fa;
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
const CollectBtn = styled(ActionBtn)`
  min-width: 180px;
  margin-bottom: 10px;
`;

const AccountControl = styled.div`
  display: flex;
  height: 53px;
  font-weight: 450;
  font-size: 1.25rem;
  background: #f7f8fa;

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
  color: ${({ theme }) => theme.text3};
  margin-left: 1rem;
  display: flex;
  :hover {
    color: ${({ theme }) => theme.text2};
  }
`;

interface Props {
  ENSName?: string;
  openOptions: () => void;
}

export const Connection: React.FC<Props> = ({ openOptions, ENSName, children }) => {
  const { chainId, account, connector } = useActiveWeb3React();

  const balance = useSelector((state: AppState) => state.cabinets.balance);

  const history = useHistory();
  const toggle = useWalletModalToggle();

  const handleClaim = () => {
    toggle();
    history.push('/claim/ESW');
  };

  return (
    <>
      <Container>
        <Main>
          <WalletInfo>
            <span>
              Connected with <DarkText>{formatConnectorName(connector)}</DarkText>
            </span>
            <ActionBtn
              onClick={() => {
                openOptions();
              }}
            >
              Change
            </ActionBtn>
          </WalletInfo>
          <Wallet>
            <StatusIcon connectorName={connector} />
            <Account>{ENSName || shortenAddress(account)}</Account>
          </Wallet>
          <BalanceWrapper>
            <BalanceItem>
              <span>Total</span>
              <div>
                <BalanceValue>{convertBigDecimal(balance?.amount)}</BalanceValue>&nbsp;ESW
              </div>
            </BalanceItem>
            <BalanceItem>
              <span>Wallet</span>
              <div>
                <BalanceValue>{convertBigDecimal(balance?.wallet_balance)}</BalanceValue>&nbsp;ESW
              </div>
            </BalanceItem>
            <BalanceItem>
              <span>Locked at Emiswap </span>
              <div>
                <BalanceValue>{convertBigDecimal(balance?.locked)}</BalanceValue>&nbsp;ESW
              </div>{' '}
            </BalanceItem>
            <BalanceItem>
              <span>Available to collect</span>
              <div>
                <BalanceValue>{convertBigDecimal(balance?.available)}</BalanceValue>&nbsp;ESW
              </div>{' '}
            </BalanceItem>
          </BalanceWrapper>
          <Options>
            {children}
            <CollectBtn onClick={handleClaim}>Collect to my wallet</CollectBtn>
          </Options>
        </Main>
        <AccountControl>
          <Copy toCopy={account}>
            <span style={{ marginLeft: '4px' }}>Copy Address</span>
          </Copy>
          <AddressLink href={getEtherscanLink(chainId, ENSName || account, 'address')}>
            <LinkIcon size={16} />
            <span style={{ marginLeft: '4px' }}>View on Etherscan</span>
          </AddressLink>
        </AccountControl>
      </Container>
    </>
  );
};