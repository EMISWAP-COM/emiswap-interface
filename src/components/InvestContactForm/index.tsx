import React, { useRef, useState } from 'react';
import styled from 'styled-components';
// import WAValidator from 'wallet-address-validator';
// import ReactGA from 'react-ga';
import Modal from '../Modal';
// import EmiCardHeaderImg from '../../assets/images/EmiCardHeaderImgNew.jpg';
import { SuccessRegistration } from './SuccessRegistration';
import { CloseIcon } from '../../assets/tsx/CloseIcon';
// import { fetchWrapper } from '../../api/fetchWrapper';
// import { useDispatch } from 'react-redux';
// import { addPopup } from '../../state/application/actions';

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
    padding: 40px 45px;
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

interface EmiMagicCardModalProps {
  isOpen: boolean;
  onDismiss: () => void;
  walletID?: string;
}

// const baseUrl = window['env'] ? window['env'].REACT_APP_PUBLIC_URL : '';

const defaultValidation = {
  name: true,
  email: true,
  phone: true,
  investment: true,
};

//TODO объединить с EmiMagicCardModal. Вынести валидатор в утилсы с декларативной проверкой входящего объекта. Регэкспы тоже из утлис экспортить
export default function InvestContactForm({ isOpen, walletID, onDismiss }: EmiMagicCardModalProps) {
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const phoneRef = useRef(null);
  const investmentRef = useRef(null);
  const [validation, setValidation] = useState(defaultValidation);
  const [isRegistered, setIsRegistered] = useState(false);
  // const dispatch = useDispatch();

  const validateForm = (name = '', email = '', phone = '', investment = '') => {
    const newValidator = { ...defaultValidation };
    const nameRegexp = /\D/;
    const emailRegexp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegexp = /^\+[0-9-]+$/;
    const investmentRegexp = /^[0-9]+$/;

    newValidator.name = nameRegexp.test(name);
    newValidator.email = emailRegexp.test(email);
    newValidator.phone = phoneRegexp.test(phone);
    newValidator.investment = investmentRegexp.test(investment);

    return newValidator;
  };

  const sendForm = () => {
    const name = nameRef && nameRef.current.value;
    const email = emailRef && emailRef.current.value;
    const phone = phoneRef && phoneRef.current.value;
    const investment = investmentRef && investmentRef.current.value;

    // const utm = localStorage.getItem('UTMMarks');

    const formValidation = validateForm(name, email, phone, investment);
    const isValid = Object.values(formValidation).every(Boolean);

    if (isValid) {
      // const urlParams = new URLSearchParams(localStorage.getItem('UTMMarks'));
      // let utmMakrs = {};
      // for (let [key, value] of urlParams) {
      //   if (key.includes('utm')) {
      //     utmMakrs[key] = value;
      //   }
      // }
      setIsRegistered(true);
      // fetchWrapper
      //   .post(`${baseUrl}/v1/public/whitelist${utm || ''}`, {
      //     body: JSON.stringify({
      //       name: name,
      //       email: email,
      //       telegram: telegram,
      //       address: address,
      //       created_at: new Date().toString(),
      //       utm: utmMakrs,
      //     }),
      //   })
      //   .then(() => {
      //     setSuccessMessage(Message.success);
      //     ReactGA.event({
      //       category: 'whitelist',
      //       action: 'whitelist_MagicNFT',
      //     });
      //     localStorage.removeItem('UTMMarks');
      //     setIsRegistered(true);
      //   })
      //   .catch(e => {
      //     const validation = e?.payload?.address;
      //     if (validation && validation[0] === 'duplicate') {
      //       setSuccessMessage(Message.duplicate);
      //       setIsRegistered(true);
      //     } else {
      //       alert(`Oops, we unable to perform whitelist registration - ${e}`);
      //       console.log('e', e.payload);
      //       dispatch(
      //         addPopup({
      //           key: 'magicCardModal',
      //           content: {
      //             status: {
      //               name: `Oops, we unable to perform whitelist registration - ${e}`,
      //               isError: true,
      //             },
      //           },
      //         }),
      //       );
      //     }
      //   });
    }

    setValidation(formValidation);
  };

  const errorLabel = <span className="modal-body__error-text">Please enter the correct value</span>;

  return (
    <Modal isOpen={isOpen} onDismiss={onDismiss} maxHeight={90} maxWidth={680}>
      <ModalBody>
        <CloseBtn onClick={onDismiss}>
          <CloseIcon color={'#555959'} />
        </CloseBtn>
        {isRegistered ? (
          <SuccessRegistration message={''} />
        ) : (
          <>
            <div className="modal-body">
              <div className="modal-body__header">Offer for investors who missed the tokensale</div>
              <div className="modal-body__description">
                If you are interested in purchasing ESW for less than $25,000, fill out this form.
              </div>
              <div className="modal-body__input-block">
                <div className="modal-body__input-label">Name</div>
                <input
                  ref={nameRef}
                  className={`modal-body__input${!validation.name ? ' modal-body__error' : ''}`}
                  type="text"
                  placeholder="Bob"
                />
                {!validation.name && errorLabel}
              </div>
              <div className="modal-body__input-block">
                <div className="modal-body__input-label">Email</div>
                <input
                  ref={emailRef}
                  className={`modal-body__input${!validation.email ? ' modal-body__error' : ''}`}
                  type="text"
                  placeholder="email@email.com"
                />
                {!validation.email && errorLabel}
              </div>
              <div className="modal-body__input-block">
                <div className="modal-body__input-label">Phone</div>
                <input
                  ref={phoneRef}
                  className={`modal-body__input${!validation.phone ? ' modal-body__error' : ''}`}
                  type="text"
                  placeholder="+ [contry code] - [number]"
                />
                {!validation.phone && errorLabel}
              </div>
              <div className="modal-body__input-block">
                <div className="modal-body__input-label">Investment size $</div>
                <input
                  ref={investmentRef}
                  className={`modal-body__input${
                    !validation.investment ? ' modal-body__error' : ''
                  }`}
                  defaultValue={walletID}
                  type="text"
                  placeholder="5000"
                />
                {!validation.investment && errorLabel}
              </div>
              <div className="modal-body__btn-container">
                <div className="modal-body__btn" onClick={sendForm}>
                  Submit
                </div>
              </div>
            </div>
          </>
        )}
      </ModalBody>
    </Modal>
  );
}
