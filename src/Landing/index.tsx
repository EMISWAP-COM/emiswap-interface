import React from 'react';
import ActivePoolsBlock from './ActivePoolsBlock';
import BlockChainsBlock from './BlockChainsBlock';
import Footer from './Footer';
import InfoBlock from './InfoBlock';
import InvestorsBlock from './InvestorsBlock';
import MainBlock from './MainBlock';
import PartnersBlock from './PartnersBlock';
import RoadmapBlock from './RoadmapBlock';
import StandoutBlock from './StandoutBlock';

const Landing = () => (
  <>
    <MainBlock></MainBlock>
    <InfoBlock></InfoBlock>
    <StandoutBlock></StandoutBlock>
    <PartnersBlock></PartnersBlock>
    <InvestorsBlock></InvestorsBlock>
    <BlockChainsBlock></BlockChainsBlock>
    <RoadmapBlock></RoadmapBlock>
    <ActivePoolsBlock></ActivePoolsBlock>
    <Footer></Footer>
  </>
);

export default Landing;
