import { SwipeIcon } from 'assets/svg/swipe';
import React, { ReactElement } from 'react';
import { Grid, Flex, Head, Text } from 'ThemeProvider';
import { BeerLogo, PeopleLogo, RocketLogo, TrailLogo, GameLogo } from 'ui-kit/icons/landing';

const strings = {
  info: [
    {
      head: '100% DEX  Fees Distribution',
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

const LevelBlock = ({ head, text, last }: { head: string; text: string; last?: boolean }) => {
  return (
    <Flex
      alignItems={{ default: 'flex-start', laptop: 'center' }}
      justifyContent="flex-start"
      bg="#2e3033"
      borderTopRightRadius={{ default: 'unset', laptop: '1rem' }}
      borderBottomRightRadius={{ default: last ? '1rem' : 'unset', laptop: '1rem' }}
      borderBottomLeftRadius={{ default: last ? '1rem' : 'unset', laptop: 'unset' }}
      flexDirection={{ default: 'column', laptop: 'row' }}
      minWidth={{ default: '16rem', laptop: '33rem' }}
      p={4}
      boxShadow="landingBox"
    >
      <Head
        variant={{ default: 'smallSoraBold', laptop: 'normalSoraBold' } as any}
        color="paper"
        mb={{ default: '0.5rem', laptop: 'none' }}
        ml={{ default: 'none', laptop: 4 }}
      >
        {head}
      </Head>
      <Text
        variant="mediumRubikRegular"
        ml={{ default: 0, laptop: 4 }}
        // maxWidth="18rem"
        color="greyPaper"
        flex={1}
      >
        {text}
      </Text>
    </Flex>
  );
};

const FeatureBlock = ({ head, text, icon }: { head: string; text: string; icon: ReactElement }) => {
  return (
    <Flex
      bg="#2e3033"
      borderRadius="1rem"
      alignItems="start"
      px={{ default: 3, laptop: 4 }}
      pt={{ default: 4, laptop: 5 }}
      pb={{ default: '3rem', laptop: 'none' }}
      flexDirection="column"
      minWidth="21rem"
      boxShadow="landingBox"
    >
      <Flex
        justifyContent={{ default: 'space-around', laptop: 'center' }}
        alignItems={{ default: 'center', laptop: 'none' }}
        mb={{ default: 'none', laptop: 4 }}
      >
        {icon}
        <Head
          variant={{ default: 'standoutBlockHeadMobile', laptop: 'standoutBlockHead' } as any}
          display={{ default: 'block', laptop: 'none' }}
          ml={5}
        >
          {head}
        </Head>
      </Flex>
      <Head
        variant={{ default: 'standoutBlockHeadMobile', mobileL: 'standoutBlockHead' } as any}
        display={{ default: 'none', laptop: 'block' }}
        mb={4}
      >
        {head}
      </Head>
      <Text variant="largeRubikRegular" color="greyPaper">
        {text}
      </Text>
    </Flex>
  );
};
const InfoBlock = ({ head, text, icon }: { head: string; text: string; icon: ReactElement }) => {
  return (
    <Flex
      bg="#2e3033"
      borderTopLeftRadius="1rem"
      borderBottomLeftRadius={{ default: 'unset', laptop: '1rem' }}
      borderTopRightRadius={{ default: '1rem', laptop: 'unset' }}
      alignItems="flex-start"
      px={{ default: 3, laptop: 4 }}
      pt={{ default: 4, laptop: '4.5rem' }}
      pb={{ default: '3rem', laptop: 'none' }}
      flexDirection={{ default: 'column', laptop: 'row' }}
      minWidth={{ default: '16rem', laptop: 'none' }}
      boxShadow="landingBox"
    >
      <Flex
        justifyContent={{ default: 'space-around', laptop: 'center' }}
        mr={{ default: 0, laptop: 5 }}
        alignItems={{ default: 'center', laptop: 'none' }}
      >
        {icon}
        <Head
          variant={{ default: 'standoutBlockHeadMobile', laptop: 'standoutBlockHead' } as any}
          display={{ default: 'block', laptop: 'none' }}
          ml={4}
        >
          {head}
        </Head>
      </Flex>
      <Flex flexDirection="column" flex={1}>
        <Head
          variant={{ default: 'standoutBlockHeadMobile', mobileL: 'standoutBlockHead' } as any}
          display={{ default: 'none', laptop: 'block' }}
        >
          {head}
        </Head>
        <Text variant="largeRubikRegular" mt="3" color="greyPaper" maxWidth="18rem">
          {text}
        </Text>
      </Flex>
    </Flex>
  );
};

const StandoutBlock = () => (
  <Grid
    justifyContent="center"
    pl={{ default: '1.5rem', laptop: '4rem' }}
    pr={{ default: 'none', laptop: '4rem' }}
  >
    <Flex justifyContent="center" flexDirection="column" alignItems="center">
      <Head
        variant={{ default: 'defaultMobile', mobileL: 'default' } as any}
        mb={{ default: 0, mobile: 5 }}
        textAlign="center"
      >
        What makes Emiswap standout?
      </Head>
      <Flex mb={{ default: 4, mobileL: 6 }} display={{ default: '', laptop: 'none' }}>
        <SwipeIcon />
      </Flex>
    </Flex>
    <Grid
      gridRowGap="2rem"
      gridColumnGap="1rem"
      mt="2rem"
      gridTemplateRows={{ default: ' 1fr auto', laptop: '1fr' }}
      gridTemplateColumns={{ default: ' 1fr 1fr 1fr', laptop: '1fr' }}
      overflowX={{ default: 'auto' }}
    >
      <Grid
        gridTemplateColumns={{ default: '1rf', laptop: '1fr 1fr' }}
        gridColumnGap="1rem"
        gridRowGap="1rem"
      >
        <InfoBlock
          head={strings.info[0].head}
          text={strings.info[0].text}
          icon={
            <BeerLogo
              width={{ default: '7.4rem', laptop: '6.875rem' } as any}
              height={{ default: '7.4rem', laptop: '6.875rem' } as any}
            />
          }
        />
        <Grid gridRowGap="1rem">
          <LevelBlock head={strings.level[0].head} text={strings.level[0].text} />
          <LevelBlock head={strings.level[1].head} text={strings.level[1].text} />
          <LevelBlock head={strings.level[2].head} text={strings.level[2].text} last />
        </Grid>
      </Grid>
      <Grid
        gridTemplateColumns={{ default: '1fr', laptop: '1fr 1fr 1fr' }}
        gridTemplateRows={{ default: '1fr auto', laptop: '1fr' }}
        gridColumnGap="2rem"
        gridRowGap="1rem"
      >
        <FeatureBlock
          head={strings.feature[0].head}
          text={strings.feature[0].text}
          icon={
            <RocketLogo
              width={{ default: '5.5rem', laptop: '6.875rem' } as any}
              height={{ default: '7.4rem', laptop: '6.875rem' } as any}
            />
          }
        />
        <FeatureBlock
          head={strings.feature[1].head}
          text={strings.feature[1].text}
          icon={
            <TrailLogo
              width={{ default: '5.5rem', laptop: '6.875rem' } as any}
              height={{ default: '7.4rem', laptop: '6.875rem' } as any}
            />
          }
        />
        <FeatureBlock
          head={strings.feature[2].head}
          text={strings.feature[2].text}
          icon={
            <GameLogo
              width={{ default: '5.5rem', laptop: '6.875rem' } as any}
              height={{ default: '7.4rem', laptop: '6.875rem' } as any}
            />
          }
        />
      </Grid>
      <Grid
        gridTemplateColumns={{ default: '1rf', laptop: '1fr 1fr' }}
        gridColumnGap="1rem"
        gridRowGap="1rem"
      >
        <InfoBlock
          head={strings.info[1].head}
          text={strings.info[1].text}
          icon={
            <PeopleLogo
              width={{ default: '7.4rem', laptop: '6.875rem' } as any}
              height={{ default: '7.4rem', laptop: '6.875rem' } as any}
            />
          }
        />
        <Grid gridRowGap="1rem">
          <LevelBlock head={strings.level[3].head} text={strings.level[3].text} />
          <LevelBlock head={strings.level[4].head} text={strings.level[4].text} />
          <LevelBlock head={strings.level[5].head} text={strings.level[5].text} last />
        </Grid>
      </Grid>
    </Grid>
  </Grid>
);

export default StandoutBlock;
