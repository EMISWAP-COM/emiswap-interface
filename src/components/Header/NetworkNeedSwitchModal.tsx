import WalletRejectIcon from '../../assets/svg/wallet-reject.svg';
import { ButtonPrimary } from '../Button';
import { Text } from 'rebass';
import React, { useState } from 'react';
import styled from 'styled-components/macro';
import Modal from '../Modal';

export const ModalMobile = styled(Modal)`
  width: calc(100vw - 32px) !important;
  margin: 32px !important;
  border: 1px solid #615C69 !important;
  border-radius: 12px !important;
  // box-shadow: none !important;
  transform: translateY(0px) !important;
`;

export const KCSAlert = styled.div`
   padding: 24px;
   color: white;
`;

interface Props {
  onClose: () => void;
}

export default function NetworkNeedSwitchModal<Props>({onClose}) {

  const handleCloseModal = () => {
    onClose();
  };

  return (
    <ModalMobile
      isOpen={true}
      onDismiss={handleCloseModal}
    >
      <KCSAlert>
        <img src={WalletRejectIcon} alt={''}/>
        <div style={{ marginTop: '16px' }}>
          To continue using the exchange please switch to the KCC network or change the wallet to MetaMask
        </div>
        <div style={{ marginTop: '24px' }}>
          <ButtonPrimary onClick={handleCloseModal}>
            <Text fontWeight={500} fontSize={20}>
              Accept
            </Text>
          </ButtonPrimary>
        </div>
      </KCSAlert>
    </ModalMobile>
  );
}
