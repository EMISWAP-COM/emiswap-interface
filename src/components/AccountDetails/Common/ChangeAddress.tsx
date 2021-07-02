import React, { useState } from 'react';
import { FortmaticConnector } from '../../../connectors/Fortmatic';
import Modal from '../../Modal';
import { injected } from '../../../connectors';
import { useActiveWeb3React } from '../../../hooks';
import { useWeb3React } from '@web3-react/core';
import styled from 'styled-components/macro';
import { MessageTooltip } from '../../../base/ui/MessageTooltip/MessageTooltip';
import { WalletAction } from '../styleds';
import { PortisConnector } from '@web3-react/portis-connector';

const Container = styled.div`
  @media screen and (max-width: 800px) {
    width: calc(50% - 5px);
  }
`;

const ActionBtn = styled(WalletAction)`
  height: 32px;
`;

const ChangeAddressBtn = styled(ActionBtn)<{ inactive: boolean }>`
  height: 32px;
  margin-left: 0;
  border: 1px solid rgb(97, 92, 105) !important;
  background-color: transparent;
  color: ${({ inactive }) => (inactive ? '#615C69' : '#FFFFFF')};

  &:hover,
  &:focus,
  &:active {
    background-color: transparent;
    box-shadow: none;
  }

  @media screen and (max-width: 800px) {
    width: 100% !important;
    margin-left: 0;
    padding: 4px 2px;
  }
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
  openOptions: () => void;
}

export const ChangeAddress: React.FC<Props> = ({ openOptions }) => {
  const { connector } = useActiveWeb3React();
  const { deactivate } = useWeb3React();

  const [isConfirmChangeModalOpen, setConfirmChangeModalOpen] = useState(false);

  const isMetamask = connector === injected;

  const handleClick = async () => {
    if (!isMetamask) {
      setConfirmChangeModalOpen(true);
    }
  };

  const changeAddress = async () => {
    const provider = await connector.getProvider();

    const change = () => {
      deactivate();
      openOptions();
    };

    if (connector instanceof FortmaticConnector && connector?.fortmatic) {
      connector.fortmatic?.user.logout();
      change();
    } else if (connector instanceof PortisConnector && connector?.portis) {
      connector.portis.logout();
      change();
    } else if (provider?.close) {
      localStorage.setItem('showWalletModal', 'true');
      provider.close();
    } else {
      change();
    }
  };

  const confirmChangeModal = () => {
    return (
      <Modal
        isOpen={isConfirmChangeModalOpen}
        maxHeight={90}
        maxWidth={680}
        onDismiss={() => setConfirmChangeModalOpen(false)}
      >
        <ModalContent>
          <div>To change your Wallet Address, you will be logged out</div>

          <ModalButtons>
            <ChangeConfirmBtn onClick={changeAddress}>Confirm</ChangeConfirmBtn>
            <ChangeCancelBtn onClick={() => setConfirmChangeModalOpen(false)}>
              Cancel
            </ChangeCancelBtn>
          </ModalButtons>
        </ModalContent>
      </Modal>
    );
  };

  return (
    <Container>
      {confirmChangeModal()}
      <MessageTooltip
        disableTooltip={!isMetamask}
        position={{ top: '20px', right: '40px' }}
        text="You need to change the address inside the Metamask wallet"
      >
        <ChangeAddressBtn inactive={isMetamask} onClick={handleClick}>
          Change address
        </ChangeAddressBtn>
      </MessageTooltip>
    </Container>
  );
};
