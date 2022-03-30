import React from 'react';
import { Grid, Flex, StyledHead, SVG } from 'ThemeProvider';
import maskGroupLogo from 'assets/svg/mask-group-logo.svg';
import digfinexLogo from 'assets/svg/digfinex-logo.svg';
import everestLogo from 'assets/svg/everest-logo.svg';
import emirexLogo from 'assets/svg/emirex-logo.svg';
import bigbrainLogo from 'assets/svg/bigbrain-logo.svg';
import alphaLogo from 'assets/svg/alpha-logo.svg';
import etexchangeLogo from 'assets/svg/etexchange-logo.svg';
import mahdaoLogo from 'assets/svg/mahdao-logo.svg';
import jpycLogo from 'assets/svg/jpyc-logo.svg';
import holaLogo from 'assets/svg/hola-logo.svg';
import transformLogo from 'assets/svg/transform-group-logo.svg';

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
        <SVG backgroundImage={`url(${maskGroupLogo})`} width="8.95rem" height="4rem" />
        <SVG backgroundImage={`url(${digfinexLogo})`} width="8.95rem" height="3.5rem" />
        <SVG backgroundImage={`url(${everestLogo})`} width="8.95rem" height="3.5rem" />
        <SVG backgroundImage={`url(${emirexLogo})`} width="8.95rem" height="3.8rem" />
      </Flex>
      <Flex justifyContent="space-between" pl="5.5rem" pr="5.5rem" alignItems="center" mt="1rem">
        <SVG backgroundImage={`url(${bigbrainLogo})`} width="8.95rem" height="3.5rem" />
        <SVG backgroundImage={`url(${alphaLogo})`} width="12.8rem" height="3.8rem" />
        <SVG backgroundImage={`url(${etexchangeLogo})`} width="8.95rem" height="2.5rem" />
      </Flex>
      <Flex justifyContent="space-between" alignItems="center" mt="1rem">
        <SVG backgroundImage={`url(${mahdaoLogo})`} width="8.95rem" height="3.2rem" />
        <SVG backgroundImage={`url(${jpycLogo})`} width="8.95rem" height="3.5rem" />
        <SVG backgroundImage={`url(${holaLogo})`} width="8.95rem" height="3.5rem" />
        <SVG backgroundImage={`url(${transformLogo})`} width="8.95rem" height="4.6rem" />
      </Flex>
    </Flex>
  </Grid>
);

export default PartnersBlock;
