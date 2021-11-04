import React from 'react';
import styled from 'styled-components';

import LogoSvg from '../../assets/svg/logo.svg';
import AboutSvg from '../../assets/landing/header/about.svg';
import CommunitySvg from '../../assets/landing/header/community.svg';
import FarmsSvg from '../../assets/landing/header/farms.svg';
import TeamSvg from '../../assets/landing/header/team.svg';
import PiePng from '../../assets/landing/pie.png';
import Apr025PiePng from '../../assets/landing/apr/025-pie.png';
import Apr1000PiePng from '../../assets/landing/apr/1000-pie.png';
import Apr2000Png from '../../assets/landing/apr/2000.png';
import AprLinePng from '../../assets/landing/apr/line.png';
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
import RuslanPng from '../../assets/landing/team/ruslan.png';
import PolygonCardPng from '../../assets/landing/polygon-card.png';
import SocialsCardPng from '../../assets/landing/socials-card.png';

const Body = styled.div`
  width: 100vw;
  min-height: 110vh;
  position: absolute;
  top: 0;
  right: 0;
  background: black;
  
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
   display: flex;
   align-items: center;
   margin: 0 80px;
   padding: 20px 0;
   
   .logo {
      margin-right: 100px;
   }
   
   .nav {
      display: flex;
      margin-bottom: 4px;
      
      &__link {
        display: flex;
        padding: 0 8px;
        margin-right: 20px;
        text-decoration: none !important;
        
        &--active {
          padding-bottom: 10px;
          border-bottom: 2px solid #E478FF;
        }
        
      }
      
      &__img {
        margin-right: 10px;
        filter: brightness(100);
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
    padding: 100px 80px;
    
    &__info {
      max-width: 80%;
      padding-bottom: 48px;
    }
    
    &__title {
      padding-top: 24px;
      padding-bottom: 38px;
      font-style: normal;
      font-weight: normal;
      font-size: 48px;
      line-height: 56px;
      color: #FFFFFF;
    }
    
    &__desc {
      padding-bottom: 24px;
      font-style: normal;
      font-weight: normal;
      font-size: 24px;
      line-height: 32px;
      color: #FFFFFF;
    }
    
    .chart {
      display: flex;
      border: 1px solid rgba(255, 255, 255, 0.24);
      border-radius: 16px;
      backdrop-filter: blur(48px);
      
      &__pie {
        padding: 24px;
      }
      
      &__stats {
        padding: 24px;
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
     
     &__list {
       display: flex;
       margin: 0 -14px;
     }
     
     &__card {
        flex: 1;
        padding: 24px 20px;
        margin: 4px 14px;
        border: 1px solid rgba(255, 255, 255, 0.24);
        border-radius: 16px;
        background: #27272E;
        backdrop-filter: blur(48px);
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
    
    &__top {
      display: flex;
      justify-content: center;
    }
    
    &__state {
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
    }
    
    &__line {
      margin-bottom: 68px;
    }
    
    &__list {
      display: flex;
    }
    
    &__card {
      display: flex;
      flex: 1;
      margin: 12px;
      padding: 16px;
      border: 1px solid #393946;
      border-radius: 8px;
      background: #27272E;
    }
    
    &__card-text {
      margin-left: 24px;
      font-weight: normal;
      font-size: 16px;
      line-height: 24px;
      color: #FFFFFF;
    }
  }
  
  .about {
    display: flex;
    margin: 96px 80px;
    
    &__card-list {
      flex: 1;
      margin-right: 70px;
    }
    
    &__card {
      margin-bottom: 24px;
      padding: 16px;
      border: 1px solid #393946;
      border-radius: 8px;
      background: #27272E;
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
    
    &__list {
      display: flex;
      margin: 0 -14px;
    }
    
    
    .step__card {
      flex: 1;
      margin: 14px;
      border: 1px solid rgba(255, 255, 255, 0.24);
      border-radius: 16px;
      background: #27272E;
      backdrop-filter: blur(48px);
    }
    
    .step__img {
      width: 100%;
    }
    
    .step__info {
      padding: 24px;
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
    
    &__image {
    
    }
    
    &__img {
      display: block;
      height: 100%;
    }
    
    &__links {
        padding: 24px 24px 24px 65px;
    }
    
    &__list {
      display: flex;
      flex-wrap: wrap;
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
    overflow: hidden;
    
    &__slider {
      display: flex;
      margin: 0 -14px;
    }
    
    &__person-card {
      flex: 1;
      margin: 14px;
      // border: 1px solid rgba(255, 255, 255, 0.24);
      border-radius: 16px;
      background: #27272E;
      backdrop-filter: blur(48px);
    }
    
    &__person-info {
       padding: 24px 20px;
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
  
  .polygon {
    display: flex;
    margin: 96px 56px;
    border-radius: 8px;
    border: 1px solid #393946;
    background: #19191c;
    
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
    }
  }
`;

