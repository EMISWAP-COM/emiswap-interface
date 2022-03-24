import Header from './Header';
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
import { grid } from 'styled-system';
import { Grid } from 'ThemeProvider/components';
import styled from 'styled-components';
import { Props } from 'ThemeProvider';

const LandingWrapper = styled(Grid)<Props>`
  ${grid}
`;

const Landing = () => (
  <LandingWrapper gridTemplateColumns="1fr">
    <Header />
    <MainBlock />
    <InfoBlock />
    <StandoutBlock />
    <PartnersBlock />
    <InvestorsBlock />
    <BlockChainsBlock />
    <RoadmapBlock />
    <ActivePoolsBlock />
    <Footer />
  </LandingWrapper>
);

export default Landing;
