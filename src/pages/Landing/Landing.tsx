import React, { useCallback, useRef, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { isMobile } from 'react-device-detect';
import { LandingModal } from './Modal';
import { networksItems } from '../../constants';
import chainIds from '../../constants/chainIds';
import useIntersection from '../../hooks/useIntersection';

import { useActiveWeb3React, useSwitchNetwork } from '../../hooks';

import { Body } from './styleds';
import { useWalletModalToggle } from '../../state/application/hooks';
import {
  Header,
  Banner,
  Numbers,
  Apr,
  About,
  Steps,
  Community,
  Partners,
  Polygon,
} from './Components';

export default function Landing({ history }: any) {
  const aboutSectionRef = useRef<HTMLElement>();
  const communitySectionRef = useRef<HTMLElement>();
  const teamSectionRef = useRef<HTMLElement>();
  const { t, i18n } = useTranslation();
  const { account } = useActiveWeb3React();
  const toggleWalletModal = useWalletModalToggle();

  const isAboutInViewport = useIntersection(aboutSectionRef, '0px');
  const isCommunityInViewport = useIntersection(communitySectionRef, '0px');
  const isTeamInViewport = useIntersection(teamSectionRef, '0px');

  // Check if it is first active element in viewport
  const sectionInViewPort = useCallback(
    (name: string) => {
      const firstEl = [
        ['about', isAboutInViewport],
        ['community', isCommunityInViewport],
        ['team', isTeamInViewport],
      ].find(el => el[1]);

      return firstEl && firstEl[0] === name;
    },
    [isAboutInViewport, isCommunityInViewport, isTeamInViewport],
  );

  const { switchNetwork } = useSwitchNetwork();

  const [modalOpened, toggleModal] = useState(false);

  const onDissmiss = () => {
    toggleModal(!modalOpened);
  };

  const changeChainToPolygon = async () => {
    const polygonNetworkItem = networksItems.find(item => item.chainId === chainIds.POLYGON);

    await switchNetwork(polygonNetworkItem);
  };

  const goToPool = () => {
    if (isMobile) {
      history.push('/pool');
    } else {
      window.open(`${window.location.origin}/pool${window.location.search}`);
    }
  };

  const changeLanguage = lng => {
    // @ts-ignore
    i18n.changeLanguage(lng);
  };

  // @ts-ignore
  const currentLanguage = i18n.language;

  return (
    <>
      <LandingModal isOpen={modalOpened} onDissmiss={onDissmiss} />
      <Body>
        <div className="landing-wrapper">
          <Header
            t={t}
            currentLanguage={currentLanguage}
            sectionInViewPort={sectionInViewPort}
            changeLanguage={changeLanguage}
            changeChainToPolygon={changeChainToPolygon}
            goToPool={goToPool}
          />
          <Banner
            t={t}
            aboutSectionRef={aboutSectionRef}
            account={account}
            currentLanguage={currentLanguage}
            goToPool={goToPool}
            changeChainToPolygon={changeChainToPolygon}
            toggleWalletModal={toggleWalletModal}
          />
          <Numbers t={t} />
          <Apr t={t} toggleModal={toggleModal} />
          <About t={t} />
          <Steps t={t} />
          <Community t={t} communitySectionRef={communitySectionRef} />
          <Partners t={t} />
          <Polygon t={t} changeChainToPolygon={changeChainToPolygon} goToPool={goToPool} />
        </div>
      </Body>
    </>
  );
}
