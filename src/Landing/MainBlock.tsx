import React from 'react';
import { Flex, Grid, Image } from 'ThemeProvider';
import Header from 'ui-kit/Header';
import Text from 'ui-kit/Text';
import mainLogo from 'assets/landing/main-block.png';

const MainBlock = () => (
  <Grid
    height="30rem"
    width="65rem"
    gridColumnGap={6}
    gridTemplateColumns="37rem auto"
    ml="auto"
    mr="auto"
  >
    <Flex flexDirection="column" justifyContent="center">
      <Header headerStyle="largeSoraBold" color="white">
        Next-Gen DeFi Matrix with 365% Cross-Chain APR & DAO Governance
      </Header>
      <Text color="white" textStyle="largeRubikRegular">
        Extract the highest daily yields from liquidity mining and farming
      </Text>
    </Flex>
    <Flex>
      <Image
        backgroundImage={`url(${mainLogo})`}
        backgroundSize="cover"
        width="29.38rem"
        height="30rem"
      />
    </Flex>
  </Grid>
);

export default MainBlock;
