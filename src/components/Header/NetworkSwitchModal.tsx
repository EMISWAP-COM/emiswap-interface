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
import { useActiveWeb3React, useSwitchNetwork } from '../../hooks';
import { INetworkItem, networksItems } from '../../constants';
import ConfirmSwitchModal from './ConfirmSwitchModal';
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
  flex-wrap: wrap;
  // justify-content: space-between;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  margin: 24px auto 0 auto;
`;

const NetworkItem = styled.div`
  position: relative;
  min-width: 90px;
  margin-bottom: 20px;
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

  const { chainId } = useActiveWeb3React();

  const isMetaMask = useIsMetaMask();

  const { switchNetwork } = useSwitchNetwork();

  const [selectedItem, setSelectedItem] = useState<INetworkItem>(null);
  const [isVisibleNeedSwitchModal, setVisibleNeedSwitchModal] = useState<boolean>(false);

  const networkSwitchModalOpen = useNetworkSwitchModalOpen();
  const toggleNetworkSwitchModal = useNetworkSwitchModalToggle();
  const toggleConfirmSwitchModal = useConfirmSwitchModalToggle();

  const onClickItem = async (item: INetworkItem) => {
    if (item.chainId === chainId) {
      return;
    }

    try {
      const res = await switchNetwork(item);
      console.log('Network switched', res);
    } catch (err) {
      console.log('Network switch ERR', err);
    }


    // if (item.chainId !== chainIds.MAINNET && (isMetaMask || !isMobile)) {
    //   setSelectedItem(item);
    // } else if (item.chainId !== chainIds.MAINNET) {
    //   setVisibleNeedSwitchModal(true);
    //   toggleNetworkSwitchModal();
    // } else {
    //   await switchNetwork(item);
    //   toggleNetworkSwitchModal();
    // }
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

  const onCloseNeedSwitch = async () => {
    setVisibleNeedSwitchModal(false);
  };

  const logosMaxWidths = {
    [chainIds.AVALANCHE]: '80%',
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
            {networksItems.filter(item => item.active).map(item => (
              <NetworkItem key={item.chainId} onClick={() => onClickItem(item)}>
                <NetworkIcon active={item.chainId === chainId}>
                  {item.chainId === chainId && (
                    <CircleCheckImg src={CircleCheckIcon}/>
                  )}
                  <img
                    style={{ maxWidth: logosMaxWidths[item.chainId] || '100%' }}
                    src={item.icon}
                    alt={item.name}
                  />
                </NetworkIcon>
                <NetworkName active={item.chainId === chainId}>{item.name}</NetworkName>
              </NetworkItem>
            ))}
          </NetworkItemsRow>

        </NetworkSwitchWrapped>
      </Modal>
      {selectedItem && (
        <ConfirmSwitchModal
          selectedItem={selectedItem}
          onConfirm={onClickConfirmItem}
          onCancel={onClickCancel}
        />
      )}
      {isVisibleNeedSwitchModal && (
        <NetworkNeedSwitchModal onClose={onCloseNeedSwitch}/>
      )}
    </div>
  );
}
