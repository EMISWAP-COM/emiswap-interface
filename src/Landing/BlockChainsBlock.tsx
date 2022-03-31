import React from 'react';
import { Grid, Flex, StyledHead, Image } from 'ThemeProvider';
import avalancheLogo from 'assets/landing/avalanche-logo.png';
import auroraLogo from 'assets/landing/aurora-logo.png';
import astarLogo from 'assets/landing/astar-logo.png';
import gateLogo from 'assets/landing/gate-logo.png';
import nearLogo from 'assets/landing/near-logo.png';
import shidenLogo from 'assets/landing/shiden-logo.png';
import kccLogo from 'assets/landing/kcc-logo.png';

const BlockChainsBlock = () => (
  <Grid
    width="51rem"
    height="20rem"
    gridTemplateRows="25% auto"
    justifyContent="center"
    mt="7.5rem"
    ml="auto"
    mr="auto"
  >
    <Flex justifyContent="center">
      <StyledHead>Blockchains</StyledHead>
    </Flex>
    <Flex flexDirection="column">
      <Flex justifyContent="space-between" mt="1rem" pl="5.5rem" pr="5.5rem" alignItems="center">
        <Image
          backgroundImage={`url(${gateLogo})`}
          backgroundSize="cover"
          width="11.015rem"
          height="2.243rem"
        />
        <Image
          backgroundImage={`url(${avalancheLogo})`}
          backgroundSize="cover"
          width="11.063rem"
          height="2.25rem"
        />
        <Image
          backgroundImage={`url(${auroraLogo})`}
          backgroundSize="cover"
          width="9.313rem"
          height="2.063rem"
        />
      </Flex>
      <Flex justifyContent="space-between" alignItems="center" mt="2rem">
        <Image
          backgroundImage={`url(${shidenLogo})`}
          backgroundSize="cover"
          width="7.063rem"
          height="2.25rem"
        />
        <Image
          backgroundImage={`url(${nearLogo})`}
          backgroundSize="cover"
          width="8.438rem"
          height="2.25rem"
        />
        <Image
          backgroundImage={`url(${astarLogo})`}
          backgroundSize="cover"
          width="7.514rem"
          height="2.236rem"
        />
        <Image
          backgroundImage={`url(${kccLogo})`}
          backgroundSize="cover"
          width="6.707rem"
          height="2.236rem"
        />
      </Flex>
    </Flex>
  </Grid>
);

export default BlockChainsBlock;
