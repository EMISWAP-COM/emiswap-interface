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
  openClass: string;
}

const Body = styled.div`
  background: #ffffff;
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
    color: #000000;

    @media screen and (max-width: 600px) {
      font-size: 16px;
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
    height: 440px;
  }

  .isOpen4 {
    margin-top: 40px;
    height: 310px;
  }

  @media screen and (max-width: 1300px) {
    .isOpen1 {
      height: 690px;
    }

    .isOpen2 {
      height: 420px;
    }

    .isOpen3 {
      height: 460px;
    }

    .isOpen4 {
      height: 370px;
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
      height: 680px;
    }

    .isOpen4 {
      height: 370px;
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
      height: 1150px;
    }

    .isOpen4 {
      height: 710px;
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
      background: #ffd541;
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
      color: #141717;
    }

    &__line {
      width: 200px;
      height: 1px;
      margin: 0 34px;
      background: #dbdede;
    }

    @media screen and (max-width: 600px) {
      &__line {
        display: none;
      }
    }
  }

  .hidden {
    display: none;
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
          <div className="h4">{props.header}</div>
        </div>
        <div className="header__open-icon">
          <img src={isOpen ? ArrowUp : ArrowDown} alt="" />
        </div>
      </div>
      <div className={`body ${isOpen ? props.openClass : ''}`}>{props.children}</div>
      {props.btnText && (
        <div className={`btn-line ${isOpen ? '' : 'hidden'}`}>
          <div className="btn-line__line" />
          <div className="btn-line__btn" onClick={props.btnClick}>
            {props.btnText}
          </div>
          <div className="btn-line__line" />
        </div>
      )}
    </Body>
  );
};
