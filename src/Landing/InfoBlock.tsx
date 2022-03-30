import React from 'react';
import { Flex, Grid, Head, Text, Image, StyledHead } from 'ThemeProvider';
import infoBlock from 'assets/landing/info-block.png';

const InfoBlock = () => (
  <Grid
    height="33.8rem"
    width="67.75rem"
    gridColumnGap="3.75rem"
    gridTemplateColumns="35.2rem auto"
    mt="7.5rem"
  >
    <Flex>
      <Image
        backgroundImage={`url(${infoBlock})`}
        backgroundSize="cover"
        width="100%"
        height="100%"
      />
    </Flex>
    <Flex flexDirection="column" justifyContent="center">
      <StyledHead>Meet the EmiDAO Ecosystem</StyledHead>
      <Text variant="largeRubik" color="white" mt="1.86rem">
        EmiSwap is an AMM DEX and the first project in the EmiDAO ecosystem. 100% of the trading
        fees on the DEX are distributed between liquidity providers and ESW token holders.
      </Text>
    </Flex>
  </Grid>
);

export default InfoBlock;
