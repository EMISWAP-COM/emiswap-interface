import React, { useRef, useState } from 'react';
import styled from 'styled-components';
// import WAValidator from 'wallet-address-validator';
// import ReactGA from 'react-ga';
import Modal from '../Modal';
// import EmiCardHeaderImg from '../../assets/images/EmiCardHeaderImgNew.jpg';
import { SuccessRegistration } from './SuccessRegistration';
import { CloseIcon } from '../../assets/tsx/CloseIcon';
import { fetchWrapper } from '../../api/fetchWrapper';
import { useDispatch } from 'react-redux';
import { addPopup } from '../../state/application/actions';
import WAValidator from 'wallet-address-validator';
import { ButtonPrimary } from '../Button';

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

const ModalCustom = styled(Modal)`
  @media screen and (max-width: 600px) {
    width: 100vw !important;
    max-width: 100vw !important;
    min-height: 100vh !important;
    box-shadow: none !important;
    border-radius: 0 !important;
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
    max-width: 440px;
    padding: 32px;
    overflow-y: auto;
    width: 100%;
    background: ${({ theme }) => theme.cardBG};
    
    ::-webkit-scrollbar {
      width: 8px;
    }
  
    ::-webkit-scrollbar-track {
      background: #7d979433;
      border-radius: 3px;
    }
  
    ::-webkit-scrollbar-thumb {
      border-radius: 3px;
      background: ${({ theme }) => theme.border1};
    } 
        
    @media screen and (max-width: 600px) {
      width: 100vw;
      max-width: 100vw;
      padding: 20px;
    }

    &__header {
      max-width: 300px;
      font-weight: 600;
      color: ${({ theme }) => theme.white};
      font-style: normal;
      font-size: 20px;
      line-height: 32px;
      margin-bottom: 20px;
      
      @media screen and (max-width: 600px) {
        font-size: 18px;
        line-height: 24px;
      }
      
    }

    &__description {
      font-weight: 600;
      line-height: 24px;
      font-style: normal;
      color: #434a72;
      font-size: 16px;
      margin-bottom: 59px;
    }

    &__input-block {
      margin-bottom: 24px;
      position: relative;
      border: 1px solid ${({ theme }) => theme.border1};
      border-radius: 8px;
      background: ${({ theme }) => theme.dark1};
    }
    
    &__input--error {
      border: 1px solid ${({ theme }) => theme.red};
    }

    &__input-label {
      font-size: 12px;
      padding: 14px 16px 7px 16px;
      font-style: normal;
      line-height: 14px;
      color: ${({ theme }) => theme.darkText};
    }
    
    &__input-label-required {
      margin-left: 4px;
      color: ${({ theme }) => theme.pink};
    }

    &__input {
      color: white;
      border: none;
      background: none;
      height: 60px;
      padding: 0 16px 8px 16px;
      font-size: 16px;
      line-height: 1.33;
      width: 100%;
      max-height: 35px;
      outline: none;
      
      ::placeholder {
        color: #615C69;
      }
    }

    &__btn-container {
      display: flex;
      justify-content: center;
      width: 100%;
      padding-top: 8px;
    }

    &__bottom-text {
      margin-top: 20px;
      text-align: center;
      font-weight: 300;
      color: #434a72;
      font-style: normal;
      font-size: 16px;
      line-height: 24px;
    }

    &__link {
      color: #434a72 !important;
      border-bottom-color: rgb(17, 179, 130);
      text-decoration: none;
    }
    
    &__helper-text {
      margin-left: 20px;
      margin-top: 4px;
      font-size: 14px;
    }

    &__error-text {
      color: ${({ theme }) => theme.red};
      position: absolute;
      bottom: -21px;
      left: 8px;
      right: 0;
      margin: auto 0;
      font-size: 12px;
    }
  }
`;
const baseUrl = window['env'] ? window['env'].REACT_APP_PUBLIC_URL : '';

interface EmiMagicCardModalProps {
  isOpen: boolean;
  onDismiss: () => void;
  walletID?: string;
}

const defaultValidation = {
  name: true,
  email: true,
  phone: true,
  telegram: true,
  wallet: true,
};

