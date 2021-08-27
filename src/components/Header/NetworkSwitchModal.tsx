import React, { useState } from 'react';
import Modal from '../Modal';
import {
  useConfirmSwitchModalToggle,
  useNetworkSwitchModalOpen,
  useNetworkSwitchModalToggle,
} from '../../state/application/hooks';
import { Text } from 'rebass';
import styled from 'styled-components/macro';
import CircleCheckIcon from '../../assets/svg/circle-check.svg';
import { toHex } from 'web3-utils';
import { useActiveWeb3React } from '../../hooks';
import { INetworkItem, networksItems } from '../../constants';
import ConfirmSwitchModal from './ConfirmSwitchModal';
import { FortmaticConnector } from '../../connectors/Fortmatic';
import { PortisConnector } from '@web3-react/portis-connector';
import { useWeb3React } from '@web3-react/core';
import chainIds from '../../constants/chainIds';
import NetworkNeedSwitchModal from './NetworkNeedSwitchModal';
import { useIsMetaMask } from '../../hooks/Coins';
import { isMobile } from 'react-device-detect';

const NetworkSwitchWrapped = styled.div`
  width: 100%;
  padding: 32px 24px 32px 28px;
`;

const NetworkItemsRow = styled.div`
  display: flex;
  // justify-content: space-between;
  justify-content: space-around;
  align-items: center;
  width: 70%;
  margin: 24px auto 0 auto;
`;

const NetworkItem = styled.div`
  position: relative;
  cursor: pointer;
`;

const NetworkIcon = styled.div<{ active: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 48px;
  height: 48px;
  margin: 0 auto 12px auto;
  border: 3px solid ${({ theme, active }) => active ? theme.green5 : 'white'};
  border-radius: 4px;
  background: white;
`;
const CircleCheckImg = styled.img`
  position: absolute;
  top: -12px;
  right: 2px;
`;

const NetworkName = styled(Text)<{ active: boolean }>`
  font-size: 16px; 
  font-weight: 500; 
  text-align: center;
  color: ${({ theme, active }) => active ? theme.green5 : 'white'};
`;

export default function NetworkSwitchModal() {

  const { ethereum } = window as any;

  const { chainId, connector } = useActiveWeb3React();
  const { deactivate } = useWeb3React();

  const isMetaMask = useIsMetaMask();

  const [selectedItem, setSelectedItem] = useState<INetworkItem>(null);
  const [isVisibleNeedSwitchModal, setVisibleNeedSwitchModal] = useState<boolean>(false);

  const networkSwitchModalOpen = useNetworkSwitchModalOpen();
  const toggleNetworkSwitchModal = useNetworkSwitchModalToggle();
  const toggleConfirmSwitchModal = useConfirmSwitchModalToggle();

  const switchNetwork = async (item: INetworkItem) => {
    try {
      await ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: toHex(item.chainId) }],
      });
    } catch (switchError) {
      if (switchError.code === 4902) {
        try {
          await ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: toHex(item.chainId),
                chainName: item.name,
                rpcUrls: item.rpcUrls,
                nativeCurrency: {
                  name: item.currencySymbol,
                  symbol: item.currencySymbol,
                  decimals: 18,
                },
              },
            ],
          });
        } catch (addError) {
          console.log(addError);
        }
      } else {
        console.log(switchError);
      }
    } finally {
      await providerLogout();
    }
  };

  const providerLogout = async () => {
    if (isMetaMask) {
      return;
    }

    const provider = await connector.getProvider();

    if (connector instanceof FortmaticConnector && connector?.fortmatic) {
      connector.fortmatic?.user.logout();
      deactivate();
    } else if (connector instanceof PortisConnector && connector?.portis) {
      connector.portis.logout();
      deactivate();
    } else if (provider?.close) {
      provider.close();
    } else {
      deactivate();
    }
  };

  const onClickItem = async (item: INetworkItem) => {
    if (item.chainId === chainId) {
      return;
    }

    if (item.chainId === chainIds.KUCOIN && !isMetaMask) {
      setSelectedItem(item);
    } else if (item.chainId === chainIds.KUCOIN) {
      setVisibleNeedSwitchModal(isMobile);
      toggleNetworkSwitchModal();
    } else {
      await switchNetwork(item);
      toggleNetworkSwitchModal();
    }
  };

  const onClickConfirmItem = async () => {
    const item = selectedItem;

    setSelectedItem(null);
    toggleConfirmSwitchModal();

    await switchNetwork(item);

    toggleNetworkSwitchModal();
  };

  const onClickCancel = async () => {
    setSelectedItem(null);
    toggleNetworkSwitchModal();
    toggleConfirmSwitchModal();
  };

  return (
    <div>
      <Modal
        isOpen={networkSwitchModalOpen}
        onDismiss={toggleNetworkSwitchModal}
        minHeight={null}
        maxHeight={320}
        maxWidth={480}
      >
        <NetworkSwitchWrapped>
          <div>
            <Text textAlign="center" fontWeight={500} fontSize={20} color="white">Choose Network</Text>
          </div>

          <NetworkItemsRow>
            {networksItems.map(item => (
              <NetworkItem key={item.chainId} onClick={() => onClickItem(item)}>
                <NetworkIcon active={item.chainId === chainId}>
                  {item.chainId === chainId && (
                    <CircleCheckImg src={CircleCheckIcon}/>
                  )}
                  <img src={item.icon} alt={item.name}/>
                </NetworkIcon>
                <NetworkName active={item.chainId === chainId}>{item.name}</NetworkName>
              </NetworkItem>
            ))}
          </NetworkItemsRow>

        </NetworkSwitchWrapped>
      </Modal>
      {selectedItem && (
        <ConfirmSwitchModal onConfirm={onClickConfirmItem} onCancel={onClickCancel}/>
      )}
      {isVisibleNeedSwitchModal && (
        <NetworkNeedSwitchModal/>
      )}
    </div>
  );
}
