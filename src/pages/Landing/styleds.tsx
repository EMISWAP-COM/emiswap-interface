import styled from 'styled-components';
import gruelBg from '../../assets/landing/gruel-bg.png';

export const Body = styled.div`
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
    padding: 8px 32px;
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

    &.transparent {
      border: 1px solid #7A2DF4;
      background: transparent;
    }
  }
  
  .landing-wrapper {
    max-width: 1480px;
    margin: auto;
    background: url('${gruelBg}') no-repeat  center 80px fixed;
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
   
    .nav {
      display: flex;
      margin-bottom: 4px;
      
      @media screen and (max-width: 950px) {
        justify-content: space-between;
        margin: 24px -12px 4px -12px;
        padding: 0 20px 6px 20px;
      }
      
      &__link {
        position: relative;
        display: flex;
        padding: 0 0 8px 0;
        margin: 0 28px 0 8px;
        text-decoration: none !important;
        
        @media screen and (max-width: 769px) {
          padding: 0 12px 4px 12px;
          margin-right: 0;
        }
        
        &--active {

          :after {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            content: '';
            width: 85%;
            height: 1px;
            border-bottom: 2px solid #E478FF;
            margin: 0 auto;
          }

          img {
            filter: none;
          }
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
  
  .language-switch {
    display: flex;
    align-items: center;
    margin-left: auto;

    @media screen and (max-width: 1160px) {
      position: absolute;
      top: 27px;
      right: 8px;
    }

    @media screen and (max-width: 760px) {
      right: 12px;
    }

    .options {
      display: flex;
      align-items: center;
      color: #fff;
      margin-right: 20px;

      @media screen and (max-width: 760px) {
        margin-right: 0px;
      }

      > div {
        padding: 0 6px;

        &.active {
          color: #e478ff;
        }
      }
    }

    .react-switch {
      border: 1px solid #fff;

      .react-switch-bg {
        background: #0f0f13 !important;
      }
    }

    .btn-earn {
      margin-left: 10px;
      white-space: nowrap;

      @media screen and (max-width: 1380px) {
        display: none;
      }
    }

    .web3-wrapper {
      @media screen and (max-width: 1380px) {
        display: none;
      }
    }
  }

  .banner {
    position: relative;
    display: flex;
    justify-content: space-between;
    padding: 225px 80px;
    
    @media screen and (max-width: 769px) {
      display: block;
      padding: 210px 20px 45px 20px;
    }

    .mobile-web3-buttons {
      display: flex;
      position: absolute;
      justify-content: center;
      top: 120px;
      left: 0;
      right: 0;
      padding: 0 40px;
     
      @media screen and (min-width: 1380px) {
        display: none;
      }

      @media screen and (max-width: 950px) {
        top: 160px;
      }
    }
    .lp_btn-connect {
      background-color: #0f0f13;
      border: 1px solid #7A2DF4;
    }

    &__buttons {
      display: flex;
      justify-content: space-between;
      max-width: 384px;
      height: 48px;
      gap: 24px;

      .btn-primary {
        min-width: 0;
      }

      .lp_referral_button {
        flex: 1;

        > div {
          padding: 0;

          > div {
            margin: 0 !important;
          }

          span {
            white-space: pre;
          }
        }

        button {
          height: 48px;
          padding: 0;
        }
      } 
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
        display: flex;
        flex-direction: column;
        justify-content: space-around;
         
        @media screen and (max-width: 769px) {
          display: grid;
          grid-template-columns: 1fr 1fr; 
          grid-template-rows: 1fr 1fr;
          justify-items: center;
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

      &__percent-label {
        color: #fff;
        font-size: 16px;
        text-transform: lowercase;
        margin-top: 10px;
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
        height: 100%;
        margin: 16px 14px;
        border: 1px solid rgba(255, 255, 255, 0.24);
        border-radius: 16px;
        background: #27272E;
        backdrop-filter: blur(48px);
        
        @media screen and (max-width: 769px) {
          margin: 16px 0;
        }
     }
     
     &__desc {
        background: radial-gradient(92.3% 366.59% at 52.58% 168.45%, #7A2DF4 0%, #A267FF 100%);
        backdrop-filter: blur(48px);
        border-top-left-radius: 16px;
        border-top-right-radius: 16px;
        font-weight: 500;
        font-size: 24px;
        line-height: 78px;
        color: #FFFFFF;
        text-align: center;
        
     }

     &__value {
        margin: 20px 0;
        font-weight: normal;
        font-size: 48px;
        line-height: 56px;
        text-align: center;
        color: #FFFFFF;
     }
  }
  
  .apr {
    margin: 96px 64px;
    
     @media screen and (max-width: 769px) {
        margin: 60px 20px;
     }

    &__button-paper {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 42px;

      @media screen and (max-width: 769px) {
        margin: 32px auto 0;
        width: 100%;
      }

      .btn-icon {
        filter: brightness(100);
        margin-right: 14px;
      }
    }

    &__button-more {
      float: right;

      @media screen and (max-width: 1040px) {
        display: none;
      }

      @media screen and (max-width: 769px) {
        width: 100%;
        margin: 20px auto 20px;
      }

      &--bottom {
        display: none;

        @media screen and (max-width: 1040px) {
          display: block;
          margin: 60px auto 20px;
          float: none;
        }

        @media screen and (max-width: 769px) {
          margin: 20px auto 20px;
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
      text-transform: capitalize;
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
    overflow: hidden;
    
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

    button {
      :first-of-type {
        margin-right: 20px;
      }

      &.apr__button-paper {
        display: inline-flex;
        vertical-align: bottom;
      }

      @media screen and (max-width: 769px) {
        width: 100%;
      }
    }
  }
`;
