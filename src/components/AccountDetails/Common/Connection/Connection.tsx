import React from 'react';
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';
import { ExternalLink as LinkIcon } from 'react-feather';

import { useActiveWeb3React } from '../../../../hooks';
import { useWalletModalToggle } from '../../../../state/application/hooks';
import { convertBigDecimal, formatConnectorName } from '../../uitls';
import { getEtherscanLink, shortenAddress } from '../../../../utils';

import { AppState } from '../../../../state';
import { StatusIcon } from '../../StatusIcon';
import { ChangeAddress } from '../ChangeAddress';

import * as Styled from './styled';

export interface ConnectionProps {
  ENSName?: string;
  openOptions: () => void;
}

export const Connection: React.FC<ConnectionProps> = ({ openOptions, ENSName, children }) => {
  const { chainId, account, connector } = useActiveWeb3React();

  const history = useHistory();
  const toggle = useWalletModalToggle();

  const balance = useSelector((state: AppState) => state.cabinets.balance);

  const isCollectDisabled = !Number(balance?.available.ESW);

  const sumESW = () => {
    const walletESW = balance?.wallet.ESW || 0;
    const availableESW = balance?.available.ESW || 0;
    const lockedESW = balance?.total.locked.ESW || 0;

    const sum = Number(walletESW) + Number(availableESW) + Number(lockedESW);

    return convertBigDecimal(sum.toString());
  };

  const handleClaim = () => {
    toggle();
    history.push('/claim/ESW');
  };

  return (
    <Styled.Container>
      <Styled.Main>
        <Styled.WalletInfo>
          <span>Connected with {formatConnectorName(connector)}</span>

          <Styled.ChangeActionsBlock>
            <ChangeAddress openOptions={openOptions} />
            <Styled.ChangeWalletBtn onClick={() => openOptions()}>
              Change wallet
            </Styled.ChangeWalletBtn>
          </Styled.ChangeActionsBlock>

          <Styled.Wallet>
            <StatusIcon connectorName={connector} />
            <Styled.Account>{ENSName || shortenAddress(account)}</Styled.Account>
          </Styled.Wallet>
        </Styled.WalletInfo>

        <Styled.BalanceWrapper>
          <Styled.BalanceItem>
            <span>Total</span>
            <div>
              <Styled.BalanceValue>{sumESW()}</Styled.BalanceValue>&nbsp;ESW
            </div>
          </Styled.BalanceItem>

          <Styled.BalanceItem>
            <span>Wallet</span>
            <div>
              <Styled.BalanceValue>{convertBigDecimal(balance?.wallet.ESW)}</Styled.BalanceValue>
              &nbsp;ESW
            </div>
          </Styled.BalanceItem>

          <Styled.BalanceItem>
            <span>Locked at Emiswap </span>
            <div>
              <Styled.BalanceValue>
                {convertBigDecimal(balance?.total.locked.ESW)}
              </Styled.BalanceValue>
              &nbsp;ESW
            </div>
          </Styled.BalanceItem>

          <Styled.BalanceItem>
            <span>Available to collect</span>
            <div>
              <Styled.BalanceValue>{convertBigDecimal(balance?.available.ESW)}</Styled.BalanceValue>
              &nbsp;ESW
            </div>
          </Styled.BalanceItem>
        </Styled.BalanceWrapper>

        <Styled.Options>
          {children}
          <Styled.CollectBtn disabled={isCollectDisabled} onClick={handleClaim}>
            Collect to my wallet
          </Styled.CollectBtn>
        </Styled.Options>
      </Styled.Main>

      <Styled.AccountControl>
        <Styled.StyledCopy toCopy={account}>
          <span>Copy Address</span>
        </Styled.StyledCopy>

        <Styled.AddressLink href={getEtherscanLink(chainId, ENSName || account, 'address')}>
          <LinkIcon size={16} />
          <span>View on Etherscan</span>
        </Styled.AddressLink>
      </Styled.AccountControl>
    </Styled.Container>
  );
};
