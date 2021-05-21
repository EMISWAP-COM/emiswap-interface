import React, { useState } from 'react';
import styled from 'styled-components';
import Question from '../../assets/svg/FAQIcon/question.svg';
import ArrowDown from '../../assets/svg/FAQIcon/arrowDown.svg';
import ArrowUp from '../../assets/svg/FAQIcon/arrowUp.svg';

export interface AccordionProps {
  header: string;
  children: React.ReactNode;
  btnClick?: () => void;
  btnText?: string;
  btnSecondClick?: () => void;
  btnSecondText?: string;
  headerClass?: string;
  openClass: string;
}
//TODO убрать мракобесию с фиксированной высотой для каждого блока.
const Body = styled.div`
  background: rgba(0, 0, 0, 0.7);
  border: 1px solid #eaeeee;
  box-sizing: border-box;
  box-shadow: 0 2px 10px -2px rgba(231, 215, 175, 0.3), 0px 21px 20px -15px rgba(140, 125, 85, 0.05);
  border-radius: 12px;
  padding: 27px 30px;
  margin-bottom: 8px;

  @media screen and (max-width: 1000px) {
    max-width: calc(100% - 20px);
    margin: 10px auto;
  }

  @media screen and (max-width: 600px) {
    max-width: 100%;
    margin: 10px auto;
    padding: 10px;
  }

  .h4 {
    font-family: 'IBM Plex Sans', sans-serif;
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 32px;
    letter-spacing: -0.01em;
    color: #fff;

    @media screen and (max-width: 600px) {
      font-size: 16px;
      line-height: 1.4;
    }
  }

  .header {
    display: flex;
    justify-content: space-between;
    cursor: pointer;

    &__left {
      display: flex;
      align-items: center;

      img {
        margin-right: 18px;
      }
    }

    &__open-icon {
      height: 32px;
    }
  }

  .body {
    height: 0;
    transition: all 1s ease;
    overflow: hidden;
    padding: 0 38px;

    @media screen and (max-width: 1000px) {
      padding: 0;
    }

    @media screen and (max-width: 500px) {
      text-align: center;
    }
  }

  .isOpen1 {
    margin-top: 40px;
    height: 630px;
  }

  .isOpen2 {
    margin-top: 40px;
    height: 270px;
  }

  .isOpen3 {
    margin-top: 40px;
    height: 600px;
  }

  .isOpen4 {
    margin-top: 40px;
    height: 310px;
  }

  .isOpen5 {
    margin-top: 40px;
    height: 900px;
  }

  .isOpen6 {
    margin-top: 40px;
    height: 750px;
  }

  .isOpen7 {
    height: 250px;
    padding: 0;
  }

  @media screen and (max-width: 1300px) {
    .isOpen1 {
      height: 690px;
    }

    .isOpen2 {
      height: 420px;
    }

    .isOpen3 {
      height: 600px;
    }

    .isOpen4 {
      height: 370px;
    }

    .isOpen5 {
      height: 1000px;
    }

    .isOpen6 {
      height: 750px;
    }

    .isOpen7 {
      height: 390px;
    }
  }

  @media screen and (max-width: 1000px) {
    .isOpen1 {
      height: 1110px;
    }

    .isOpen2 {
      height: 590px;
    }

    .isOpen3 {
      height: 900px;
    }

    .isOpen4 {
      height: 370px;
    }

    .isOpen5 {
      height: calc(1300px - 50vw);
    }

    .isOpen6 {
      height: 800px;
    }
  }

  @media screen and (max-width: 500px) {
    .isOpen1 {
      height: 1160px;
    }

    .isOpen2 {
      height: 900px;
    }

    .isOpen3 {
      height: 1050px;
      text-align: left !important;
    }

    .isOpen4 {
      height: 710px;
      text-align: left !important;
    }

    .isOpen5 {
      height: calc(2750px - 350vw);
      text-align: left !important;
    }

    .isOpen7 {
      height: 610px;
    }
  }

  @media screen and (max-width: 375px) {
    .isOpen5 {
      height: calc(2750px - 390vw);
    }
  }

  @media screen and (max-width: 320px) {
    .isOpen1 {
      height: 1240px;
    }
  }

  .btn-line {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 48px;

    &__btn {
      background: ${({theme}) => theme.purple};
      border-radius: 4px;
      width: 245px;
      height: 48px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      user-select: none;
      font-family: 'IBM Plex Sans', Arial, sans-serif;
      font-style: normal;
      font-weight: 500;
      font-size: 14px;
      line-height: 18px;
      text-align: center;
      letter-spacing: 0.02em;
      color: ${({theme}) => theme.white};
      margin: 0 30px;

      &:hover,
      &:focus {
        box-shadow: ${({ theme }) => theme.purpleBoxShadow};
      }
    }

    &__line {
      width: 200px;
      height: 1px;
      background: #dbdede;
    }

    @media screen and (max-width: 600px) {
      display: block;
      height: auto;

      &__btn {
        margin: 0 auto 16px auto !important;
      }

      &__line {
        display: none;
      }
    }
  }

  .hidden {
    display: none;
  }

  .blink1-text {
    -webkit-animation: blink1 3s linear infinite;
    animation: blink1 3s linear infinite;
  }

  @-webkit-keyframes blink1 {
    0% {
      color: rgba(34, 34, 34, 1);
    }
    50% {
      color: rgba(34, 34, 34, 0);
    }
    100% {
      color: rgba(34, 34, 34, 1);
    }
  }

  @keyframes blink1 {
    0% {
      color: rgba(255, 255, 255, 1);
    }
    50% {
      color: rgba(255, 255, 255, 0);
    }
    100% {
      color: rgba(255, 255, 255, 1);
    }
  }
`;

export default (props: AccordionProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleSwitchAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Body>
      <div className="header" onClick={handleSwitchAccordion}>
        <div className="header__left">
          <img src={Question} alt="" />
          <div className={`h4 ${props.headerClass}`}>{props.header}</div>
        </div>
        <div className="header__open-icon">
          <img src={isOpen ? ArrowUp : ArrowDown} alt="" />
        </div>
      </div>
      <div className={`body ${isOpen ? props.openClass : ''}`}>{props.children}</div>
      {(props.btnText || props.btnSecondText) && (
        <div className={`btn-line ${isOpen ? '' : 'hidden'}`}>
          <div className="btn-line__line" />
          {props.btnText && (
            <div className="btn-line__btn" onClick={props.btnClick}>
            {props.btnText}
          </div>
          )}
          {props.btnSecondText && (
            <div className="btn-line__btn" onClick={props.btnSecondClick}>
              {props.btnSecondText}
            </div>
          )}
          <div className="btn-line__line" />
        </div>
      )}
    </Body>
  );
};
