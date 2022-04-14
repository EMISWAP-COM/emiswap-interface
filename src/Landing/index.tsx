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
import { Flex, Box } from 'ThemeProvider/components';

const Landing = () => (
  <Flex minWidth="0" bg="bg" flexDirection="column">
    {/* <Header /> */}
    {/* <MainBlock /> */}
    <InfoBlock />
    <Box background="landingFirst">
      <StandoutBlock />
      <PartnersBlock />
    </Box>
    <Box background="landingSecond">
      <InvestorsBlock />
      <BlockChainsBlock />
    </Box>
    <Box background="landingThird">
      <RoadmapBlock />
      <ActivePoolsBlock />
    </Box>
    <Footer />
  </Flex>
);

export default Landing;
