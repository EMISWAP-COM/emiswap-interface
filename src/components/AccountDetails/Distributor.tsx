import React from 'react'
import styled from 'styled-components'
import { ExternalLink, TYPE } from '../../theme'
import { injected, walletlink } from '../../connectors'
import { getEtherscanLink, shortenAddress } from '../../utils'
import { ExternalLink as LinkIcon } from 'react-feather'
import { ButtonSecondary } from '../Button'
import { formatConnectorName } from './uitls';
import { useActiveWeb3React } from '../../hooks'
import Copy from './Copy';
import { StatusIcon } from './StatusIcon'

const Wrapper = styled.div`
  padding: 1rem;
  width: 100%;
`;

const InfoCard = styled.div`
  width: 100%;
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

const TableWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SpanTwoCols = styled.div`
  grid-column: span 2;
`;

const ReferalPerformanceTable = styled.div`
  display: grid;
  grid-template-columns: 13rem repeat(4, 1fr);
  width: 100%;
  grid-row-gap: 12px;
  grid-column-gap: 3px;

  padding: 1rem;
  border: 1px solid ${({ theme }) => theme.bg3};
  border-radius: 20px;
  position: relative;
  margin-bottom: 20px;
  
  
  > div {
      background: lightblue;
  }
`;

interface Props {
  // toggleWalletModal: () => void;
  // pendingTransactions: any[];
  // confirmedTransactions: any[];
  ENSName?: string;
  openOptions: () => void;
}

const Distributor: React.FC<Props> = ({ openOptions, ENSName }) => {
  const { chainId, account, connector } = useActiveWeb3React();


  return (
    <Wrapper>
      <TableWrapper>
        <InfoCard>
          <AccountGroupingRow>
            {formatConnectorName(connector)}
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
                    <StatusIcon connectorName={connector } />
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


        <TYPE.mediumHeader>Total Referral Performance</TYPE.mediumHeader>

        <ReferalPerformanceTable>
          <div>Total Referral reward</div>
          <SpanTwoCols>1200 ESW Claim</SpanTwoCols>
          <SpanTwoCols>200 DAI Claim</SpanTwoCols>

          <div>Total Referrals</div>
          <div>21</div>
          <div>6 3[v]</div>
          <div>2</div>
          <div>3 2[v]</div>

          <div>Total Ref. Purchases, ESW</div>
          <div>999 000.3</div>
          <div>740 999.0</div>
          <div>100 000.0</div>
          <div>159 000.8</div>
        </ReferalPerformanceTable>
      </TableWrapper>
    </Wrapper>
  )
}

export { Distributor };
