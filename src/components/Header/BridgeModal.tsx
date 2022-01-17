import React from 'react';
import Modal from '../Modal';
import { useBridgeModalOpen, useBridgeModalToggle } from '../../state/application/hooks';
import { Text } from 'rebass';
import styled from 'styled-components/macro';
import { INetworkItem, networksItems } from '../../constants';
import { isMobile } from 'react-device-detect';

const NetworkSwitchWrapped = styled.div`
  width: 100%;
  overflow-y: scroll;
  max-height: 600px;
  padding: 32px 24px 24px 32px;
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    // background: #7d979433;
    border-radius: 3px;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 3px;
    background: #11b382;
  }
`;

const NetworkItemsRow = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  margin: 24px auto 0 auto;
`;

const NetworkItem = styled.div`
  display: flex;
  align-items: center;
  min-width: 90px;
  margin-bottom: 30px;
  cursor: pointer;
`;

const NetworkIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 48px;
  height: 48px;
  border: 3px solid white;
  border-radius: 4px;
  background: white;
  margin-right: 15px;
`;

const NetworkName = styled(Text)`
  font-size: 16px; 
  font-weight: 700; 
  text-align: center;
  color: white;
`;

export default function BridgeModal() {
  const bridgeModalOpen = useBridgeModalOpen();
  const toggleBridgeModal = useBridgeModalToggle();

  const handleClickItem = (networkItem: INetworkItem) => {
    window.open(networkItem.bridgeUrl);
  };

  return (
    <div>
      <Modal
        isOpen={bridgeModalOpen}
        onDismiss={toggleBridgeModal}
        minHeight={null}
        maxHeight={320}
        maxWidth={320}
      >
        <NetworkSwitchWrapped>
          <div>
            <Text textAlign="center" marginBottom={40} fontWeight={500} fontSize={20} color="white">
              Links
            </Text>
          </div>

          <NetworkItemsRow>
            {networksItems
              .filter(item => item.active && item.bridgeUrl)
              .map(item => (
                <NetworkItem key={item.chainId} onClick={() => handleClickItem(item)}>
                  <NetworkIcon>
                    <img style={{ maxWidth: '100%' }} src={item.icon} alt={item.name} />
                  </NetworkIcon>
                  <NetworkName>{item.name} Bridge</NetworkName>
                </NetworkItem>
              ))}
          </NetworkItemsRow>
        </NetworkSwitchWrapped>
      </Modal>
    </div>
  );
}
