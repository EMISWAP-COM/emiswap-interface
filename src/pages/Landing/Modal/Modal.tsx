import React from 'react';
import styled from 'styled-components';
import Modal from '../../../components/Modal';
import { useTranslation } from 'react-i18next';

const ModalContent = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  padding: 24px;
  color: ${({ theme }) => theme.white};

  > p {
    line-height: 24px;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;

  font-style: normal;
  font-weight: normal;
  font-size: 32px;

  color: #ffffff;
`;

const CloseWrapper = styled.div`
  display: flex;
  align-items: center;
  font-size: 16px;
`;

const Close = styled.div`
  position: relative;
  height: 48px;
  width: 48px;
  border-radius: 24px;
  background: #27272e;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 16px;
  cursor: pointer;
`;

const LandingModal = ({ isOpen, onDissmiss }) => {
  const { t } = useTranslation();

  return (
    <Modal
      isOpen={isOpen}
      // maxHeight={90}
      maxWidth={680}
      onDismiss={onDissmiss}
      className="landing_modal"
    >
      <ModalContent>
        <Header>
          {t('landing.popup.title')}
          <CloseWrapper onClick={onDissmiss}>
            {t('landing.button.close')} <Close>X</Close>
          </CloseWrapper>
        </Header>
        <p>{t('landing.popup.p.1')}</p>
        <p>{t('landing.popup.p.2')}</p>

        <ul>
          <li>{t('landing.popup.list.1')}</li>
          <li>{t('landing.popup.list.2')}</li>
          <li>{t('landing.popup.list.3')}</li>
          <li>{t('landing.popup.list.4')}</li>
        </ul>

        <p>{t('landing.popup.p.3')}</p>
        <p>{t('landing.popup.p.4')}</p>
      </ModalContent>
    </Modal>
  );
};

export { LandingModal };
