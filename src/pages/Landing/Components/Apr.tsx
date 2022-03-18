import React, { ReactElement } from 'react';
import Apr365PiePng from '../../../assets/landing/apr/360-pie.png';
import Apr025PiePng from '../../../assets/landing/apr/025-pie.png';
import Apr1000PiePng from '../../../assets/landing/apr/1000-pie.png';
import Apr2000Png from '../../../assets/landing/apr/2000.png';
import rangesSvg from '../../../assets/landing/ranges.svg';

interface Apr {
  t: any;
  toggleModal: (value: boolean) => void;
}

const Apr = ({ t, toggleModal }: Apr): ReactElement => (
  <section className="apr">
    <button className="btn-primary transparent apr__button-more" onClick={() => toggleModal(true)}>
      {t('landing.button.more')}
    </button>
    <div className="apr__top">
      <div>
        <div className="apr__state">
          <div className="apr__state-label">{t('landing.upTo')}</div>
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
        <div className="apr__card-text">{t('landing.365')}</div>
      </div>
      <div className="apr__card">
        <div className="apr__card-pie-img__wrapper">
          <img className="apr__card-pie-img" src={Apr1000PiePng} alt="" />
        </div>
        <div className="apr__card-text">{t('landing.1000')}</div>
      </div>
      <div className="apr__card">
        <div className="apr__card-pie-img__wrapper">
          <img className="apr__card-pie-img" src={Apr025PiePng} alt="" />
        </div>
        <div className="apr__card-text">{t('landing.025')}</div>
      </div>
    </div>
    <button
      className="btn-primary transparent apr__button-more apr__button-more--bottom"
      onClick={() => toggleModal(true)}
    >
      {t('landing.button.more')}
    </button>
  </section>
);

export default Apr;
