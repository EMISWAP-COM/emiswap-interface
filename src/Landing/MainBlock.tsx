import React from 'react';
import { Flex, Grid, Head, Text, Image } from 'ThemeProvider';
import mainLogo from 'assets/landing/main-block.png';
import ExclamationHelper from '../components/ExclamationHelper';

const MainBlock = () => (
  <Grid
    height="30rem"
    width="67.75rem"
    gridColumnGap="3.75rem"
    gridTemplateColumns="37.5rem auto"
    ml="auto"
    mr="auto"
  >
    <Flex flexDirection="column" justifyContent="center">
      <Head variant="mediumSoraBold" color="paper">
        Next-Gen DeFi Matrix with 365% Cross-Chain APR & DAO Governance
      </Head>
      <Text variant="largeRubikRegular" color="paper">
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