export default function Landing({ history }: any) {
  return (
    <Body>
      <div className="landing-wrapper">
        <section className="header">
          <a className="logo" href="/">
            <img className="logo__img" src={LogoSvg} alt=""/>
          </a>
          <div className="nav">
            <a className="nav__link" href="#about">
              <img className="nav__img" src={AboutSvg} alt=""/>
              <div className="nav__name">About</div>
            </a>
            <a className="nav__link" href="#farms">
              <img className="nav__img" src={FarmsSvg} alt=""/>
              <div className="nav__name">Top Farms</div>
            </a>
            <a className="nav__link" href="#community">
              <img className="nav__img" src={CommunitySvg} alt=""/>
              <div className="nav__name">Community</div>
            </a>
            <a className="nav__link" href="#team">
              <img className="nav__img" src={TeamSvg} alt=""/>
              <div className="nav__name">Team</div>
            </a>
          </div>
          <div className="lang"></div>
        </section>
        <section id="about" className="banner">
          <div className="banner__info">
            <div className="banner__title">
              365% APR and higher<br/> Zero effort<br/> Only on EmiSwap AMM DEX
            </div>
            <div className="banner__desc">
              EmiSwap is live on Polygon<br/> – this is your chance to earn even more
            </div>
            <div className="banner__buttons">
              <button
                className="btn-primary"
                style={{ marginRight: 24 }}
                onClick={() => history.push('/pool')}
              >
                Connect wallet
              </button>
              <button className="btn-primary" onClick={() => history.push('/pool')}>
                Start earning
              </button>
            </div>
          </div>
          <div className="chart">
            <div className="chart__pie">
              <img className="chart__pie-img" src={PiePng} alt=""/>
            </div>
            <div className="chart__stats">
              <div className="chart__stat-item">
                <div className="chart__stat-name">Liquidity supply</div>
                <div className="chart__percent">365%</div>
              </div>
              <div className="chart__stat-item">
                <div className="chart__stat-name" style={{ color: '#7A2DF4' }}>
                  Farming
                </div>
                <div>(coming on 10 Nov)</div>
                <div>up to</div>
                <div className="chart__percent">1000%</div>
              </div>
              <div className="chart__stat-item">
                <div className="chart__stat-name" style={{ color: '#E478FF' }}>
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
                className="btn-primary"
                onClick={() => window.open('https://emiswap.com/analytics/home?network=polygon')}
              >
                Go to Analytics
              </button>
            </div>
            <div className="numbers__list">
              <div className="numbers__card">
                <div className="numbers__value">$8M</div>
                <hr/>
                <div className="numbers__desc">Total Value Locked</div>
              </div>
              <div className="numbers__card">
                <div className="numbers__value">$8M</div>
                <hr/>
                <div className="numbers__desc">Total Trading Volume</div>
              </div>
              <div className="numbers__card">
                <div className="numbers__value">8K</div>
                <hr/>
                <div className="numbers__desc">Unique Users</div>
              </div>
              <div className="numbers__card">
                <div className="numbers__value">8M</div>
                <hr/>
                <div className="numbers__desc">All-Time Trades</div>
              </div>
            </div>
          </div>
        </section>
        <section className="apr">
          <div className="apr__top">
            <div>
              <div className="apr__state">
                <div className="apr__state-label">up to</div>
                <div className="apr__value">
                  <img src={Apr2000Png} alt="" className="apr__value-img"/>
                </div>
                <div className="apr__state-label">APR</div>
              </div>
              <img className="apr__line" src={AprLinePng} alt=""/>
            </div>
          </div>
          <div className="apr__list">
            <div className="apr__card">
              <img className="apr__card-pie" src={Apr1000PiePng} alt=""/>
              <div className="apr__card-text">
                365% APR: our special Airdrop for EmiSwap LPs on Polygon. Earn additional 1% per day for providing
                liquidity.
              </div>
            </div>
            <div className="apr__card">
              <img className="apr__card-pie" src={Apr1000PiePng} alt=""/>
              <div className="apr__card-text">
                Provide Liquidity and stake LP tokens in Farming pools with up to 1000% APR to multiply your rewards.
              </div>
            </div>
            <div className="apr__card">
              <img className="apr__card-pie" src={Apr025PiePng} alt=""/>
              <div className="apr__card-text">
                0.25% of the trading volume in any pool is distributed between Liquidity Providers.
              </div>
            </div>
          </div>
        </section>
        <section className="about">
          <div className="about__card-list">
            <div className="about__card">
              <div className="about__card-name">Swapping fee for all pools</div>
              <div className="about__card-value">0,30%</div>
            </div>
            <div className="about__card">
              <div className="about__card-name">LP reward rate</div>
              <div className="about__card-value">0,25%</div>
            </div>
            <div className="about__card">
              <div className="about__card-name">Distributed among ESW holders</div>
              <div className="about__card-value">0,05%</div>
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
                <div className="about__info-list-item-circle"/>
                <span>100% of gas fees reimbursed (Ethereum)</span>
              </div>
              <div className="about__info-list-item">
                <div className="about__info-list-item-circle"/>
                <span>Available on Polygon, Ethereum, and KuCoin Blockchain</span>
              </div>
              <div className="about__info-list-item">
                <div className="about__info-list-item-circle"/>
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
              <img className="step__img" src={Step1Png} alt=""/>
              <div className="step__info">
                <div className="step__name">01. Connect your wallet</div>
                <hr/>
                <div className="step__desc">
                  EmiSwap supports MetaMask, Coinbase, Fortmatic, Portis & more
                </div>
              </div>
            </div>
            <div className="step__card">
              <img className="step__img" src={Step2Png} alt=""/>
              <div className="step__info">
                <div className="step__name">02. Pick a pool</div>
                <hr/>
                <div className="step__desc">
                  Use ‘Add Liquidity’ tab to supply crypto to the pool
                </div>
              </div>
            </div>
            <div className="step__card">
              <img className="step__img" src={Step3Png} alt=""/>
              <div className="step__info">
                <div className="step__name">03. Get LP tokens</div>
                <hr/>
                <div className="step__desc">
                  LP tokens are issued automatically. Use them to farm & earn even more
                </div>
              </div>
            </div>
            <div className="step__card">
              <img className="step__img" src={Step4Png} alt=""/>
              <div className="step__info">
                <div className="step__name">04. Start earning</div>
                <hr/>
                <div className="step__desc">
                  Use the ‘Farming’ tab to stake LP tokens & earn $ESW rewards
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="community" className="socials">
          <div className="socials__image">
            <img className="socials__img" src={SocialsCardPng} alt=""/>
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
                  <img className="social__icon-img" src={TwitterPng} alt=""/>
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
                  <img className="social__icon-img" src={TelegramPng} alt=""/>
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
                  <img className="social__icon-img" src={MediumPng} alt=""/>
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
                  <img className="social__icon-img" src={GitHubPng} alt=""/>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="team" className="team">
          <div className="section__header">
            <div className="section__title">The EmiSwap team</div>
            <div className="team__slider-buttons">
              <div></div>
              <div></div>
            </div>
          </div>
          <div className="team__slider">
            <div className="team__person-card">
              <img className="team__person-img" src={GregPng} alt=""/>
              <div className="team__person-info">
                <div className="team__person-name">Greg Mars</div>
                <hr/>
                <div className="team__person-desc">Founder & CEO</div>
              </div>
            </div>
            <div className="team__person-card">
              <img className="team__person-img" src={MarinaPng} alt=""/>
              <div className="team__person-info">
                <div className="team__person-name">Marina Moon</div>
                <hr/>
                <div className="team__person-desc">Business Development Officer</div>
              </div>
            </div>
            <div className="team__person-card">
              <img className="team__person-img" src={AndrePng} alt=""/>
              <div className="team__person-info">
                <div className="team__person-name">Andre Antares</div>
                <hr/>
                <div className="team__person-desc">Head of Marketing</div>
              </div>
            </div>
            <div className="team__person-card">
              <img className="team__person-img" src={JuliaPng} alt=""/>
              <div className="team__person-info">
                <div className="team__person-name">Julia Yakubova</div>
                <hr/>
                <div className="team__person-desc">Marketing Project Manager</div>
              </div>
            </div>
            <div className="team__person-card">
              <img className="team__person-img" src={RuslanPng} alt=""/>
              <div className="team__person-info">
                <div className="team__person-name">Ruslan Dimitrov</div>
                <hr/>
                <div className="team__person-desc">IT Product Owner</div>
              </div>
            </div>
            <div className="team__person-card">
              <img className="team__person-img" src={IsmailPng} alt=""/>
              <div className="team__person-info">
                <div className="team__person-name">Ismail Bagosher</div>
                <hr/>
                <div className="team__person-desc">Business Development Officer</div>
              </div>
            </div>
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
            <button className="btn-primary" onClick={() => history.push('/pool')}>
              Start Earning
            </button>
          </div>
          <img className="polygon__img" src={PolygonCardPng} alt=""/>
        </section>
      </div>
    </Body>
  );
}
