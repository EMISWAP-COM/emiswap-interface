import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import Slider from 'react-slick';

import LogoSvg from '../../assets/svg/logo.svg';
import AboutSvg from '../../assets/landing/header/about.svg';
import CommunitySvg from '../../assets/landing/header/community.svg';
// import FarmsSvg from '../../assets/landing/header/farms.svg';
import TeamSvg from '../../assets/landing/header/team.svg';
import PiePng from '../../assets/landing/pie.png';
import Apr365PiePng from '../../assets/landing/apr/360-pie.png';
import Apr025PiePng from '../../assets/landing/apr/025-pie.png';
import Apr1000PiePng from '../../assets/landing/apr/1000-pie.png';
import Apr2000Png from '../../assets/landing/apr/2000.png';
// import AprLinePng from '../../assets/landing/apr/line.png';
import GitHubPng from '../../assets/landing/socials/github.png';
import MediumPng from '../../assets/landing/socials/medium.png';
import TelegramPng from '../../assets/landing/socials/telegram.png';
import TwitterPng from '../../assets/landing/socials/twitter.png';
import Step1Png from '../../assets/landing/steps/step1.png';
import Step2Png from '../../assets/landing/steps/step2.png';
import Step3Png from '../../assets/landing/steps/step3.png';
import Step4Png from '../../assets/landing/steps/step4.png';
import AndrePng from '../../assets/landing/team/andre.png';
import GregPng from '../../assets/landing/team/greg.png';
import IsmailPng from '../../assets/landing/team/ismail.png';
import JuliaPng from '../../assets/landing/team/julia.png';
import MarinaPng from '../../assets/landing/team/marina.png';
// import RuslanPng from '../../assets/landing/team/ruslan.png';
import PolygonCardPng from '../../assets/landing/polygon-card.png';
import SocialsCardPng from '../../assets/landing/socials-card.png';
import SlideArrowSvg from '../../assets/landing/slide-arrow.svg';
import rangesSvg from '../../assets/landing/ranges.svg';
import linesSvg from '../../assets/landing/lines.svg';
import gruelBg from '../../assets/landing/gruel-bg.png';

import alphaLogo from '../../assets/landing/partners/alpha.png';
import bitmartLogo from '../../assets/landing/partners/bitmart.png';
import digifinexLogo from '../../assets/landing/partners/digifinex.png';
import emirexLogo from '../../assets/landing/partners/emirex.png';
import kukoinLogo from '../../assets/landing/partners/kukoin.png';
import everestLogo from '../../assets/landing/partners/logo.png';
import movrLogo from '../../assets/landing/partners/movr.png';
import nearLogo from '../../assets/landing/partners/near.png';
import polygonLogo from '../../assets/landing/partners/polygon.png';
import shidenLogo from '../../assets/landing/partners/shiden.png';
import uboostLogo from '../../assets/landing/partners/uboost.png';
import unilendLogo from '../../assets/landing/partners/unilend.png';
import yieldLogo from '../../assets/landing/partners/yield.png';
import listDotSvg from '../../assets/svg/list-dot.svg';
import listDotVioletSvg from '../../assets/svg/list-dot-violet.svg';
import hackenSvg from '../../assets/landing/header/hacken.svg';
import blueswarmSvg from '../../assets/landing/header/blueswarm.svg';
import { useActiveWeb3React } from '../../hooks';
import Modal from './Modal';

