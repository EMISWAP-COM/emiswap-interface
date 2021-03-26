import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import WAValidator from 'wallet-address-validator';
import ReactGA from 'react-ga';
import Modal from '../Modal';
import EmiCardHeaderImg from '../../assets/images/EmiCardHeaderImgNew.jpg';
import { SuccessRegistration } from './SuccessRegistration';
import { CloseIcon } from '../../assets/tsx/CloseIcon';

const CloseBtn = styled.div`
  position: absolute;
  right: 20px;
  top: 20px;
  cursor: pointer;

  @media screen and (max-width: 375px) {
    top: 15px;
    right: 15px;
  }
`;

const ModalBody = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;

  @media screen and (max-width: 600px) {
    font-size: 12px;
  }

  img {
    width: 100%;
    ${({ theme }) => theme.mediaWidth.upToTabletop`
      margin-bottom: 10px;
    `};
  }

  .modal-body {
    padding: 60px 45px 40px;
    overflow-y: auto;
    width: 100%;
    background: rgba(255, 255, 255, 0.5);

    &__header {
      font-weight: 600;
      color: ${({ theme }) => theme.green5};
      font-family: Poppins, sans-serif, Arial;
      font-style: normal;
      font-size: 32px;
      line-height: 48px;
      margin-bottom: 20px;
    }

    &__description {
      font-family: Poppins, Arial, sans-serif;
      font-weight: 600;
      line-height: 24px;
      font-style: normal;
      color: #434a72;
      font-size: 16px;
      margin-bottom: 59px;
    }

    &__input-block {
      margin-bottom: 25px;
      position: relative;
    }

    &__input-label {
      font-size: 16px;
      font-family: Poppins, Arial, sans-serif;
      font-weight: 600;
      padding: 0 20px;
      font-style: normal;
      line-height: 24px;

      color: #434a72;
    }

    &__input {
      color: #000000;
      border: none;
      background: none;
      border-bottom: 1px solid #d2d2d2;
      height: 60px;
      padding: 0 20px;
      font-size: 16px;
      line-height: 1.33;
      width: 100%;
      max-height: 35px;
      outline: none;
    }

    &__btn {
      color: #ffffff;
      background-color: ${({ theme }) => theme.green5};
      border-radius: 60px;
      width: 67%;
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
      align-self: center;
      align-items: center;
    }

    &__btn-container {
      display: flex;
      justify-content: center;
      width: 100%;
    }

    &__bottom-text {
      margin-top: 20px;
      text-align: center;
      font-family: Poppins, Arial, sans-serif;
      font-weight: 300;
      color: #434a72;
      font-style: normal;
      font-size: 16px;
      line-height: 24px;
      text-align: center;
    }

    &__link {
      color: #434a72 !important;
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

    @media screen and (max-width: 375px) {
      &__header {
        font-size: 24px;
        line-height: 36px;
      }

      &__btn {
        max-width: 310px;
        max-height: 47px;
        font-size: 16px;
      }
    }
  }
`;

const baseUrl = window['env'] ? window['env'].REACT_APP_PUBLIC_URL : '';

interface EmiMagicCardModalProps {
  isOpen: boolean;
  onDismiss: () => void;
  walletID?: string;
}

const defaultValidation = { name: false, email: false, telegram: false, address: false };

enum Message {
  success = 'Now you are whitelisted and you still have time to be one of the first 1,000 to claim the bonus!',
  duplicate = 'You have already been whitelisted a while ago...',
}

export default function EmiMagicCardModal({ isOpen, walletID, onDismiss }: EmiMagicCardModalProps) {
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const telegramRef = useRef(null);
  const addressRef = useRef(null);
  const [validation, setValidation] = useState(defaultValidation);
  const [isRegistered, setIsRegistered] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const validateForm = (name = '', email = '', telegram = '', address = '') => {
    let isValid = false;
    const newValidator = { ...defaultValidation };
    const nameRegexp = /\D/;
    const emailRegexp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const telegramRegexp = /^@[a-z0-9_]+$/;
    if (!nameRegexp.test(name)) {
      newValidator.name = true;
      isValid = true;
    }
    if (!emailRegexp.test(email)) {
      newValidator.email = true;
      isValid = true;
    }

    if (!telegramRegexp.test(telegram.toLowerCase())) {
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

    const utm = localStorage.getItem('UTMMarks');

    if (!validateForm(name, email, telegram, address)) {
      setValidation(defaultValidation);
      const urlParams = new URLSearchParams(localStorage.getItem('UTMMarks'));
      let utmMakrs = {};
      for (let [key, value] of urlParams) {
        if (key.includes('utm')) {
          utmMakrs[key] = value;
        }
      }
      //TODO сделать единый фечт интерфейс для проекта, когда выделят время)
      fetch(`${baseUrl}/v1/public/whitelist${utm || ''}`, {
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
          utm: utmMakrs,
        }),
      })
        .then(response => {
          const respMessage = response.json();

          if (response.status === 200 || response.status === 201) {
            return respMessage;
          } else if (response.status === 422) {
            return respMessage;
          }

          throw new Error(response.status.toString());
        })
        .then(content => {
          if (content.error) {
            const { payload = {} } = content;
            const { address = [] } = payload;
            if (!address.includes('duplicate')) {
              throw new Error(JSON.stringify(content));
            }
            setSuccessMessage(Message.duplicate);
          } else {
            setSuccessMessage(Message.success);
          }
          ReactGA.event({
            category: 'whitelist',
            action: 'whitelist_MagicNFT',
          });
          localStorage.removeItem('UTMMarks');
          setIsRegistered(true);
        })
        .catch(e => {
          alert(`Oops, we unable to perform whitelist registration - ${e}`);
          console.log('Can’t access /v1/public/whitelist response. Blocked by browser?');
        });
    }
  };
  return (
    <Modal isOpen={isOpen} onDismiss={onDismiss} maxHeight={90} maxWidth={680}>
      <ModalBody>
        <CloseBtn onClick={onDismiss}>
          <CloseIcon color={isRegistered ? '#555959' : '#ffffff'} />
        </CloseBtn>
        {isRegistered ? (
          <SuccessRegistration message={successMessage} />
        ) : (
          <>
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
              <div className="modal-body__btn-container">
                <div className="modal-body__btn" onClick={sendForm}>
                  Register for a whitelist
                </div>
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
          </>
        )}
      </ModalBody>
    </Modal>
  );
}
