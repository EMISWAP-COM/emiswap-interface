import React, { ReactElement } from 'react';
import PolygonCardPng from '../../../assets/landing/polygon-card.png';

interface Polygon {
  t: any;
  changeChainToPolygon: () => Promise<void>;
  goToPool: () => void;
}
const Polygon = ({ t, changeChainToPolygon, goToPool }: Polygon): ReactElement => (
  <section className="polygon">
    <div className="polygon__info">
      <div className="section__header">
        <div className="section__title">{t('landing.polygon.title')}</div>
      </div>
      <div className="polygon__desc">{t('landing.polygon.text')}</div>
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
    <img className="polygon__img" src={PolygonCardPng} alt="" />
  </section>
);

export default Polygon;