const Body = styled.div`
  width: 100vw;
  min-height: 110vh;
  position: absolute;
  top: 0;
  right: 0;
  background: #0f0f13;
  
  hr {
    height: 1px; 
    border: none;
    background-color: #393946;
    color: #393946;
  }
  
  .btn-primary {
    min-width: 150px;
    padding: 8px 24px;
    border: none;
    outline: none;
    border-radius: 4px;
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    background: #7A2DF4;
    color: #FFFFFF;
    box-shadow: none;
    cursor: pointer;
  }
  
  .landing-wrapper {
    max-width: 1480px;
    margin: auto;
  }
  
  .section__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 38px;
  }
  
  .section__title {
    font-style: normal;
    font-weight: normal;
    font-size: 32px;
    line-height: 40px;
    color: #FFFFFF;
  }
  
  .section__card {
  }
    
  .header {
    z-index: 100;
    position: fixed;
    display: flex;
    align-items: center;
    width: 100%;
    max-width: 1480px;
    padding: 20px 80px;
    background: #0f0f13;
 
    @media screen and (max-width: 950px) {
      display: block;
      padding: 20px 0 0 0;
      background-color: #0f0f13;

      :after {
        content: '';
        height: 1px;
        width: 100%;
        display: block;
        background: #606068;
      }
    }
    
    .logo {
      margin-right: 100px;

      @media screen and (max-width: 950px) {
        margin-left: 20px;
      }
    }

    .start-earing-btn {
      @media screen and (max-width: 950px) {
        display: none;
      }
    }
   
    .nav {
      display: flex;
      margin-bottom: 4px;
      
      @media screen and (max-width: 950px) {
        justify-content: space-between;
        margin: 24px -12px 4px -12px;
        padding: 0 20px 12px 20px;
      }
      
      &__link {
        display: flex;
        padding: 0 8px;
        margin-right: 20px;
        text-decoration: none !important;
        
        @media screen and (max-width: 769px) {
          padding: 0 12px 12px 12px;
          margin-right: 0;
        }
        
        &--active {
          padding-bottom: 10px;
          border-bottom: 2px solid #E478FF;
        }
        
      }
      
      &__img {
        max-width: 100%;
        margin-right: 10px;
        filter: brightness(100);
        
        @media screen and (max-width: 950px) {
          display: none;
        }
        
      }
      
      &__name {
        font-weight: 500;
        font-size: 16px;
        line-height: 24px;
        color: #FFFFFF !important;
      }
    
    }
   
  }
  
  .banner {
    display: flex;
    justify-content: space-between;
    padding: 225px 80px;
    background-image: url('${gruelBg}');
    background-position-y: 45px;
    
    @media screen and (max-width: 769px) {
      display: block;
      padding: 210px 20px 45px 20px;
    }
    
    &__info {
      max-width: 80%;
      padding-bottom: 48px;
      white-space: pre-line;
      
       @media screen and (max-width: 769px) {
          max-width: 100%;
          padding-bottom: 38px;
       }
      
    }
    
    &__title {
      padding-top: 24px;
      padding-bottom: 38px;
      font-style: normal;
      font-weight: normal;
      font-size: 48px;
      line-height: 56px;
      color: #FFFFFF;
      
      @media screen and (max-width: 769px) {
        font-size: 36px;
        line-height: 44px;
      }
      
    }
    
    &__desc {
      padding-bottom: 24px;
      font-style: normal;
      font-weight: normal;
      font-size: 24px;
      line-height: 32px;
      color: #FFFFFF;
      
      @media screen and (max-width: 769px) {
        font-size: 24px;
        line-height: 32px;
      }
    }

    &__audited {
      display: flex;
      margin-top: 34px;
      font-size: 12px;
      color: #FFFFFF;

      > img {
        margin: 0 8px;
      }
    }
    
    .chart {
      display: flex;
      border: 1px solid rgba(255, 255, 255, 0.24);
      border-radius: 16px;
      backdrop-filter: blur(48px);
      
      @media screen and (max-width: 769px) {
         display: block;
         background-color: #18181c;
      }

      &__list-dot {
        margin-left: -16px;
        margin-bottom: 1px;
        margin-right: 8px;
      }
      
      &__pie {
        padding: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      
      &__pie-img {
        max-width: 100%;
      }
      
      &__stats {
        padding: 24px;

         
        @media screen and (max-width: 769px) {
          display: grid;
          grid-template-columns: 1fr 1fr; 
          grid-template-rows: 1fr 1fr; 
        }
      }
      
      &__stat-item {
        padding-bottom: 24px;
      }
  
      &__stat-name {
        padding-bottom: 8px;
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        line-height: 24px;
        color: #B589FA;
      }
      
      &__percent {
        font-style: normal;
        font-weight: bold;
        font-size: 32px;
        line-height: 40px;
        color: #FFFFFF;
      }
    }
    
  }
  
  .numbers {
     margin: 25px 54px;
     padding: 24px;
     border-radius: 8px;
     background: #19191c;
     
     @media screen and (max-width: 769px) {
       margin: 25px 20px;
     }
     
     &__btn-analytics-top {
       @media screen and (max-width: 769px) {
          display: none;
       }
     }
     
     &__btn-analytics-bottom {
        display: none;
        
        @media screen and (max-width: 769px) {
          display: block;
          width: 100%;
          margin-top: 32px;
          margin-bottom: 12px;
        }
     }
     
     &__list {
       display: flex;
       margin: 0 -14px;
       
        @media screen and (max-width: 769px) {
          display: block;
          margin: 0;
        }
       
     }
     
     &__card {
        flex: 1;
        padding: 24px 20px;
        margin: 16px 14px;
        border: 1px solid rgba(255, 255, 255, 0.24);
        border-radius: 16px;
        background: #27272E;
        backdrop-filter: blur(48px);
        
        @media screen and (max-width: 769px) {
          margin: 16px 0;
        }
        
     }
     
     &__value {
        margin-bottom: 20px;
        font-weight: normal;
        font-size: 48px;
        line-height: 56px;
        color: #FFFFFF;
     }
     
     &__desc {
        margin-top: 12px;
        font-weight: 500;
        font-size: 18px;
        line-height: 30px;
        color: #FFFFFF;
     }
  }
  
  .apr {
    margin: 96px 64px;
    
     @media screen and (max-width: 769px) {
        margin: 60px 20px;
     }

    &__button-more {
      float: right;

      @media screen and (max-width: 1040px) {
        display: none;
      }

      &--bottom {
        display: none;

        @media screen and (max-width: 1040px) {
          display: block;
          margin: 60px auto 20px;
          float: none;
        }
      }
    }
    
    &__top {
      display: flex;
      justify-content: center;
    }
    
    &__state {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: flex-end;
    }
    
    &__state-label {
      margin-bottom: 42px;
      font-weight: normal;
      font-size: 18px;
      line-height: 24px;
      color: #B7B7CA;
      
      @media screen and (max-width: 1064px) {
        /* display: none; */
        position: absolute;
        top: -20px;

        &:first-of-type {
          left: 0;
        }
        &:last-of-type {
          right: 0;
        }
      }
      
    }
    
    &__value-img {
      max-width: 100%;
      
      @media screen and (max-width: 769px) {
        max-width: calc(100% + 32px);
        margin-left: -16px;
      }
      
    }
    
    &__line-img {
      display: block; 
      max-width: 100%;
      
      @media screen and (max-width: 1064px) {
        display: none;
      }
    }
    
    &__list {
      display: flex;
      
      @media screen and (max-width: 1064px) {
        display: block;
        margin: 0;
      }
      
    }
    
    &__card {
      display: flex;
      flex: 1;
      margin: 0 12px 12px 12px;
      padding: 16px;
      border: 1px solid #393946;
      border-radius: 8px;
      background: #27272E;
      
      @media screen and (max-width: 769px) {
        margin: 12px 0;
      }
      
    }
    
    &__card-text {
      margin-left: 24px;
      font-weight: normal;
      font-size: 16px;
      line-height: 24px;
      color: #FFFFFF;
    }
    
    &__card-pie-img {
      &__wrapper {
        display: flex;
        align-items: center;
      }

      @media screen and (max-width: 769px) {
        width: 96px;
        height: 96px;
      }
    }
    
  }
  
  .about {
    display: flex;
    margin: 96px 80px;
    
    @media screen and (max-width: 769px) {
      flex-wrap: wrap;
      margin: 0 20px;
    }
    
    &__card-list {
      flex: 1;
      margin-right: 70px;
      
      @media screen and (max-width: 769px) {
        order: 2;
        flex: auto;
        width: 100%;
        margin: 0;
      }

      &__offset {
        display: grid;
        grid-template-columns: 0fr 1fr; 
        grid-template-rows: 1fr 1fr; 
        gap: 0px 0px; 
        grid-template-areas: 
          "left top"
          "left bottom";

        &__img {
          grid-area: left;
          margin-top: -26px;
          padding-left: 28px;
        }
      }

      .top { grid-area: top; }
      .bottom { grid-area: bottom; }
    }
    
    &__card {
      margin-bottom: 24px;
      padding: 16px;
      border: 1px solid #393946;
      border-radius: 8px;
      background: #27272E;

      position: relative;

      &__pennon {
        height: 8px;
        position: absolute;
        border-top-left-radius: 8px;
        width: 56px;
        top: -2px;
        left: 0;

        &.turquoise{
          border-top: 2px solid #37FFDB;
        }
        &.heliotrope {
          border-top: 2px solid #E478FF;
        }
        &.multi {
          border-top: 2px solid #7B78FF;

          :before {
            content: '';
            position: absolute;
            top: -2px;
            left: 56px;
            width: 56px;
            border-top: 2px solid #37FFDB;
          }
          :after {
            content: '';
            position: absolute;
            top: -2px;
            left: 112px;
            width: 56px;
            border-top: 2px solid #E478FF;
          }
        }
      }
    }
    
    &__card-name {
      margin-bottom: 8px;
      font-weight: 500;
      font-size: 16px;
      line-height: 24px;
      color: #FFFFFF;
    }
    
    &__card-value {
      font-weight: normal;
      font-size: 48px;
      line-height: 56px;
      color: #FFFFFF;
    }
    
    &__info {
      flex: 1;
      margin-top: 50px;
      
      @media screen and (max-width: 769px) {
        order: 1;
        flex: auto;
        width: 100%;
        margin: 0 0 30px 0;
      }
      
    }
    
    &__desc {
      margin-bottom: 24px;
      font-weight: normal;
      font-size: 18px;
      line-height: 32px;
      color: #E8E7EF;
    }
    
    &__info-list {
    
    }
    
    &__info-list-item {
      display: flex;
      margin-bottom: 8px;
      font-size: 18px;
      line-height: 32px;
      color: #FFFFFF;      
    }
    
    &__info-list-item-circle {
      width: 6px;
      height: 6px;
      margin-top: 12px;
      margin-right: 16px;
      border-radius: 50px;
      background: #A871FF;
    }
    
  }
  
  .steps {
    margin: 96px 80px;
    
    @media screen and (max-width: 769px) {
      margin: 45px 20px;
    }
    
    &__list {
      display: flex;
      margin: 0 -14px;
      
      @media screen and (max-width: 769px) {
        display: block;
        margin: 0;
      }
      
    }
    
    .step__card {
      flex: 1;
      margin: 14px;
      border: 1px solid rgba(255, 255, 255, 0.24);
      border-radius: 16px;
      background: #27272E;
      backdrop-filter: blur(48px);
      
      @media screen and (max-width: 769px) {
        margin: 24px 0;
      }
      
    }
    
    .step__img {
      width: 100%;
      max-width: 100%;

      &__wrapper {
        position: relative;

        :after {
          content: '';
          position: absolute;
          bottom: 0;
          width: 100%;
          height: 40px;
          border-top: 1px solid rgba(255,255,255,0.24);
          border-top-left-radius: 16px;
          background-color: red;
          left: 0;
          border-top-right-radius: 16px;
          background-color: #27272e;
        }
      }
    }
    
    .step__info {
      padding: 0 24px 24px 24px;
    }
    
    .step__name {
      margin-bottom: 12px;
      font-weight: 500;
      font-size: 18px;
      line-height: 30px;
      color: #FFFFFF;
    }
    
    .step__desc {
      margin-top: 12px;
      font-style: normal;
      font-weight: normal;
      font-size: 16px;
      line-height: 28px;
      color: #E8E7EF;
    }
    
  }
  
  .socials {
    display: flex;
    margin: 96px 56px;
    border-radius: 8px;
    border: 1px solid #393946;
    border-left: none;
    background: #19191c;
    
    @media screen and (max-width: 769px) {
      display: block;
      margin: 60px 20px;
    }
    
    &__image {
    
    }
    
    &__img {
      display: block;
      height: 100%;
      max-width: 100%;
      
      @media screen and (max-width: 769px) {
        height: initial;
      }
    }
    
    &__links {
      padding: 24px 24px 24px 65px;
        
      @media screen and (max-width: 769px) {
        padding: 24px;
      }
    }
    
    &__list {
      display: flex;
      flex-wrap: wrap;
      
      @media screen and (max-width: 769px) {
        display: block;
        margin: 0;
      }
      
    }
    
    .social__card {
      display: flex;
      justify-content: space-between;
      width: calc(50% - 16px);
      margin: 8px;
      padding: 12px 16px;
      border: 1px solid rgba(255, 255, 255, 0.24);
      border-radius: 8px;
      background: #27272E;
      
      @media screen and (max-width: 769px) {
        width: 100%;
        padding: 16px;
        margin: 16px 0;
      }
     
    }
    
    .social__name {
      margin-bottom: 14px;
      font-weight: 500;
      font-size: 18px;
      line-height: 24px;
      color: #FFFFFF;
    }
    
    .social__join-link {
      display: block;
      min-width: 105px;
      border: 1px solid #615C69;
      border-radius: 29px;
      font-size: 14px;
      line-height: 24px;
      text-align: center;
      text-decoration: none !important;
      color: #FFFFFF;
    }
    
  }
  
  .team {
    margin: 96px 80px;
    // overflow: hidden;
    
    @media screen and (max-width: 769px) {
      margin: 60px 20px;
    }
    
    &__slider {
      // display: flex;
      // margin: 0 -14px;
      
      @media screen and (max-width: 769px) {
        // display: block;
        // margin: 0;
      }
      
    }
    
    &__slider-buttons--top {
       @media screen and (max-width: 769px) {
        display: none;
      }
    }
    
    &__slider-buttons--bottom {
       display: none;
       
       @media screen and (max-width: 769px) {
        display: flex;
        justify-content: center;
        margin-right: 40px;
        margin-top: 24px;
      }
    }
    
    
    &__slider-btn {
      height: 40px;
      width: 40px;
      margin-left: 24px;
      border: none;
      outline: none;
      border-radius: 50px;
      background: #27272E;
      box-shadow: none;
      cursor: pointer;
      
      @media screen and (max-width: 769px) {
      }
      
    }
    
    &__slider-btn-icon {
      margin-top: 2px;
    }
    
    &__slider-btn-icon--left {
      transform: rotate(180deg);
      margin-right: 4px;
    }
    
    &__person-card {
      position: relative;
      padding: 14px;
      border-radius: 16px;
      width: 200px;
      overflow-y: hidden;
    }
    
     &__person-img {
        max-width: 100%;
     }
    
    &__person-info {
      z-index: 10;
      position: relative;
      max-width: 310px;
      margin-top: -24px;
      padding: 16px 20px 24px 20px;
      border: 1px solid rgba(255, 255, 255, 0.24);
      border-radius: 16px;
      background: #27272E;
    }
    
    &__person-name {
      padding-bottom: 12px;
      font-weight: 500;
      font-size: 24px;
      line-height: 30px;
      color: #FFFFFF;
    }
    
    &__person-desc {
      font-weight: normal;
      font-size: 16px;
      line-height: 28px;
      color: #E8E7EF;
    }
  }

  .partners {
    margin: 96px 80px;

    @media screen and (max-width: 769px) {
      margin: 45px 20px;
    }

    .partners__list > div {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 45px 0;

      @media screen and (max-width: 1064px) {
        display: grid;
        grid-template-columns: 1fr 1fr; 
        grid-template-rows: 1fr 1fr; 
        justify-items: center;
        padding: 0;

        > img {
          width: 80%;
          padding: 24px 0;
        }
      }
    }
  }

  .polygon {
    display: flex;
    margin: 96px 56px;
    border-radius: 8px;
    border: 1px solid #393946;
    background: #19191c;
    align-items: center;
    
    @media screen and (max-width: 769px) {
      display: block;
      margin: 60px 20px;
    }
    
    &__info {
      padding: 24px;
    }
    
    &__desc {
      margin-bottom: 24px;
      font-weight: normal;
      font-size: 18px;
      line-height: 32px;   
      color: #E8E7EF;
    }
    
    &__img {
      display: block;
      height: 100%;
      max-width: 100%;
      
      @media screen and (max-width: 769px) {
        height: initial;
      }
    }
  }
`;

