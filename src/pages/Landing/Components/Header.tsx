import React, { ReactElement, useState } from 'react';
import Switch from 'react-switch';
import Web3Status from 'components/Web3Status';
import LogoSvg from '../../../assets/svg/logo.svg';
import AboutSvg from '../../../assets/landing/header/about.svg';
import CommunitySvg from '../../../assets/landing/header/community.svg';
import Menu from '../../../components/Menu';
import styled from 'styled-components/macro';
import useNftData from '../../../hooks/useNftData';
import NftLevelsModal from './NftLevelsModal';

interface Header {
  t: any;
  currentLanguage: string;
  sectionInViewPort: (string) => boolean;
  changeLanguage: (lng: any) => void;
  changeChainToPolygon: () => void;
  goToPool: () => void;
}

const NftList = styled.div`
  display: flex;
  align-items: center;
  max-width: 200px;
  margin: 0 32px 0 4px;

  @media screen and (max-width: 980px) {
    position: absolute;
    top: 24px;
    right: 72px;
    max-width: 84px;
    margin: 0;
  }
`;

const NftImg = styled.img`
  display: block;
  margin: 0 7px;
  width: 100%;
  height: 100%;
  max-height: 42px;
  max-width: 42px;
  cursor: pointer;

  @media screen and (max-width: 980px) {
    max-height: 28px;
    max-width: 28px;
  }
`;

const Header = ({
  t,
  currentLanguage,
  sectionInViewPort,
  changeLanguage,
  changeChainToPolygon,
  goToPool,
}: Header): ReactElement => {
  const nftData = useNftData();

  const [nftModalVisible, setNftModalVisible] = useState(false);

  return (
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
      </div>

      <NftList>
        {nftData.images.map(img => (
          <NftImg src={img} onClick={() => setNftModalVisible(true)} />
        ))}
      </NftList>
      <NftLevelsModal isOpen={nftModalVisible} onClose={() => setNftModalVisible(false)} />

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

      <Menu isLanding={true} />
    </section>
  );
};

export default Header;