//TODO объединить с EmiMagicCardModal. Вынести валидатор в утилсы с декларативной проверкой входящего объекта. Регэкспы тоже из утлис экспортить
export default function InvestContactForm({ isOpen, walletID, onDismiss }: EmiMagicCardModalProps) {
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const phoneRef = useRef(null);
  const telegramRef = useRef(null);
  const walletRef = useRef(null);
  const [validation, setValidation] = useState(defaultValidation);
  const [isRegistered, setIsRegistered] = useState(false);
  const dispatch = useDispatch();

  const validateForm = (name, email, phone, telegram, wallet) => {
    const newValidator = { ...defaultValidation };
    const nameRegexp = /\D/;
    const emailRegexp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegexp = /^\+[0-9-]+$/;
    const telegramRegexp = /^[A-Za-z0-9_-]+$/;

    newValidator.name = nameRegexp.test(name);
    newValidator.email = emailRegexp.test(email);
    newValidator.phone = phone ? phoneRegexp.test(phone) : true;
    newValidator.telegram = telegram ? telegramRegexp.test(telegram) : true;
    newValidator.wallet = WAValidator.validate(wallet, 'ETH');

    return newValidator;
  };

  const sendForm = () => {
    const name = nameRef.current?.value;
    const email = emailRef.current?.value;
    const phone = phoneRef.current?.value;
    const telegram = telegramRef.current?.value;
    const wallet = walletRef.current?.value;

    const formValidation = validateForm(name, email, phone, telegram, wallet);
    const isValid = Object.values(formValidation).every(Boolean);

    if (isValid) {
      fetchWrapper
        .post(`${baseUrl}/v1/public/investor_requests`, {
          body: JSON.stringify({
            name,
            email,
            telegram,
            address: wallet,
            number: phone,
          }),
        })
        .then(() => {
          setIsRegistered(true);
        })
        .catch(e => {
          const message = `${e.message}: ${JSON.stringify(e.payload)}`;
          console.log('e', message);
          dispatch(
            addPopup({
              key: 'magicCardModal',
              content: {
                status: {
                  name: `Unable to perform registration - ${message}`,
                  isError: true,
                },
              },
            }),
          );
        });
    }

    setValidation(formValidation);
  };

  const errorLabel = <span className="modal-body__error-text">Please enter the correct value</span>;

  return (
    <ModalCustom isOpen={isOpen} onDismiss={onDismiss} maxHeight={90} maxWidth={440}>
      <ModalBody>
        <CloseBtn onClick={onDismiss}>
          <CloseIcon color={'#ffffff'}/>
        </CloseBtn>
        {isRegistered ? (
          <SuccessRegistration message={''}/>
        ) : (
          <>
            <div className="modal-body">
              <div className="modal-body__header">Register to the Waiting list to participate in the Private Stage</div>
              {/*<div className="modal-body__description">*/}
              {/*  If you are interested in purchasing ESW for less than $25,000, fill out this form.*/}
              {/*</div>*/}
              <div className={`modal-body__input-block ${!validation.name ? 'modal-body__input--error' : ''}`}>
                <div className="modal-body__input-label">
                  Name <span className="modal-body__input-label-required">*</span>
                </div>
                <input
                  ref={nameRef}
                  className={`modal-body__input`}
                  type="text"
                  placeholder="Bob"
                />
                {!validation.name && errorLabel}
              </div>
              <div className={`modal-body__input-block ${!validation.email ? 'modal-body__input--error' : ''}`}>
                <div className="modal-body__input-label">
                  Email <span className="modal-body__input-label-required">*</span>
                </div>
                <input
                  ref={emailRef}
                  className={`modal-body__input`}
                  type="text"
                  placeholder="email@email.com"
                />
                {!validation.email && errorLabel}
              </div>
              <div className={`modal-body__input-block ${!validation.phone ? 'modal-body__input--error' : ''}`}>
                <div className="modal-body__input-label">Phone</div>
                <input
                  ref={phoneRef}
                  className={`modal-body__input`}
                  type="text"
                  placeholder="+49000000000000"
                />
                {!validation.phone && errorLabel}
              </div>
              <div className={`modal-body__input-block ${!validation.telegram ? 'modal-body__input--error' : ''}`}>
                <div className="modal-body__input-label">Telegram</div>
                <input
                  ref={telegramRef}
                  className={`modal-body__input`}
                  type="text"
                  placeholder="@telegram"
                />
                {!validation.telegram && (
                  <span className="modal-body__error-text">Please enter the correct value</span>
                )}
              </div>
              <div className={`modal-body__input-block ${!validation.wallet ? 'modal-body__input--error' : ''}`}>
                <div className="modal-body__input-label">
                  Wallet account <span className="modal-body__input-label-required">*</span>
                </div>
                <input
                  ref={walletRef}
                  className={`modal-body__input`}
                  defaultValue={walletID}
                  type="text"
                  placeholder="0x..."
                />
                {!validation.wallet && errorLabel}
              </div>
              <div className="modal-body__btn-container">
                <ButtonPrimary onClick={sendForm}>
                  Submit
                </ButtonPrimary>
              </div>
            </div>
          </>
        )}
      </ModalBody>
    </ModalCustom>
  );
}
