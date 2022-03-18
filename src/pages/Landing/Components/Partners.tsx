import React, { ReactElement } from 'react';
import alphaLogo from '../../../assets/landing/partners/alpha.png';
import bitmartLogo from '../../../assets/landing/partners/bitmart.png';
import digifinexLogo from '../../../assets/landing/partners/digifinex.png';
import emirexLogo from '../../../assets/landing/partners/emirex.png';
import kukoinLogo from '../../../assets/landing/partners/kukoin.png';
import everestLogo from '../../../assets/landing/partners/logo.png';
import movrLogo from '../../../assets/landing/partners/movr.png';
import nearLogo from '../../../assets/landing/partners/near.png';
import polygonLogo from '../../../assets/landing/partners/polygon.png';
import shidenLogo from '../../../assets/landing/partners/shiden.png';
import uboostLogo from '../../../assets/landing/partners/uboost.png';
import unilendLogo from '../../../assets/landing/partners/unilend.png';
import yieldLogo from '../../../assets/landing/partners/yield.png';

const Partners = ({ t }: { t: any }): ReactElement => (
  <section id="partners" className="partners">
    <div className="section__header">
      <div className="section__title">{t('landing.partners.title')}</div>
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
);

export default Partners;
