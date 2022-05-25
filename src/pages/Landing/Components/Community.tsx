import React from 'react';
import GitHubPng from '../../../assets/landing/socials/github.png';
import MediumPng from '../../../assets/landing/socials/medium.png';
import TelegramPng from '../../../assets/landing/socials/telegram.png';
import TwitterPng from '../../../assets/landing/socials/twitter.png';
import SocialsCardPng from '../../../assets/landing/socials-card.png';

const Community = ({
  t,
  communitySectionRef,
  isTranslationReady,
}: {
  t: any;
  communitySectionRef: React.MutableRefObject<HTMLElement>;
  isTranslationReady: boolean;
}) => (
  <section id="community" className="socials" ref={communitySectionRef}>
    <div className="socials__image">
      <img className="socials__img" src={SocialsCardPng} alt="" />
    </div>
    <div className="socials__links">
      <div className="section__header">
        <div className="section__title">{isTranslationReady ? t('landing.join') : ''}</div>
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
              {isTranslationReady ? t('landing.button.join') : ''}
            </a>
          </div>
          <div>
            <img className="social__icon-img" src={TwitterPng} alt="" />
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
              {isTranslationReady ? t('landing.button.join') : ''}
            </a>
          </div>
          <div>
            <img className="social__icon-img" src={TelegramPng} alt="" />
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
              {isTranslationReady ? t('landing.button.join') : ''}
            </a>
          </div>
          <div>
            <img className="social__icon-img" src={MediumPng} alt="" />
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
              {isTranslationReady ? t('landing.button.join') : ''}
            </a>
          </div>
          <div>
            <img className="social__icon-img" src={GitHubPng} alt="" />
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default Community;
