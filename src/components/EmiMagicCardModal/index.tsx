import React from 'react';
import styled from 'styled-components';
import Modal from '../Modal';
import EmiCardHeaderImg from '../../assets/images/EmiCardHeaderImg.jpg';

const ModalBody = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    width: 100%;
    margin-bottom: 30px;
  }

  .modal-body {
    padding: 0 45px 40px;
    overflow-y: auto;

    &__header {
      font-family: 'IBM Plex Sans', Arial, sans-serif;
      font-weight: 600;
      color: #000000;
      font-size: 36px;
      margin-bottom: 20px;
    }

    &__description {
      font-family: 'IBM Plex Sans', Arial, sans-serif;
      font-weight: 300;
      color: #000000;
      font-size: 16px;
      margin-bottom: 20px;
    }

    &__input-block {
      margin-bottom: 25px;
    }

    &__input-label {
      font-size: 20px;
      line-height: 1.55;
      font-family: 'IBM Plex Sans', Arial, sans-serif;
      font-weight: 300;
      color: #000000;
      padding-bottom: 5px;
    }

    &__input {
      color: #000000;
      border: 1px solid #c9c9c9;
      border-radius: 8px;
      height: 60px;
      padding: 0px 20px;
      font-size: 16px;
      line-height: 1.33;
      width: 100%;
    }

    &__btn {
      color: #ffffff;
      background-color: #11b382;
      border-radius: 8px;
      width: 100%;
      font-family: 'IBM Plex Sans', Arial, sans-serif;
      text-align: center;
      height: 60px;
      border: 0 none;
      font-size: 16px;
      padding-left: 60px;
      padding-right: 60px;
      font-weight: bold;
      white-space: nowrap;
      background-image: none;
      cursor: pointer;
      margin: 0;
      box-sizing: border-box;
      outline: none;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    &__bottom-text {
      margin-top: 20px;
      text-align: center;
      font-size: 15px;
      line-height: 1.55;
      font-family: 'IBM Plex Sans', Arial, sans-serif;
      font-weight: 300;
      color: #000000;
    }

    &__link {
      color: rgb(17, 179, 130) !important;
      border-bottom-color: rgb(17, 179, 130);
      text-decoration: none;
    }
  }
`;

interface EmiMagicCardModalProps {
  isOpen: boolean;
  onDismiss: () => void;
  walletID?: string;
}

export default function EmiMagicCardModal({ isOpen, walletID, onDismiss }: EmiMagicCardModalProps) {
  const sendForm = () => {
    fetch('https://storage.googleapis.com/storage/v1/b/BUCKET_NAME/o/OBJECT_NAME', {
      method: 'PATH',
      headers: {
        Authorization: 'Bearer AIzaSyAuM4sQ2LprkFF7kfQ7DI1yDtkLtaHwXUc',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        metadata: { test: { test: 1, test2: 2, test3: 3 } },
      }),
    });
  };
  return (
    <Modal isOpen={isOpen} onDismiss={onDismiss} maxHeight={90} maxWidth={500}>
      <ModalBody>
        <img src={EmiCardHeaderImg} alt="EmiCardHeaderImg" />
        <div className="modal-body">
          <div className="modal-body__header">EmiSwap Crowdsale is Coming Soon!</div>
          <div className="modal-body__description">
            Register for the whitelist to reserve a ESW allocation and get unique bonuses for early
            participants
          </div>
          <div className="modal-body__input-block">
            <div className="modal-body__input-label">Name</div>
            <input className="modal-body__input" type="text" placeholder="Bob" />
          </div>
          <div className="modal-body__input-block">
            <div className="modal-body__input-label">Your Email</div>
            <input className="modal-body__input" type="text" placeholder="email@email.com" />
          </div>
          <div className="modal-body__input-block">
            <div className="modal-body__input-label">Your Telegram</div>
            <input className="modal-body__input" type="text" placeholder="@telegram" />
          </div>
          <div className="modal-body__input-block">
            <div className="modal-body__input-label">Ethereum Address Used to Buy ESWc</div>
            <input className="modal-body__input" type="text" placeholder="0x3f4..." />
          </div>
          <div className="modal-body__btn" onClick={sendForm}>
            Register for a whitelist
          </div>
          <div className="modal-body__bottom-text">
            Still have questions? Join EmiSwap{' '}
            <a
              className="modal-body__link"
              href="https://t.me/emiswap_official"
              target="_blank"
              rel="noopener noreferrer"
            >
              Telegram Chat
            </a>
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
}
