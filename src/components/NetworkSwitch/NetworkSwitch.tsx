import React from 'react';
import styled from 'styled-components/macro';
import { ChainId } from '@uniswap/sdk';

import { ButtonGray } from '../Button';
import NetworkSwitchModal from '../Header/NetworkSwitchModal';
import chainIds from '../../constants/chainIds';
import { useNetworkSwitchModalToggle } from '../../state/application/hooks';
import { useNetworkData } from '../../hooks/Coins';
import { useActiveWeb3React } from '../../hooks';

const NetworkButtonSwitch = styled(ButtonGray)`
  box-sizing: border-box;
  width: fit-content;
  min-width: 120px;
  height: 40px;
  margin-right: 24px;
  padding: 0 16px;
  border: 1px solid #615c69;
  border-radius: 4px;
  background: ${({ theme }) => theme.darkGrey};
  color: white;

  &:focus,
  &:hover {
    border: 1px solid ${({ theme }) => theme.purple};
    background: ${({ theme }) => theme.darkGrey};
    box-shadow: none;
  }
  &:active {
    border: 1px solid #615c69;
    background: ${({ theme }) => theme.darkGrey};
    box-shadow: none;
  }
`;

const NetworkIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 24px;
  height: 24px;
  margin-right: 8px;
  border-radius: 50%;
  background: white;
`;

const NETWORK_LABELS: { [chainId in chainIds]: string | null } = {
  [ChainId.MAINNET]: 'Ethereum',
  [ChainId.RINKEBY]: 'Rinkeby',
  [ChainId.ROPSTEN]: 'Ropsten',
  [ChainId.GÖRLI]: 'Görli',
  [ChainId.KOVAN]: 'Kovan',
  [chainIds.KUCOIN]: 'KuCoin',
  [chainIds.POLYGON]: 'Polygon',
  [chainIds.MUMBAI]: 'Mumbai',
  [chainIds.SHIDEN]: 'Shiden',
  [chainIds.AVALANCHE]: 'Avalanche',
};

const NetworkSwitch = () => {
  const toggleNetworkSwitchModal = useNetworkSwitchModalToggle();
  const networkItem = useNetworkData();
  const { chainId } = useActiveWeb3React();

  return (
    <>
      <NetworkButtonSwitch onClick={toggleNetworkSwitchModal}>
        {networkItem && (
          <NetworkIcon>
            <img
              style={{ maxHeight: '18px', maxWidth: '18px' }}
              src={networkItem.icon}
              alt={networkItem.name}
            />
          </NetworkIcon>
        )}
        <span>{NETWORK_LABELS[chainId] || 'Change Network'}</span>
        {/*{![chainIds.MAINNET, chainIds.KUCOIN].includes(chainId as any) && (
          <NetworkLabel>Beta Version</NetworkLabel>
        )}*/}
      </NetworkButtonSwitch>
      <NetworkSwitchModal />
    </>
  );
};

export { NetworkSwitch };
