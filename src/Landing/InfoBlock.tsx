import React from 'react';
import { Flex, Grid, Image, StyledHead } from 'ThemeProvider';
import Text from 'ui-kit/Text';
import infoBlock from 'assets/landing/info-block.png';

const InfoBlock = () => (
  <Grid
    height="33.8rem"
    width="65rem"
    gridColumnGap={6}
    gridTemplateColumns="37rem auto"
    mt={7}
    ml="auto"
    mr="auto"
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
      <Text textStyle="largeRubikRegular" color="white">
        EmiSwap is an AMM DEX and the first project in the EmiDAO ecosystem. 100% of the trading
        fees on the DEX are distributed between liquidity providers and ESW token holders.
      </Text>
    </Flex>
  </Grid>
);

export default InfoBlock;
