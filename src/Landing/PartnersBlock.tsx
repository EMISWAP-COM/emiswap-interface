import React from 'react';
import { Grid, Flex, StyledHead, Image } from 'ThemeProvider';
import bitmartLogo from 'assets/landing/bitmart-logo.png';
import digfinexLogo from 'assets/landing/digfinex-logo.png';
import everestLogo from 'assets/landing/everest-logo.png';
import emirexLogo from 'assets/landing/emirex-logo.png';
import bigbrainLogo from 'assets/landing/bigbrain-logo.png';
import alphaLogo from 'assets/landing/alpha-logo.png';
import etexchangeLogo from 'assets/landing/etexchange-logo.png';
import mahdaoLogo from 'assets/landing/mahdao-logo.png';
import jpycLogo from 'assets/landing/jpyc-logo.png';
import holaLogo from 'assets/landing/holla-logo.png';
import transformLogo from 'assets/landing/transform-group-logo.png';

const PartnersBlock = () => (
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
      <StyledHead>Partners</StyledHead>
    </Flex>
    <Flex flexDirection="column">
      <Flex justifyContent="space-between" mt="1rem" alignItems="center">
        <Image
          backgroundImage={`url(${bitmartLogo})`}
          backgroundSize="cover"
          width="7.809rem"
          height="2.146rem"
        />
        <Image
          backgroundImage={`url(${digfinexLogo})`}
          backgroundSize="cover"
          width="8.438rem"
          height="1.625rem"
        />
        <Image
          backgroundImage={`url(${everestLogo})`}
          backgroundSize="cover"
          width="8.1885rem"
          height="1.625rem"
        />
        <Image
          backgroundImage={`url(${emirexLogo})`}
          backgroundSize="cover"
          width="7.75rem"
          height="2.15rem"
        />
      </Flex>
      <Flex justifyContent="space-between" pl="5.5rem" pr="5.5rem" alignItems="center" mt="2rem">
        <Image
          backgroundImage={`url(${bigbrainLogo})`}
          backgroundSize="cover"
          width="8.063rem"
          height="2.219rem"
        />
        <Image
          backgroundImage={`url(${alphaLogo})`}
          backgroundSize="cover"
          width="12.694rem"
          height="2.139rem"
        />
        <Image
          backgroundImage={`url(${etexchangeLogo})`}
          backgroundSize="cover"
          width="10.938rem"
          height="1rem"
        />
      </Flex>
      <Flex justifyContent="space-between" alignItems="center" mt="2rem">
        <Image
          backgroundImage={`url(${mahdaoLogo})`}
          backgroundSize="cover"
          width="9.875rem"
          height="2.125rem"
        />
        <Image
          backgroundImage={`url(${jpycLogo})`}
          backgroundSize="cover"
          width="6.495rem"
          height="2.146rem"
        />
        <Image
          backgroundImage={`url(${holaLogo})`}
          backgroundSize="cover"
          width="6.813rem"
          height="2.125rem"
        />
        <Image
          backgroundImage={`url(${transformLogo})`}
          backgroundSize="cover"
          width="8.25rem"
          height="2.875rem"
        />
      </Flex>
    </Flex>
  </Grid>
);

export default PartnersBlock;