export default function Landing({ history }: any) {
  const sliderRef = useRef<any>();
  const [t] = useTranslation();

  const [modalOpened, toggleModal] = useState(false);


  const onDissmiss = () => {
    toggleModal(!modalOpened);
  }

  const { connector } = useActiveWeb3React();

  const handleClickTeamNext = () => {
    sliderRef.current.slickNext();
  };

  const handleClickTeamPrev = () => {
    sliderRef.current.slickPrev();
  };

  const changeChainToPolygon = async () => {
    const provider = await connector.getProvider();

    provider.request({
      "jsonrpc": "2.0",
      "method": "wallet_switchEthereumChain",
      "params": [
        {
          "chainId": "0x89"
        }
      ],
      "id": 0
    })
  };

  // const changeLanguage = (lng) => () => {
  //   console.log('CHANGE LANG to', lng)
  //   // @ts-ignore
  //   i18n.changeLanguage(lng);
  // };

  const sliderSettings = {
    arrows: false,
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    // initialSlide: 0,
    responsive: [
      {
        breakpoint: 769,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
    ],
  };

  return (
    <>
      <Modal isOpen={modalOpened} onDissmiss={onDissmiss} />
      <Body>

        <div className="landing-wrapper">
          <section className="header">
            <a className="logo" href="/">
              <img className="logo__img" src={LogoSvg} alt="" />
            </a>
            <div className="nav">
              <a className="nav__link" href="#about">
                <img className="nav__img" src={AboutSvg} alt="" />
                <div className="nav__name">{t('about')}</div>
              </a>
              {/* <a className="nav__link" href="#farms">
              <img className="nav__img" src={FarmsSvg} alt=""/>
              <div className="nav__name">Top Farms</div>
            </a> */}
              <a className="nav__link" href="#community">
                <img className="nav__img" src={CommunitySvg} alt="" />
                <div className="nav__name">Community</div>
              </a>
              <a className="nav__link" href="#team">
                <img className="nav__img" src={TeamSvg} alt="" />
                <div className="nav__name">Team</div>
              </a>
              {/* <div onClick={changeLanguage('es-US')}>ES</div>
            <div onClick={changeLanguage('en')}>EN</div> */}
            </div>
            <button
              className="btn-primary start-earing-btn"
              onClick={() => {
                changeChainToPolygon();
                window.open('https://emiswap.com/pool');
              }}
              style={{ marginLeft: 'auto' }}
            >
              Start Earning
            </button>
            <div className="lang"></div>
          </section>
          <section id="about" className="banner">
            <div className="banner__info">
              <div className="banner__title">
                {t('bannerTitle')}
              </div>
              <div className="banner__desc">
                EmiSwap is live on Polygon<br /> – this is your chance to earn even more
              </div>
              <div className="banner__buttons">
                <button
                  className="btn-primary"
                  style={{ marginRight: 24 }}
                  // onClick={() =>  history.push('/pool')}
                  onClick={() => window.open('https://emiswap.com/pool')}
                >
                  Connect wallet
                </button>
                <button
                  className="btn-primary"
                  onClick={() => {
                    changeChainToPolygon();
                    window.open('https://emiswap.com/pool');
                  }}
                >
                  Start earning
                </button>
              </div>
              <div className="banner__audited">
                Audited by: <img src={hackenSvg} alt="" /> & <img src={blueswarmSvg} alt="" />
              </div>
            </div>
            <div className="chart">
              <div className="chart__pie">
                <img className="chart__pie-img" src={PiePng} alt="" />
              </div>
              <div className="chart__stats">
                <div className="chart__stat-item">
                  <div className="chart__stat-name">
                    <img className="chart__list-dot" src={listDotSvg} alt="" />
                    Liquidity supply
                  </div>
                  <div className="chart__percent">365%</div>
                </div>
                <div className="chart__stat-item">
                  <div className="chart__stat-name" style={{ color: '#7A2DF4' }}>
                    <img className="chart__list-dot" src={listDotVioletSvg} alt="" />
                    Farming
                  </div>
                  <div>(coming on 17 Nov)</div>
                  <div>up to</div>
                  <div className="chart__percent">1000%</div>
                </div>
                <div className="chart__stat-item">
                  <div className="chart__stat-name" style={{ color: '#E478FF' }}>
                    <img className="chart__list-dot" src={listDotSvg} alt="" />
                    Swap commision
                  </div>
                  <div>from volume</div>
                  <div className="chart__percent">0,25%</div>
                </div>
              </div>
            </div>
          </section>
          <section className="numbers">
            <div className="section__card">
              <div className="section__header">
                <div className="section__title">EmiSwap in Numbers</div>
                <button
                  className="btn-primary numbers__btn-analytics-top"
                  onClick={() => window.open('https://emiswap.com/analytics/home?network=polygon')}
                >
                  Go to Analytics
                </button>
              </div>
              <div className="numbers__list">
                <div className="numbers__card">
                  <div className="numbers__value">$393K</div>
                  <hr />
                  <div className="numbers__desc">Total Value Locked</div>
                </div>
                <div className="numbers__card">
                  <div className="numbers__value">$3M</div>
                  <hr />
                  <div className="numbers__desc">Total Trading Volume</div>
                </div>
                <div className="numbers__card">
                  <div className="numbers__value">83K</div>
                  <hr />
                  <div className="numbers__desc">Unique Users</div>
                </div>
                <div className="numbers__card">
                  <div className="numbers__value">3K</div>
                  <hr />
                  <div className="numbers__desc">All-Time Trades</div>
                </div>
              </div>
              <button
                className="btn-primary numbers__btn-analytics-bottom"
                onClick={() => window.open('https://emiswap.com/analytics/home?network=polygon')}
              >
                Go to Analytics
              </button>
            </div>
          </section>

          <section className="apr">
            <button
              className="btn-primary apr__button-more"
              onClick={() => toggleModal(true)}
            >
              Learn More
            </button>
            <div className="apr__top">
              <div>
                <div className="apr__state">
                  <div className="apr__state-label">up to</div>
                  <div className="apr__value">
                    <img className="apr__value-img" src={Apr2000Png} alt="" />
                  </div>
                  <div className="apr__state-label">APR</div>
                </div>
                <img className="apr__line-img" src={rangesSvg} alt="" />
              </div>
            </div>
            <div className="apr__list">
              <div className="apr__card">
                <div className="apr__card-pie-img__wrapper">
                  <img className="apr__card-pie-img" src={Apr365PiePng} alt="" />
                </div>
                <div className="apr__card-text">
                  365% APR: our special Airdrop for EmiSwap LPs on Polygon. Earn additional 1% per day for providing
                  liquidity.
                </div>
              </div>
              <div className="apr__card">
                <div className="apr__card-pie-img__wrapper">
                  <img className="apr__card-pie-img" src={Apr1000PiePng} alt="" />
                </div>
                <div className="apr__card-text">
                  Provide Liquidity and stake LP tokens in Farming pools with up to 1000% APR to multiply your rewards.
                </div>
              </div>
              <div className="apr__card">
                <div className="apr__card-pie-img__wrapper">
                  <img className="apr__card-pie-img" src={Apr025PiePng} alt="" />
                </div>
                <div className="apr__card-text">
                  0.25% of the trading volume in any pool is distributed between Liquidity Providers.
                </div>
              </div>
            </div>
            <button
              className="btn-primary apr__button-more apr__button-more--bottom"
              onClick={() => toggleModal(true)}
            >
              Learn More
            </button>
          </section>
          <section className="about">
            <div className="about__card-list">
              <div className="about__card">
                <div className="about__card__pennon multi" />
                <div className="about__card-name">Swapping fee for all pools</div>
                <div className="about__card-value">0,30%</div>
              </div>
              <div className="about__card-list__offset">
                <div className="about__card-list__offset__img">
                  <img src={linesSvg} alt="" />
                </div>
                <div className="about__card top">
                  <div className="about__card__pennon turquoise" />
                  <div className="about__card-name">LP reward rate</div>
                  <div className="about__card-value">0,25%</div>
                </div>
                <div className="about__card bottom">
                  <div className="about__card__pennon heliotrope" />
                  <div className="about__card-name">Distributed among ESW holders</div>
                  <div className="about__card-value">0,05%</div>
                </div>
              </div>
            </div>
            <div className="about__info">
              <div className="section__header">
                <div className="section__title about__title">About EmiSwap</div>
              </div>
              <div className="about__desc">
                EmiSwap is an audited cross-chain AMM with higher rewards for LPs than on any other DEX.
              </div>
              <div className="about__info-list">
                <div className="about__info-list-item">
                  <div className="about__info-list-item-circle" />
                  <span>100% of gas fees reimbursed (Ethereum)</span>
                </div>
                <div className="about__info-list-item">
                  <div className="about__info-list-item-circle" />
                  <span>Available on Polygon, Ethereum, and KuCoin Blockchain</span>
                </div>
                <div className="about__info-list-item">
                  <div className="about__info-list-item-circle" />
                  <span>Audited by Hacken and BluSwarm</span>
                </div>
              </div>
            </div>
          </section>
          <section className="steps">
            <div className="section__header">
              <div className="section__title">4 Easy Steps to Big Rewards</div>
            </div>
            <div className="steps__list">
              <div className="step__card">
                <div className="step__img__wrapper">
                  <img className="step__img" src={Step1Png} alt="" />
                </div>
                <div className="step__info">
                  <div className="step__name">01. Connect your wallet</div>
                  <hr />
                  <div className="step__desc">
                    EmiSwap supports MetaMask, Coinbase, Fortmatic, Portis & more
                  </div>
                </div>
              </div>
              <div className="step__card">
                <div className="step__img__wrapper">
                  <img className="step__img" src={Step2Png} alt="" />
                </div>
                <div className="step__info">
                  <div className="step__name">02. Pick a pool</div>
                  <hr />
                  <div className="step__desc">
                    Use ‘Add Liquidity’ tab to supply crypto to the pool
                  </div>
                </div>
              </div>
              <div className="step__card">
                <div className="step__img__wrapper">
                  <img className="step__img" src={Step3Png} alt="" />
                </div>
                <div className="step__info">
                  <div className="step__name">03. Get LP tokens</div>
                  <hr />
                  <div className="step__desc">
                    LP tokens are issued automatically. Use them to farm & earn even more
                  </div>
                </div>
              </div>
              <div className="step__card">
                <div className="step__img__wrapper">
                  <img className="step__img" src={Step4Png} alt="" />
                </div>
                <div className="step__info">
                  <div className="step__name">04. Start earning</div>
                  <hr />
                  <div className="step__desc">
                    Use the ‘Farming’ tab to stake LP tokens & earn $ESW rewards
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section id="community" className="socials">
            <div className="socials__image">
              <img className="socials__img" src={SocialsCardPng} alt="" />
            </div>
            <div className="socials__links">
              <div className="section__header">
                <div className="section__title">Join EmiSwap Community</div>
              </div>
              <div className="socials__list">
                <div className="social__card">
                  <div>
                    <div className="social__name">Twitter</div>
                    <a
                      href="https://twitter.com/emiswap"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social__join-link"
                    >
                      Join now
                    </a>
                  </div>
                  <div>
                    <img className="social__icon-img" src={TwitterPng} alt="" />
                  </div>
                </div>
                <div className="social__card">
                  <div>
                    <div className="social__name">Telegram</div>
                    <a
                      href="https://t.me/emiswap_official"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social__join-link"
                    >
                      Join now
                    </a>
                  </div>
                  <div>
                    <img className="social__icon-img" src={TelegramPng} alt="" />
                  </div>
                </div>
                <div className="social__card">
                  <div>
                    <div className="social__name">Medium</div>
                    <a
                      href="https://medium.com/emiswap"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social__join-link"
                    >
                      Join now
                    </a>
                  </div>
                  <div>
                    <img className="social__icon-img" src={MediumPng} alt="" />
                  </div>
                </div>
                <div className="social__card">
                  <div>
                    <div className="social__name">GitHub</div>
                    <a
                      href="https://github.com/EMISWAP-COM"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social__join-link"
                    >
                      Join now
                    </a>
                  </div>
                  <div>
                    <img className="social__icon-img" src={GitHubPng} alt="" />
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section id="partners" className="partners">
            <div className="section__header">
              <div className="section__title">Partners & Investors</div>
            </div>
            <div className="partners__list">
              <div>
                <img src={emirexLogo} alt="Emirex" />
                <img src={bitmartLogo} alt="BitMart" />
                <img src={everestLogo} alt="Everest" />
                <img src={digifinexLogo} alt="Digifinex" />
              </div>
              <div>
                <img src={nearLogo} alt="Near" />
                <img src={movrLogo} alt="Movr" />
                <img src={kukoinLogo} alt="Kukoin" />
                <img src={shidenLogo} alt="Shiden" />
                <img src={uboostLogo} alt="Uboost" />
              </div>
              <div>
                <img src={alphaLogo} alt="Alpha" />
                <img src={unilendLogo} alt="Unilend" />
                <img src={yieldLogo} alt="Yield" />
                <img src={polygonLogo} alt="Polygon" />
              </div>
            </div>
          </section>
          <section id="team" className="team">
            <div className="section__header">
              <div className="section__title">The EmiSwap team</div>
              <div className="team__slider-buttons team__slider-buttons--top">
                <button className="team__slider-btn" onClick={handleClickTeamPrev}>
                  <img
                    className="team__slider-btn-icon team__slider-btn-icon--left"
                    src={SlideArrowSvg}
                    alt=""
                  />
                </button>
                <button className="team__slider-btn" onClick={handleClickTeamNext}>
                  <img className="team__slider-btn-icon" src={SlideArrowSvg} alt="" />
                </button>
              </div>
            </div>
            <div className="team__slider">
              <Slider ref={sliderRef} {...sliderSettings}>
                <div className="team__person-card">
                  <img className="team__person-img" src={GregPng} alt="" />
                  <div className="team__person-info">
                    <div className="team__person-name">Greg Mars</div>
                    <hr />
                    <div className="team__person-desc">Founder & CEO</div>
                  </div>
                </div>
                <div className="team__person-card">
                  <img className="team__person-img" src={MarinaPng} alt="" />
                  <div className="team__person-info">
                    <div className="team__person-name">Marina Moon</div>
                    <hr />
                    <div className="team__person-desc">Business Development Officer</div>
                  </div>
                </div>
                <div className="team__person-card">
                  <img className="team__person-img" src={AndrePng} alt="" />
                  <div className="team__person-info">
                    <div className="team__person-name">Andre Antares</div>
                    <hr />
                    <div className="team__person-desc">Head of Marketing</div>
                  </div>
                </div>
                <div className="team__person-card">
                  <img className="team__person-img" src={JuliaPng} alt="" />
                  <div className="team__person-info">
                    <div className="team__person-name">Julia Yakubova</div>
                    <hr />
                    <div className="team__person-desc">Marketing Project Manager</div>
                  </div>
                </div>
                {/* <div className="team__person-card">
                <img className="team__person-img" src={RuslanPng} alt=""/>
                <div className="team__person-info">
                  <div className="team__person-name">Ruslan Dimitrov</div>
                  <hr/>
                  <div className="team__person-desc">IT Product Owner</div>
                </div>
              </div> */}
                <div className="team__person-card">
                  <img className="team__person-img" src={IsmailPng} alt="" />
                  <div className="team__person-info">
                    <div className="team__person-name">Ismail Bagosher</div>
                    <hr />
                    <div className="team__person-desc">Business Development Officer</div>
                  </div>
                </div>
                <div className="team__person-card"></div>
              </Slider>
            </div>
            <div className="team__slider-buttons team__slider-buttons--bottom">
              <button className="team__slider-btn" onClick={handleClickTeamPrev}>
                <img
                  className="team__slider-btn-icon team__slider-btn-icon--left"
                  src={SlideArrowSvg}
                  alt=""
                />
              </button>
              <button className="team__slider-btn" onClick={handleClickTeamNext}>
                <img className="team__slider-btn-icon" src={SlideArrowSvg} alt="" />
              </button>
            </div>
          </section>
          <section className="polygon">
            <div className="polygon__info">
              <div className="section__header">
                <div className="section__title">Earn 1% a day on EmiSwap Polygon with 0 effort</div>
              </div>
              <div className="polygon__desc">
                All LPs on EmiSwap Polygon are eligible for the unique 365% APR airdrop. Connect wallet, add liquidity to
                any pool – and get a daily 1% return until November 3, 2022. The first reward distribution is on February
                3, 2022.
              </div>
              <button className="btn-primary" onClick={() => {
                changeChainToPolygon();
                window.open('https://emiswap.com/pool');
              }}>
                Start Earning
              </button>
            </div>
            <img className="polygon__img" src={PolygonCardPng} alt="" />
          </section>
        </div>
      </Body>
    </>
  );
}
