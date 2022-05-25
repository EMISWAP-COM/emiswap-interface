import React, { ReactElement } from 'react';
import ContentLoader from 'react-content-loader';
import useLiquidityAndVolume from '../useLiquidityAndVolumeHook';

const formatTotalValueLocked = (value: number) => `$${Math.ceil(value / 1000)}K`;
const formatTotalTXCount = (value: number) => `$${(value / 1000).toFixed(1)}K`;
const foramtnTotalTradingVolume = (value: number) => `$${Math.ceil(value / 1000000)}M`;

const Skeleton = (): React.ReactElement => (
  <ContentLoader
    speed={2}
    width="50%"
    height="35"
    viewBox="0 0 100% 35"
    backgroundColor="#6E6E6E"
    foregroundColor="#7A2DF4"
  >
    <rect x="0" y="0" rx="6" ry="6" width="100%" height="100%" />
  </ContentLoader>
);

interface Numbers {
  t: any;
  isTranslationReady: boolean;
}

const Numbers = ({ t, isTranslationReady }: Numbers): ReactElement => {
  const [totalValueLocked, totalTradingVolume, totalTxData] = useLiquidityAndVolume();

  return (
    <section className="numbers">
      <div className="section__card">
        <div className="section__header">
          <div className="section__title">
            {isTranslationReady ? t('landing.numbers.title') : ''}
          </div>
          <button
            className="btn-primary transparent numbers__btn-analytics-top"
            onClick={() => window.open('https://emiswap.com/analytics/home?network=polygon')}
          >
            {isTranslationReady ? t('landing.button.analytics') : ''}
          </button>
        </div>
        <div className="numbers__list">
          <div className="numbers__card">
            <div className="numbers__desc">
              {isTranslationReady ? t('landing.numbers.value') : ''}
            </div>
            <div className="numbers__value">
              {totalValueLocked === null ? <Skeleton /> : formatTotalValueLocked(totalValueLocked)}
            </div>
          </div>
          <div className="numbers__card">
            <div className="numbers__desc">
              {isTranslationReady ? t('landing.numbers.volume') : ''}
            </div>
            <div className="numbers__value">
              {totalTradingVolume == null ? (
                <Skeleton />
              ) : (
                foramtnTotalTradingVolume(totalTradingVolume)
              )}
            </div>
          </div>
          <div className="numbers__card">
            <div className="numbers__desc">
              {isTranslationReady ? t('landing.numbers.users') : ''}
            </div>
            <div className="numbers__value">
              {totalTradingVolume == null ? <Skeleton /> : '86K'}
            </div>
          </div>
          <div className="numbers__card">
            <div className="numbers__desc">
              {isTranslationReady ? t('landing.numbers.trades') : ''}
            </div>
            <div className="numbers__value">
              {totalTxData == null ? <Skeleton /> : formatTotalTXCount(totalTxData)}
            </div>
          </div>
        </div>
        <button
          className="btn-primary transparent numbers__btn-analytics-bottom"
          onClick={() => window.open('https://emiswap.com/analytics/home?network=polygon')}
        >
          {isTranslationReady ? t('landing.button.analytics') : ''}
        </button>
      </div>
    </section>
  );
};

export default Numbers;
