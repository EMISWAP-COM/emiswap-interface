import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import WAValidator from 'wallet-address-validator';
import ReactGA from 'react-ga';
import Modal from '../Modal';
import EmiCardHeaderImg from '../../assets/images/EmiCardHeaderImg.jpg';
import CloseIcon from '../../assets/images/close-white.svg';

const ModalBody = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;

  .close-icon {
    position: absolute;
    width: 25px;
    right: 10px;
    top: 10px;
    cursor: pointer;
  }

  img {
    width: 100%;
    margin-bottom: 30px;
    ${({ theme }) => theme.mediaWidth.upToTabletop`
      margin-bottom: 10px;
    `};
  }

  .modal-body {
    padding: 0 45px 40px;
    overflow-y: auto;
    width: 100%;

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
      padding: 0 20px;
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

    ${({ theme }) => theme.mediaWidth.upToTabletop`
    padding: 0 25px 20px;

    &__header {
      font-size: 22px;
    }
  `};
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
      const utm = localStorage.getItem('UTMMarks');
      fetch(`/v1/public/whitelist${utm || ''}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
          email: email,
          telegram: telegram,
          address: address,
          created_at: new Date().toString(),
        }),
      })
        .then(response => response.text())
        .then(contents => {
          ReactGA.event({
            category: 'whitelist',
            action: 'whitelist_MagicNFT',
          });
          console.log(contents);
          localStorage.removeItem('UTMMarks');
          onDismiss();
        })
        .catch(() =>
          console.log('Can’t access /v1/public/whitelist response. Blocked by browser?'),
        );
    }
  };
  return (
    <Modal isOpen={isOpen} onDismiss={onDismiss} maxHeight={90} maxWidth={500}>
      <ModalBody>
        <img className="close-icon" src={CloseIcon} alt="EmiCardHeaderImg" onClick={onDismiss} />
        <img src={EmiCardHeaderImg} alt="EmiCardHeaderImg" />
        <div className="modal-body">
          <div className="modal-body__header">
            Fill in this form and get Magic NFT Bonus at EmiSwap Crowdsale
          </div>
          <div className="modal-body__description">
            Only the first 1,000 Crowdsale participants with 500 or more ESW, who fill this form
            will receive the bonus!
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
            <div className="modal-body__input-label">Ethereum Address Used to Buy ESW</div>
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
