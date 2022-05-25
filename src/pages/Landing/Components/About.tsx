import React, { ReactElement } from 'react';
import AboutSvg from '../../../assets/landing/header/about.svg';
import WhitePaper from '../../../assets/whitePaper.pdf';
import linesSvg from '../../../assets/landing/lines.svg';

const AboutESW = ({
  t,
  isTranslationReady,
}: {
  t: any;
  isTranslationReady: boolean;
}): ReactElement => (
  <section className="about">
    <div className="about__card-list">
      <div className="about__card">
        <div className="about__card__pennon multi" />
        <div className="about__card-name">
          {isTranslationReady ? t('landing.about.swapping') : ''}
        </div>
        <div className="about__card-value">0,30%</div>
      </div>
      <div className="about__card-list__offset">
        <div className="about__card-list__offset__img">
          <img src={linesSvg} alt="" />
        </div>
        <div className="about__card top">
          <div className="about__card__pennon turquoise" />
          <div className="about__card-name">
            {isTranslationReady ? t('landing.about.reward') : ''}
          </div>
          <div className="about__card-value">0,25%</div>
        </div>
        <div className="about__card bottom">
          <div className="about__card__pennon heliotrope" />
          <div className="about__card-name">
            {isTranslationReady ? t('landing.about.distributed') : ''}
          </div>
          <div className="about__card-value">0,05%</div>
        </div>
      </div>
    </div>
    <div className="about__info">
      <div className="section__header">
        <div className="section__title about__title">
          {isTranslationReady ? t('landing.about.title') : ''}
        </div>
      </div>
      <div className="about__desc">{isTranslationReady ? t('landing.about.subtitle') : ''}</div>
      <div className="about__info-list">
        <div className="about__info-list-item">
          <div className="about__info-list-item-circle" />
          <span>{isTranslationReady ? t('landing.about.list.1') : ''}</span>
        </div>
        <div className="about__info-list-item">
          <div className="about__info-list-item-circle" />
          <span>{isTranslationReady ? t('landing.about.list.2') : ''}</span>
        </div>
      </div>

      <button className="btn-primary apr__button-paper" onClick={() => window.open(WhitePaper)}>
        <img className="btn-icon" src={AboutSvg} alt="" />
        {isTranslationReady ? t('landing.button.paper') : ''}
      </button>
    </div>
  </section>
);

export default AboutESW;
