import React, { ReactElement } from 'react';
import PolygonCardPng from '../../../assets/landing/polygon-card.png';

interface Polygon {
  t: any;
  changeChainToPolygon: () => Promise<void>;
  goToPool: () => void;
  isTranslationReady: boolean;
}
const Polygon = ({
  t,
  changeChainToPolygon,
  goToPool,
  isTranslationReady,
}: Polygon): ReactElement => (
  <section className="polygon">
    <div className="polygon__info">
      <div className="section__header">
        <div className="section__title">{isTranslationReady ? t('landing.polygon.title') : ''}</div>
      </div>
      <div className="polygon__desc">{isTranslationReady ? t('landing.polygon.text') : ''}</div>
      <button
        className="btn-primary"
        onClick={() => {
          changeChainToPolygon();
          goToPool();
        }}
      >
        {isTranslationReady ? t('landing.button.startEarning') : ''}
      </button>
    </div>
    <img className="polygon__img" src={PolygonCardPng} alt="" />
  </section>
);

export default Polygon;
