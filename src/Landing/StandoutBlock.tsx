import React from 'react';
import { Grid, Flex, StyledHead, Head, Text, StyledText, Image } from 'ThemeProvider';
import peopleIcon from 'assets/landing/people.png';
import rocketIcon from 'assets/landing/rocket-sharp.png';
import trailIcon from 'assets/landing/trail-sign.png';
import beerIcon from 'assets/landing/beer.png';
import gameIcon from 'assets/landing/game-controller.png';

const strings = {
  info: [
    {
      head: '100% DEX Fees Distribution',
      text:
        'Developed by EmiDAO, Emiswap pays ESW holders and liquidity providers all fees. Hodl ESW and watch your rewards grow.',
    },
    {
      head: 'EmiSwap Partner Program ',
      text:
        'The EmiSwap Partner program allows you to earn a percentage of your referrals rewards for providing liquidity and farming.',
    },
  ],
  feature: [
    {
      head: 'Up to 2000% Daily Farming APR',
      text:
        'Users can farm and hold ESW for daily passive income. Emiswap deploys 365 % or 180 % APRs to farming pools on every chain. ',
    },
    {
      head: 'Cross Swaps on 12+ Blockchains',
      text:
        'With our Cross-Chain Bridge Aggregator V1, the community can choose the best route for their swaps and save on commissions. V2 allows for instant swaps without waiting for bridges.',
    },
    {
      head: 'Gamified NFT Magic Cards',
      text:
        "NFT Magic Cards are cutting-edge EmiSwap DEX rewards. They're NFT collectibles that can be traded and played. 10,000 NFT Magic Cards will be awarded for crossing liquidity milestones.",
    },
  ],
  level: [
    {
      head: '0.05%',
      text: 'Of trading commission is distributed among ESW token holders',
    },
    {
      head: '0.25%',
      text: 'Of trading  commission is distributed among active liquidity providers',
    },
    {
      head: '0.30%',
      text: 'Trading commission in any pool',
    },
    {
      head: 'LEVEL 01',
      text: '3% of the purchase amount in ESW equivalent',
    },
    {
      head: 'LEVEL 02',
      text: '5% of the purchase amount in ESW equivalent',
    },
    {
      head: 'LEVEL 03',
      text: '7% of the purchase amount in ESW equivalent',
    },
  ],
};

const IconWrapper = ({ iconUrl }) => (
  <Flex
    justifyContent="center"
    alignItems="center"
    width="6.875rem"
    height="6.875rem"
    bg="silver"
    borderRadius="1rem"
  >
    <Image
      backgroundImage={`url(${iconUrl})`}
      backgroundSize="cover"
      width="3.281rem"
      height="3.3rem"
    />
  </Flex>
);
const LevelBlock = ({ head, text }: { head: string; text: string }) => {
  return (
    <Flex alignItems="center" bg="#2e3033" borderRadius="1rem" pl="1.5rem">
      <Head variant="normalSoraBold" width="auto" ml="4" color="paper">
        {head}
      </Head>
      <Text variant="largeRubikRegular" ml="4" maxWidth="18rem" color="greyPaper">
        {text}
      </Text>
    </Flex>
  );
};

const FeatureBlock = ({ head, text, iconUrl }: { head: string; text: string; iconUrl: any }) => {
  return (
    <Flex
      bg="#2e3033"
      alignItems="flex-start"
      flexDirection="column"
      borderRadius="1rem"
      p="1.5rem"
      pr="2.75rem"
    >
      <Flex mb="1.5rem">
        <IconWrapper iconUrl={iconUrl} />
      </Flex>
      <StyledText>{head}</StyledText>
      <Text variant="largeRubikRegular" mt="3" color="greyPaper">
        {text}
      </Text>
    </Flex>
  );
};
const InfoBlock = ({ head, text, iconUrl }: { head: string; text: string; iconUrl: any }) => {
  return (
    <Grid gridTemplateColumns="10rem auto" pt="4.5rem" bg="#2e3033" borderRadius="1rem">
      <Flex justifyContent="center">
        <IconWrapper iconUrl={iconUrl} />
      </Flex>
      <Flex flexDirection="column">
        <Head variant="smallRubikMedium" color="buttonActive">
          {head}
        </Head>
        <Text variant="largeRubikRegular" mt="3" color="greyPaper" maxWidth="18rem">
          {text}
        </Text>
      </Flex>
    </Grid>
  );
};

const StandoutBlock = () => (
  <Grid
    width="64rem"
    gridTemplateRows="auto auto"
    justifyContent="center"
    mt="7.5rem"
    ml="auto"
    mr="auto"
  >
    <Flex justifyContent="center">
      <StyledHead>What makes Emiswap standout?</StyledHead>
    </Flex>
    <Grid gridTemplateRows="20rem 25.625rem 20rem" gridRowGap="2rem" mt="2rem">
      <Grid gridTemplateColumns="1fr 1fr" gridColumnGap="1rem">
        <InfoBlock head={strings.info[0].head} text={strings.info[0].text} iconUrl={beerIcon} />
        <Grid gridRowGap="1rem">
          <LevelBlock head={strings.level[0].head} text={strings.level[0].text} />
          <LevelBlock head={strings.level[1].head} text={strings.level[1].text} />
          <LevelBlock head={strings.level[2].head} text={strings.level[2].text} />
        </Grid>
      </Grid>
      <Grid gridTemplateColumns="1fr 1fr 1fr" gridColumnGap="2rem">
        <FeatureBlock
          head={strings.feature[0].head}
          text={strings.feature[0].text}
          iconUrl={rocketIcon}
        />
        <FeatureBlock
          head={strings.feature[1].head}
          text={strings.feature[1].text}
          iconUrl={trailIcon}
        />
        <FeatureBlock
          head={strings.feature[2].head}
          text={strings.feature[2].text}
          iconUrl={gameIcon}
        />
      </Grid>
      <Grid gridTemplateColumns="1fr 1fr" gridColumnGap="1rem">
        <InfoBlock head={strings.info[1].head} text={strings.info[1].text} iconUrl={peopleIcon} />
        <Grid gridRowGap="1rem">
          <LevelBlock head={strings.level[3].head} text={strings.level[3].text} />
          <LevelBlock head={strings.level[4].head} text={strings.level[4].text} />
          <LevelBlock head={strings.level[5].head} text={strings.level[5].text} />
        </Grid>
      </Grid>
    </Grid>
  </Grid>
);

export default StandoutBlock;
