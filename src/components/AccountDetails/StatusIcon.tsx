import { fortmatic, injected, portis, walletconnect, walletlink } from '../../connectors';
import Identicon from '../Identicon';
import WalletConnectIcon from '../../assets/images/walletConnectIcon.svg';
import CoinbaseWalletIcon from '../../assets/images/coinbaseWalletIcon.svg';
import FortmaticIcon from '../../assets/images/fortmaticIcon.png';
import PortisIcon from '../../assets/images/portisIcon.png';
import React from 'react';
import styled from 'styled-components';
import { AbstractConnector } from '@web3-react/abstract-connector';
import { ButtonSecondary } from '../Button';

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

interface Props {
  connectorName: AbstractConnector
}

export function StatusIcon({ connectorName }: Props) {

  if (connectorName === injected) {
    return (
      <IconWrapper size={16}>
        <Identicon />
      </IconWrapper>
    );
  } else if (connectorName === walletconnect) {
    return (
      <IconWrapper size={16}>
        <img src={WalletConnectIcon} alt={''} />
      </IconWrapper>
    );
  } else if (connectorName === walletlink) {
    return (
      <IconWrapper size={16}>
        <img src={CoinbaseWalletIcon} alt={''} />
      </IconWrapper>
    );
  } else if (connectorName === fortmatic) {
    return (
      <IconWrapper size={16}>
        <img src={FortmaticIcon} alt={''} />
      </IconWrapper>
    );
  } else if (connectorName === portis) {
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
