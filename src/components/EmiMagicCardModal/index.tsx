import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import WAValidator from 'wallet-address-validator';
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
      position: relative;
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

    &__error {
      border: 1px solid red;
    }

    &__error-text {
      color: red;
      position: absolute;
      bottom: -21px;
      left: 120px;
      right: 0;
      margin: auto 0;
      font-size: 12px;
    }
  }
`;

interface EmiMagicCardModalProps {
  isOpen: boolean;
  onDismiss: () => void;
  walletID?: string;
}

const defaultValidation = { name: false, email: false, telegram: false, address: false };

export default function EmiMagicCardModal({ isOpen, walletID, onDismiss }: EmiMagicCardModalProps) {
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const telegramRef = useRef(null);
  const addressRef = useRef(null);
  const [validation, setValidation] = useState(defaultValidation);
  const validateForm = (name = '', email = '', telegram = '', address = '') => {
    let isValid = false;
    const newValidator = { ...defaultValidation };
    const emailRegexp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const telegramRegexp = /^@[a-z0-9_]+$/;
    if (name.replace(/[^A-Za-z0-9_'-]/gi, '').length === 0) {
      newValidator.name = true;
      isValid = true;
    }
    if (!emailRegexp.test(email)) {
      newValidator.email = true;
      isValid = true;
    }

    if (!telegramRegexp.test(telegram)) {
      newValidator.telegram = true;
      isValid = true;
    }

    if (!WAValidator.validate(address, 'ETH')) {
      newValidator.address = true;
      isValid = true;
    }
    if (isValid) {
      setValidation(newValidator);
    } else {
      setValidation(defaultValidation);
    }
    return isValid;
  };

  const sendForm = () => {
    const name = nameRef && nameRef.current.value;
    const email = emailRef && emailRef.current.value;
    const telegram = telegramRef && telegramRef.current.value;
    const address = addressRef && addressRef.current.value;
    if (!validateForm(name, email, telegram, address)) {
      setValidation(defaultValidation);
      fetch('https://europe-west3-emirex-prod.cloudfunctions.net/esw', {
        method: 'POST',
        headers: {
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Origin, Content-Type, Accept',
          'Access-Control-Allow-Credentials': 'true',
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
          email: email,
          telegram: telegram,
          eth_address: address,
        }),
      })
        .then(response => response.text())
        .then(contents => {
          console.log(contents);
          onDismiss();
        })
        .catch(() =>
          console.log(
            'Can’t access https://europe-west3-emirex-prod.cloudfunctions.net/esw response. Blocked by browser?',
          ),
        );
    }
  };
  return (
    <Modal isOpen={isOpen} onDismiss={onDismiss} maxHeight={90} maxWidth={500}>
      <ModalBody>
        <img src={EmiCardHeaderImg} alt="EmiCardHeaderImg" />
        <div className="modal-body">
          <div className="modal-body__header">EmiSwap Crowdsale Started</div>
          <div className="modal-body__description">
            The number of cards is limited, don't miss your chance to become one of the first owners
            of amazing Magic NFT Cards! Whitelist application alone is not enough to get the bonus,
            you need to be among the first 1000 people to purchase more than 500 ESW to be eligible!
          </div>
          <div className="modal-body__input-block">
            <div className="modal-body__input-label">Name</div>
            <input
              ref={nameRef}
              className={`modal-body__input${validation.name ? ' modal-body__error' : ''}`}
              type="text"
              placeholder="Bob"
            />
            {validation.name && (
              <span className="modal-body__error-text">Please enter the correct value</span>
            )}
          </div>
          <div className="modal-body__input-block">
            <div className="modal-body__input-label">Your Email</div>
            <input
              ref={emailRef}
              className={`modal-body__input${validation.email ? ' modal-body__error' : ''}`}
              type="text"
              placeholder="email@email.com"
            />
            {validation.email && (
              <span className="modal-body__error-text">Please enter the correct value</span>
            )}
          </div>
          <div className="modal-body__input-block">
            <div className="modal-body__input-label">Your Telegram</div>
            <input
              ref={telegramRef}
              className={`modal-body__input${validation.telegram ? ' modal-body__error' : ''}`}
              type="text"
              placeholder="@telegram"
            />
            {validation.telegram && (
              <span className="modal-body__error-text">Please enter the correct value</span>
            )}
          </div>
          <div className="modal-body__input-block">
            <div className="modal-body__input-label">Ethereum Address Used to Buy ESWc</div>
            <input
              ref={addressRef}
              className={`modal-body__input${validation.address ? ' modal-body__error' : ''}`}
              defaultValue={walletID}
              type="text"
              placeholder="0x3f4..."
            />
            {validation.address && (
              <span className="modal-body__error-text">Please enter the correct value</span>
            )}
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
