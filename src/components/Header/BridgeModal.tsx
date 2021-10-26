import React from 'react';
import Modal from '../Modal';
import { useBridgeModalOpen, useBridgeModalToggle } from '../../state/application/hooks';
import { Text } from 'rebass';
import styled from 'styled-components/macro';
import { INetworkItem, networksItems } from '../../constants';
import { isMobile } from 'react-device-detect';

const NetworkSwitchWrapped = styled.div`
  width: 100%;
  padding: 32px 24px 32px 28px;
`;

const NetworkItemsRow = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin: 24px auto 0 auto;
`;

const NetworkItem = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  min-width: 90px;
  margin-bottom: 20px;
  cursor: pointer;
`;

const NetworkIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 42px;
  height: 42px;
  margin-right: 10px;
  border: 3px solid white;
  border-radius: 4px;
  background: white;
`;

const NetworkName = styled(Text)`
  font-size: 16px; 
  font-weight: 500; 
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
        maxWidth={isMobile ? 480 : 320}
      >
        <NetworkSwitchWrapped>
          <div>
            <Text textAlign="center" fontWeight={500} fontSize={20} color="white">Bridge Links</Text>
          </div>

          <NetworkItemsRow>
            {networksItems.filter(item => item.bridgeUrl).map(item => (
              <NetworkItem key={item.chainId} onClick={() => handleClickItem(item)}>
                <NetworkIcon>
                  <img
                    style={{ maxWidth: '100%' }}
                    src={item.icon}
                    alt={item.name}
                  />
                </NetworkIcon>
                <NetworkName>{item.name}</NetworkName>
              </NetworkItem>
            ))}
          </NetworkItemsRow>

        </NetworkSwitchWrapped>
      </Modal>
    </div>
  );
}
