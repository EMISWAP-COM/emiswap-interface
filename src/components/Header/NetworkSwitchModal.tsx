import React from 'react';
import Modal from '../Modal';
import { useNetworkSwitchModalOpen, useNetworkSwitchModalToggle } from '../../state/application/hooks';
import { Text } from 'rebass';
import styled from 'styled-components/macro';
import CircleCheckIcon from '../../assets/svg/circle-check.svg';
import { toHex } from 'web3-utils';
import { useActiveWeb3React } from '../../hooks';
import { INetworkItem, networksItems } from '../../constants';

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

  const { chainId } = useActiveWeb3React();

  const networkSwitchModalOpen = useNetworkSwitchModalOpen();
  const toggleNetworkSwitchModal = useNetworkSwitchModalToggle();

  const { ethereum } = window as any;

  const onClickItem = async (item: INetworkItem) => {
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
                  decimals: 18
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
    }
  };

  return (
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
            <NetworkItem onClick={() => onClickItem(item)}>
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
  );
}
