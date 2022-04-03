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
import { Grid } from 'ThemeProvider/components';

const Landing = () => (
  <Grid bg="bg" pl="12.5rem">
    {/* <Header /> */}
    <MainBlock />
    <InfoBlock />
    {/* <StandoutBlock /> */}
    {/* <PartnersBlock /> */}
    {/* <InvestorsBlock /> */}
    {/* <BlockChainsBlock /> */}
    {/* <RoadmapBlock /> */}
    {/* <ActivePoolsBlock /> */}
     <Footer />
  </Grid>
);

export default Landing;
