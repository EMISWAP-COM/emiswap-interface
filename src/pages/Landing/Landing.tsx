import React, { useCallback, useRef, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Slider from 'react-slick';
import Switch from 'react-switch';

import LogoSvg from '../../assets/svg/logo.svg';
import AboutSvg from '../../assets/landing/header/about.svg';
import CommunitySvg from '../../assets/landing/header/community.svg';
// import FarmsSvg from '../../assets/landing/header/farms.svg';
import TeamSvg from '../../assets/landing/header/team.svg';

import PieEn from '../../assets/landing/PieEn.png';
import PieEs from '../../assets/landing/PieEs.png';

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
import { useActiveWeb3React, useSwitchNetwork } from '../../hooks';
import { LandingModal } from './Modal';
import { networksItems } from '../../constants';
import chainIds from '../../constants/chainIds';

import { Body } from './styleds';
import useIntersection from '../../hooks/useIntersection';

const getLiquidityAndValue = (url: string) =>
  fetch(url, {
    headers: {
      "content-type": "application/json",
    },
    body: '{"query":"{\\n  emiswapFactories(first: 1) {\\n    totalLiquidityUSD\\n    totalVolumeUSD\\n  }\\n}\\n","variables":null}',
    method: "POST",
  });

const useLiquidityAndVolume = () => {
  const [pair, setPair] = useState(["$488K", "$3.2M"]);
  useEffect(() => {
    const fetchData = async () => {
      const ethRes = await getLiquidityAndValue(
        "https://api.thegraph.com/subgraphs/name/lombardi22/emiswap8"
      );
      const ethData = await ethRes.json();
      const kccRes = await getLiquidityAndValue(
        "https://thegraph.kcc.network/subgraphs/name/emiswap/emiswap1"
      );
      const kccData = await kccRes.json();
      const polygonRes = await getLiquidityAndValue(
        "https://api.thegraph.com/subgraphs/name/lombardi22/polygon"
      );
      const polygonData = await polygonRes.json();

      const data = [ethData, kccData, polygonData].reduce(
        (acc, item) => [
          acc[0] + parseInt(item.data.emiswapFactories[0].totalLiquidityUSD),
          acc[1] + parseInt(item.data.emiswapFactories[0].totalVolumeUSD),
        ],
        [0, 0]
      );

      setPair([
        `$${Math.ceil(data[0] / 1000)}K`,
        `$${Math.ceil(data[1] / 100000) / 10}M`,
      ]);
    };
    fetchData();
  }, []);
  return pair;
};


export default function Landing({ history }: any) {
  const aboutSectionRef = useRef<any>();
  const communitySectionRef = useRef<any>();
  const teamSectionRef = useRef<any>();
  const sliderRef = useRef<any>();
  const { t, i18n } = useTranslation();
  const { account } = useActiveWeb3React();


  const [totalValueLocked, totalTradingVolume] = useLiquidityAndVolume()

  const isAboutInViewport = useIntersection(aboutSectionRef, '0px');
  const isCommunityInViewport = useIntersection(communitySectionRef, '0px');
  const isTeamInViewport = useIntersection(teamSectionRef, '0px');

  // Check if it is first active element in viewport
  const sectionInViewPort = useCallback((name: string) => {
    const firstEl = [
      ['about', isAboutInViewport],
      ['community', isCommunityInViewport],
      ['team', isTeamInViewport],
    ].find(el => el[1]);

    return firstEl && firstEl[0] === name;
  }, [isAboutInViewport, isCommunityInViewport, isTeamInViewport]);

  const { switchNetwork } = useSwitchNetwork();

  const [modalOpened, toggleModal] = useState(false);

  const onDissmiss = () => {
    toggleModal(!modalOpened);
  };

  const handleClickTeamNext = () => {
    sliderRef.current.slickNext();
  };

  const handleClickTeamPrev = () => {
    sliderRef.current.slickPrev();
  };

  const changeChainToPolygon = async () => {
    const polygonNetworkItem = networksItems
      .find(item => item.chainId === chainIds.POLYGON);

    await switchNetwork(polygonNetworkItem);
  };

  const goToPool = () => {
    // window.open(`${window.location.origin}/pool${window.location.search}`);
    history.push('/pool');
  };

  const changeLanguage = (lng) => {
    // @ts-ignore
    i18n.changeLanguage(lng);
  };

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

  // @ts-ignore
  const currentLanguage = i18n.language;

  return (
    <>
      <LandingModal isOpen={modalOpened} onDissmiss={onDissmiss}/>
      <Body>

        <div className="landing-wrapper">
          <section className="header">
            <a className="logo" href="/">
              <img className="logo__img" src={LogoSvg} alt=""/>
            </a>
            <div className="nav">
              <a className={`nav__link ${sectionInViewPort('about') ? 'nav__link--active' : ''}`} href="#about">
                <img className="nav__img" src={AboutSvg} alt=""/>
                <div className="nav__name">{t('landing.menu.about')}</div>
              </a>
              {/* <a className="nav__link" href="#farms">
              <img className="nav__img" src={FarmsSvg} alt=""/>
              <div className="nav__name">Top Farms</div>
            </a> */}
              <a className={`nav__link ${sectionInViewPort('community') ? 'nav__link--active' : ''}`} href="#community">
                <img className="nav__img" src={CommunitySvg} alt=""/>
                <div className="nav__name">{t('landing.menu.community')}</div>
              </a>
              <a className={`nav__link ${sectionInViewPort('team') ? 'nav__link--active' : ''}`} href="#team">
                <img className="nav__img" src={TeamSvg} alt=""/>
                <div className="nav__name">{t('landing.menu.team')}</div>
              </a>
            </div>
            <div className="language-switch" style={{ marginLeft: 'auto' }}>
              <Switch
                onColor="#0f0f13"
                offColor="#0f0f13"
                onHandleColor="#7A2DF4"
                offHandleColor="#ffffff"
                handleDiameter={22}
                uncheckedIcon={false}
                checkedIcon={false}
                height={24}
                width={48}
                className="react-switch"
                checked={currentLanguage === 'es-US'}
                onChange={() => changeLanguage(currentLanguage === 'es-US' ? 'en' : 'es-US')}
              />
              <div className="options">
                <div className={currentLanguage === 'en' ? 'active' : ''} onClick={() => changeLanguage('en')}>Eng</div>
                |
                <div
                  className={currentLanguage === 'es-US' ? 'active' : ''}
                  onClick={() => changeLanguage('es-US')}
                >Esp</div>
              </div>
              <button
                className="btn-primary btn-earn"
                onClick={() => {
                  changeChainToPolygon();
                  goToPool();
                }}

              >
                {t('landing.button.startEarning')}
              </button>
            </div>
          </section>
          <section id="about" className="banner" ref={aboutSectionRef}>
            <div className="banner__info">
              <div className="banner__title">
                {t('landing.banner.title')}
              </div>
              <div className="banner__desc">
                {t('landing.banner.subtitle')}
              </div>
              <div className="banner__buttons">
                {account && (
                  <button
                    className="btn-primary"
                    style={{ marginRight: 24 }}
                    onClick={goToPool}
                  >
                    {t('landing.button.connect-wallet')}
                  </button>
                )}
                <button
                  className="btn-primary"
                  onClick={() => {
                    changeChainToPolygon();
                    goToPool();
                  }}
                >
                  {t('landing.button.startEarning')}
                </button>
              </div>
              <div className="banner__audited">
                Audited by: <img src={hackenSvg} alt=""/> & <img src={blueswarmSvg} alt=""/>
              </div>
            </div>
            <div className="chart">
              <div className="chart__pie">
                <img className="chart__pie-img" src={currentLanguage === 'es-US' ? PieEs : PieEn} alt=""/>
              </div>
              <div className="chart__stats">
                <div className="chart__stat-item">
                  <div className="chart__stat-name">
                    <img className="chart__list-dot" src={listDotSvg} alt=""/>
                    {t('landing.banner.supply')}
                  </div>
                  <div className="chart__percent">365%</div>
                </div>
                <div className="chart__stat-item">
                  <div className="chart__stat-name" style={{ color: '#7A2DF4' }}>
                    <img className="chart__list-dot" src={listDotVioletSvg} alt=""/>
                    {t('landing.banner.farming')}
                  </div>
                  <div className="chart__percent-label">{t('landing.upTo')}</div>
                  <div className="chart__percent">1000%</div>
                </div>
                <div className="chart__stat-item">
                  <div className="chart__stat-name" style={{ color: '#E478FF' }}>
                    <img className="chart__list-dot" src={listDotSvg} alt=""/>
                    {t('landing.banner.swap')}
                  </div>
                  <div className="chart__percent-label">{t('landing.banner.volume')}</div>
                  <div className="chart__percent">0,25%</div>
                </div>
              </div>
            </div>
          </section>
          <section className="numbers">
            <div className="section__card">
              <div className="section__header">
                <div className="section__title">{t('landing.numbers.title')}</div>
                <button
                  className="btn-primary transparent numbers__btn-analytics-top"
                  onClick={() => window.open('https://emiswap.com/analytics/home?network=polygon')}
                >
                  {t('landing.button.analytics')}
                </button>
              </div>
              <div className="numbers__list">
                <div className="numbers__card">
                  <div className="numbers__value">{totalValueLocked}</div>
                  <hr/>
                  <div className="numbers__desc">{t('landing.numbers.value')}</div>
                </div>
                <div className="numbers__card">
                  <div className="numbers__value">{totalTradingVolume}</div>
                  <hr/>
                  <div className="numbers__desc">{t('landing.numbers.volume')}</div>
                </div>
                <div className="numbers__card">
                  <div className="numbers__value">84K</div>
                  <hr/>
                  <div className="numbers__desc">{t('landing.numbers.users')}</div>
                </div>
                <div className="numbers__card">
                  <div className="numbers__value">3.8K</div>
                  <hr/>
                  <div className="numbers__desc">{t('landing.numbers.trades')}</div>
                </div>
              </div>
              <button
                className="btn-primary transparent numbers__btn-analytics-bottom"
                onClick={() => window.open('https://emiswap.com/analytics/home?network=polygon')}
              >
                {t('landing.button.analytics')}
              </button>
            </div>
          </section>

          <section className="apr">
            <button
              className="btn-primary transparent apr__button-more"
              onClick={() => toggleModal(true)}
            >
              {t('landing.button.more')}
            </button>
            <div className="apr__top">
              <div>
                <div className="apr__state">
                  <div className="apr__state-label">{t('landing.upTo')}</div>
                  <div className="apr__value">
                    <img className="apr__value-img" src={Apr2000Png} alt=""/>
                  </div>
                  <div className="apr__state-label">APR</div>
                </div>
                <img className="apr__line-img" src={rangesSvg} alt=""/>
              </div>
            </div>
            <div className="apr__list">
              <div className="apr__card">
                <div className="apr__card-pie-img__wrapper">
                  <img className="apr__card-pie-img" src={Apr365PiePng} alt=""/>
                </div>
                <div className="apr__card-text">
                  {t('landing.365')}
                </div>
              </div>
              <div className="apr__card">
                <div className="apr__card-pie-img__wrapper">
                  <img className="apr__card-pie-img" src={Apr1000PiePng} alt=""/>
                </div>
                <div className="apr__card-text">
                  {t('landing.1000')}
                </div>
              </div>
              <div className="apr__card">
                <div className="apr__card-pie-img__wrapper">
                  <img className="apr__card-pie-img" src={Apr025PiePng} alt=""/>
                </div>
                <div className="apr__card-text">
                  {t('landing.025')}
                </div>
              </div>
            </div>
            <button
              className="btn-primary transparent apr__button-more apr__button-more--bottom"
              onClick={() => toggleModal(true)}
            >
              {t('landing.button.more')}
            </button>
          </section>
          <section className="about">
            <div className="about__card-list">
              <div className="about__card">
                <div className="about__card__pennon multi"/>
                <div className="about__card-name">{t('landing.about.swapping')}</div>
                <div className="about__card-value">0,30%</div>
              </div>
              <div className="about__card-list__offset">
                <div className="about__card-list__offset__img">
                  <img src={linesSvg} alt=""/>
                </div>
                <div className="about__card top">
                  <div className="about__card__pennon turquoise"/>
                  <div className="about__card-name">{t('landing.about.reward')}</div>
                  <div className="about__card-value">0,25%</div>
                </div>
                <div className="about__card bottom">
                  <div className="about__card__pennon heliotrope"/>
                  <div className="about__card-name">{t('landing.about.distributed')}</div>
                  <div className="about__card-value">0,05%</div>
                </div>
              </div>
            </div>
            <div className="about__info">
              <div className="section__header">
                <div className="section__title about__title">{t('landing.about.title')}</div>
              </div>
              <div className="about__desc">
                {t('landing.about.subtitle')}
              </div>
              <div className="about__info-list">
                <div className="about__info-list-item">
                  <div className="about__info-list-item-circle"/>
                  <span>{t('landing.about.list.1')}</span>
                </div>
                <div className="about__info-list-item">
                  <div className="about__info-list-item-circle"/>
                  <span>{t('landing.about.list.2')}</span>
                </div>
                <div className="about__info-list-item">
                  <div className="about__info-list-item-circle"/>
                  <span>{t('landing.about.list.3')}</span>
                </div>
              </div>

              <button
                className="btn-primary apr__button-paper"
                onClick={() => window.open('https://about.emiswap.com/whitepaper')}
              >
                <img className="btn-icon" src={AboutSvg} alt=""/>
                {t('landing.button.paper')}
              </button>
            </div>
          </section>
          <section className="steps">
            <div className="section__header">
              <div className="section__title">{t('landing.4steps.title')}</div>
            </div>
            <div className="steps__list">
              <div className="step__card">
                <div className="step__img__wrapper">
                  <img className="step__img" src={Step1Png} alt=""/>
                </div>
                <div className="step__info">
                  <div className="step__name">01. {t('landing.4steps.1.title')}</div>
                  <hr/>
                  <div className="step__desc">
                    {t('landing.4steps.1.subtitle')}
                  </div>
                </div>
              </div>
              <div className="step__card">
                <div className="step__img__wrapper">
                  <img className="step__img" src={Step2Png} alt=""/>
                </div>
                <div className="step__info">
                  <div className="step__name">02. {t('landing.4steps.2.title')}</div>
                  <hr/>
                  <div className="step__desc">
                    {t('landing.4steps.2.subtitle')}
                  </div>
                </div>
              </div>
              <div className="step__card">
                <div className="step__img__wrapper">
                  <img className="step__img" src={Step3Png} alt=""/>
                </div>
                <div className="step__info">
                  <div className="step__name">03. {t('landing.4steps.3.title')}</div>
                  <hr/>
                  <div className="step__desc">
                    {t('landing.4steps.3.subtitle')}
                  </div>
                </div>
              </div>
              <div className="step__card">
                <div className="step__img__wrapper">
                  <img className="step__img" src={Step4Png} alt=""/>
                </div>
                <div className="step__info">
                  <div className="step__name">04. {t('landing.4steps.4.title')}</div>
                  <hr/>
                  <div className="step__desc">
                    {t('landing.4steps.4.subtitle')}
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section id="community" className="socials" ref={communitySectionRef}>
            <div className="socials__image">
              <img className="socials__img" src={SocialsCardPng} alt=""/>
            </div>
            <div className="socials__links">
              <div className="section__header">
                <div className="section__title">{t('landing.join')}</div>
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
                      {t('landing.button.join')}
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
                      {t('landing.button.join')}
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
                      {t('landing.button.join')}
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
                      {t('landing.button.join')}
                    </a>
                  </div>
                  <div>
                    <img className="social__icon-img" src={GitHubPng} alt=""/>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section id="partners" className="partners">
            <div className="section__header">
              <div className="section__title">{t('landing.partners.title')}</div>
            </div>
            <div className="partners__list">
              <div>
                <img src={emirexLogo} alt="Emirex"/>
                <img src={bitmartLogo} alt="BitMart"/>
                <img src={everestLogo} alt="Everest"/>
                <img src={digifinexLogo} alt="Digifinex"/>
              </div>
              <div>
                <img src={nearLogo} alt="Near"/>
                <img src={movrLogo} alt="Movr"/>
                <img src={kukoinLogo} alt="Kukoin"/>
                <img src={shidenLogo} alt="Shiden"/>
                <img src={uboostLogo} alt="Uboost"/>
              </div>
              <div>
                <img src={alphaLogo} alt="Alpha"/>
                <img src={unilendLogo} alt="Unilend"/>
                <img src={yieldLogo} alt="Yield"/>
                <img src={polygonLogo} alt="Polygon"/>
              </div>
            </div>
          </section>
          <section id="team" className="team" ref={teamSectionRef}>
            <div className="section__header">
              <div className="section__title">{t('landing.team.title')}</div>
              <div className="team__slider-buttons team__slider-buttons--top">
                <button className="team__slider-btn" onClick={handleClickTeamPrev}>
                  <img
                    className="team__slider-btn-icon team__slider-btn-icon--left"
                    src={SlideArrowSvg}
                    alt=""
                  />
                </button>
                <button className="team__slider-btn" onClick={handleClickTeamNext}>
                  <img className="team__slider-btn-icon" src={SlideArrowSvg} alt=""/>
                </button>
              </div>
            </div>
            <div className="team__slider">
              <Slider ref={sliderRef} {...sliderSettings}>
                <div className="team__person-card">
                  <img className="team__person-img" src={GregPng} alt=""/>
                  <div className="team__person-info">
                    <div className="team__person-name">{t('landing.team.1.name')}</div>
                    <hr/>
                    <div className="team__person-desc">{t('landing.team.1.position')}</div>
                  </div>
                </div>
                <div className="team__person-card">
                  <img className="team__person-img" src={MarinaPng} alt=""/>
                  <div className="team__person-info">
                    <div className="team__person-name">{t('landing.team.2.name')}</div>
                    <hr/>
                    <div className="team__person-desc">{t('landing.team.2.position')}</div>
                  </div>
                </div>
                <div className="team__person-card">
                  <img className="team__person-img" src={AndrePng} alt=""/>
                  <div className="team__person-info">
                    <div className="team__person-name">{t('landing.team.3.name')}</div>
                    <hr/>
                    <div className="team__person-desc">{t('landing.team.3.position')}</div>
                  </div>
                </div>
                <div className="team__person-card">
                  <img className="team__person-img" src={JuliaPng} alt=""/>
                  <div className="team__person-info">
                    <div className="team__person-name">{t('landing.team.4.name')}</div>
                    <hr/>
                    <div className="team__person-desc">{t('landing.team.4.position')}</div>
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
                  <img className="team__person-img" src={IsmailPng} alt=""/>
                  <div className="team__person-info">
                    <div className="team__person-name">Ismail Bagosher</div>
                    <hr/>
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
                <img className="team__slider-btn-icon" src={SlideArrowSvg} alt=""/>
              </button>
            </div>
          </section>
          <section className="polygon">
            <div className="polygon__info">
              <div className="section__header">
                <div className="section__title">{t('landing.polygon.title')}</div>
              </div>
              <div className="polygon__desc">
                {t('landing.polygon.text')}
              </div>
              <button
                className="btn-primary" onClick={() => {
                changeChainToPolygon();
                goToPool();
              }}
              >
                {t('landing.button.startEarning')}
              </button>

              <button
                className="btn-primary transparent apr__button-paper"
                onClick={() => window.open('https://polygonscan.com/address/0x18f38359551258c35e8593d775cb6fe8d27fd89b')}
              >
                <img className="btn-icon" src={AboutSvg} alt=""/>
                {t('landing.button.viewOn')}
              </button>
            </div>
            <img className="polygon__img" src={PolygonCardPng} alt=""/>
          </section>
        </div>
      </Body>
    </>
  );
}
