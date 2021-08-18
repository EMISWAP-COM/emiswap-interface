import Modal from '../Modal';
import React from 'react';
import styled from 'styled-components/macro';
import { WalletAction } from '../AccountDetails/styleds';

const ActionBtn = styled(WalletAction)`
  height: 32px;
`;

const ModalContent = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;
  padding: 24px;
  color: ${({ theme }) => theme.white};
`;

const ModalButtons = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 16px;
`;

const ChangeCancelBtn = styled(ActionBtn)`
  margin: 0 0 0 8px !important;
  border: 1px solid rgb(97, 92, 105) !important;
  background-color: transparent;
  color: #ffffff;

  &:hover,
  &:focus,
  &:active {
    background-color: transparent;
    box-shadow: none;
  }
`;

const ChangeConfirmBtn = styled(ActionBtn)`
  margin: 0 8px 0 0 !important;
  background-color: ${({ theme }) => theme.purple} !important;
  border: 1px solid ${({ theme }) => theme.purple} !important;
`;

interface Props {
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmSwitchModal({
  onConfirm,
  onCancel,
}: Props) {

  return (
    <Modal
      isOpen={true}
      maxHeight={90}
      maxWidth={680}
      onDismiss={onCancel}
    >
      <ModalContent>
        <div>
          You will be logged out. To use EmiSwap on KuCoin network, please login with MetaMask wallet
        </div>

        <ModalButtons>
          <ChangeConfirmBtn onClick={onConfirm}>Confirm</ChangeConfirmBtn>
          <ChangeCancelBtn onClick={onCancel}>
            Cancel
          </ChangeCancelBtn>
        </ModalButtons>
      </ModalContent>
    </Modal>
  );

}
