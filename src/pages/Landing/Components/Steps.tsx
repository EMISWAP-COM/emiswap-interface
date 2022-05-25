import React, { ReactElement } from 'react';
import Step1Png from '../../../assets/landing/steps/step1.png';
import Step2Png from '../../../assets/landing/steps/step2.png';
import Step3Png from '../../../assets/landing/steps/step3.png';
import Step4Png from '../../../assets/landing/steps/step4.png';

const Steps = ({
  t,
  isTranslationReady,
}: {
  t: any;
  isTranslationReady: boolean;
}): ReactElement => (
  <section className="steps">
    <div className="section__header">
      <div className="section__title">{isTranslationReady ? t('landing.4steps.title') : ''}</div>
    </div>
    <div className="steps__list">
      <div className="step__card">
        <div className="step__img__wrapper">
          <img className="step__img" src={Step1Png} alt="" />
        </div>
        <div className="step__info">
          <div className="step__name">
            01. {isTranslationReady ? t('landing.4steps.1.title') : ''}
          </div>
          <hr />
          <div className="step__desc">
            {isTranslationReady ? t('landing.4steps.1.subtitle') : ''}
          </div>
        </div>
      </div>
      <div className="step__card">
        <div className="step__img__wrapper">
          <img className="step__img" src={Step2Png} alt="" />
        </div>
        <div className="step__info">
          <div className="step__name">
            02. {isTranslationReady ? t('landing.4steps.2.title') : ''}
          </div>
          <hr />
          <div className="step__desc">
            {isTranslationReady ? t('landing.4steps.2.subtitle') : ''}
          </div>
        </div>
      </div>
      <div className="step__card">
        <div className="step__img__wrapper">
          <img className="step__img" src={Step3Png} alt="" />
        </div>
        <div className="step__info">
          <div className="step__name">
            03. {isTranslationReady ? t('landing.4steps.3.title') : ''}
          </div>
          <hr />
          <div className="step__desc">
            {isTranslationReady ? t('landing.4steps.3.subtitle') : ''}
          </div>
        </div>
      </div>
      <div className="step__card">
        <div className="step__img__wrapper">
          <img className="step__img" src={Step4Png} alt="" />
        </div>
        <div className="step__info">
          <div className="step__name">
            04. {isTranslationReady ? t('landing.4steps.4.title') : ''}
          </div>
          <hr />
          <div className="step__desc">
            {isTranslationReady ? t('landing.4steps.4.subtitle') : ''}
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default Steps;
