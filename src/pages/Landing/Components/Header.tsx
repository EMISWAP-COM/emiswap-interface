import React, { ReactElement } from 'react';
import Switch from 'react-switch';
import Web3Status from 'components/Web3Status';
import LogoSvg from '../../../assets/svg/logo.svg';
import AboutSvg from '../../../assets/landing/header/about.svg';
import CommunitySvg from '../../../assets/landing/header/community.svg';
import Menu from '../../../components/Menu';

interface Header {
  t: any;
  currentLanguage: string;
  sectionInViewPort: (string) => boolean;
  changeLanguage: (lng: any) => void;
  changeChainToPolygon: () => void;
  goToPool: () => void;
}

const Header = ({
  t,
  currentLanguage,
  sectionInViewPort,
  changeLanguage,
  changeChainToPolygon,
  goToPool,
}: Header): ReactElement => (
  <section className="header">
    <a className="logo" href="/">
      <img className="logo__img" src={LogoSvg} alt="" />
    </a>
    <div className="nav">
      <a
        className={`nav__link ${sectionInViewPort('about') ? 'nav__link--active' : ''}`}
        href="#about"
      >
        <img className="nav__img" src={AboutSvg} alt="" />
        <div className="nav__name">{t('landing.menu.about')}</div>
      </a>
      {/* <a className="nav__link" href="#farms">
      <img className="nav__img" src={FarmsSvg} alt=""/>
      <div className="nav__name">Top Farms</div>
    </a> */}
      <a
        className={`nav__link ${sectionInViewPort('community') ? 'nav__link--active' : ''}`}
        href="#community"
      >
        <img className="nav__img" src={CommunitySvg} alt="" />
        <div className="nav__name">{t('landing.menu.community')}</div>
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
        <div
          className={currentLanguage === 'en' ? 'active' : ''}
          onClick={() => changeLanguage('en')}
        >
          Eng
        </div>
        |
        <div
          className={currentLanguage === 'es-US' ? 'active' : ''}
          onClick={() => changeLanguage('es-US')}
        >
          Esp
        </div>
      </div>

      <div className="web3-wrapper">
        <Web3Status disableClickOnConnected />
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

      <Menu />
    </div>
  </section>
);

export default Header;
