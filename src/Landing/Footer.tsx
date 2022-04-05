import React from 'react';
import styled from 'styled-components';
import { Box, Button, Flex, Image, Text } from '../ThemeProvider/components';
import { color, HeightProps, layout, LayoutProps, space, SpaceProps, system } from 'styled-system';
import EmiswapLogo from '../assets/svg/logo.svg';
import TelegramOutlinedLogo from '../assets/svg/SocIcons/telegramOutlined.svg';
import TwitterLogo from '../assets/svg/SocIcons/twitter.svg';
import MediumLogo from '../assets/svg/SocIcons/medium.svg';
import FacebookLogo from '../assets/svg/SocIcons/facebook.svg';
import DiscordLogo from '../assets/svg/SocIcons/discord.svg';
import { CustomListProps, CustomTextProps } from '../ThemeProvider/customProps';

const ListWrapper = styled(Box)`
  &:nth-of-type(n + 2) {
    margin-left: 3.75rem;
  }
`;

const ListsHeader = styled.header<HeightProps & SpaceProps & LayoutProps & CustomTextProps>`
  ${color};
  ${layout};
  ${space};
  ${system({
    textOverflow: {
      property: 'textOverflow',
      scale: 'textOverflow',
    },
    whiteSpace: {
      property: 'whiteSpace',
      scale: 'whiteSpace',
    },
  })};
`;

const ListLink = styled.a<CustomTextProps>`
  ${color};
  ${system({
    textDecoration: {
      property: 'textDecoration',
      scale: 'textDecoration',
    },
    whiteSpace: {
      property: 'whiteSpace',
      scale: 'whiteSpace',
    },
  })};
`;

const LinkListItem = styled.li<CustomListProps>`
  ${layout};
  ${system({
    listStyleType: {
      property: 'listStyleType',
      scale: 'lists',
    },
  })};
`;

const SocialMediaButton = styled(Button)`
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  cursor: pointer;
  border-radius: 0.625rem;
  & > img {
    width: 20px;
  }
  &:nth-child(n + 2) {
    margin-left: 0.75rem;
  }
`;

SocialMediaButton.defaultProps = {
  width: 3,
  py: '0.375rem',
  bg: 'fadedWhite',
};

const UnorderedListWrapper = styled.ul<SpaceProps>`
  ${space};
`;

const HighlightedLink = styled.a<CustomTextProps>`
  ${color};
  ${system({
    textDecorationColor: {
      property: 'textDecorationColor',
      scale: 'colors',
    },
  })};
`;

const FOOTER_MIN_HEIGHT = 279;

const headerLinks = {
  ['EmiSwap DEX']: '#',
  ['Info']: '#',
  ['Security']: '#',
};

const links = {
  ['EmiSwap DEX']: {
    ['Swap']: '#',
    ['Farming']: '#',
    ['Provide liquidity']: '#',
    ['Referral Program']: '#',
    ['Bridge Multichain']: '#',
  },
  ['Info']: {
    ['Support']: '#',
    ['Analytics']: '#',
    ['Dashboard']: '#',
    ['ESW Token ']: '#',
    ['Wiki']: '#',
  },
  ['Security']: {
    ['Smart Contract \n Audit By Hacken']: '#',
    ['Smart contract \n Audit by BlueSwarm']: '#',
    ['Code']: '#',
  }
};

const LogoPart = () => (
  <Box
    pr="4rem"
    width={1/4}
  >
    <Flex
      alignItems="baseline"
      justifyContent="flex-end"
      mb="4rem"
      width="100%"
      height="100%"
    >
      <Image
        width="9rem"
        height={3}
        backgroundImage={`url(${EmiswapLogo})`}
        backgroundSize="cover"
      />
    </Flex>
  </Box>
);

const LinksPart = () => (
  <Flex width={1/2}>
    {Object.keys(links).map((headerLink) => {
      const listLinks = Object.keys(links[headerLink]).map((listLink) => (
        <LinkListItem
          listStyleType="none"
        >
          <ListLink
            whiteSpace="preLine"
            textDecoration="none"
            color="fadedLink"
            href={links[headerLink][listLink]}
          >
            {listLink}
          </ListLink>
        </LinkListItem>
      ));
      return (
        <ListWrapper>
          <ListsHeader
            height={1}
            mb={2}
            overflow="hidden"
            color="text"
            textOverflow="ellipsis"
            whiteSpace="nowrap"
          >
            <ListLink
              color="text"
              href={headerLinks[headerLink]}
            >
              {headerLink}
            </ListLink>
          </ListsHeader>
          <UnorderedListWrapper p="0">
            {listLinks}
          </UnorderedListWrapper>
        </ListWrapper>
      );
    })}
  </Flex>
);

const SocialsPart = () => (
  <Box width={1/4}>
    <ListsHeader
      height={1}
      mb={2}
      overflow="hidden"
      color="text"
      textOverflow="ellipsis"
      whiteSpace="nowrap"
    >
      <ListLink
        color="text"
      >
        Socials
      </ListLink>
    </ListsHeader>
    <Flex>
      <SocialMediaButton>
        <img src={TelegramOutlinedLogo} alt="Telegram" />
      </SocialMediaButton>
      <SocialMediaButton>
        <img src={TwitterLogo} alt="Twitter" />
      </SocialMediaButton>
      <SocialMediaButton>
        <img src={MediumLogo} alt="Medium" />
      </SocialMediaButton>
      <SocialMediaButton>
        <img src={FacebookLogo} alt="Facebook" />
      </SocialMediaButton>
      <SocialMediaButton>
        <img src={DiscordLogo} alt="Reddit" />
      </SocialMediaButton>
    </Flex>
    <Box>
      <Text
        color="fadedLink"
        mt={2}
        mb={0}
      >
        Received grants from:
      </Text>
      <Text color="text">
        <HighlightedLink
          href="#"
          color="text"
          textDecorationColor="text"
        >
          Near Protocol
        </HighlightedLink>
        <span>&nbsp;&&nbsp;</span>
        <HighlightedLink
          href="#"
          color="text"
          textDecorationColor="text"
        >
          Gate Chain
        </HighlightedLink>
      </Text>
    </Box>
  </Box>
);

const Footer = () => {
  return (
    <Flex
      justifyContent="space-between"
      backgroundColor="bg"
      minHeight={FOOTER_MIN_HEIGHT}
      padding="2rem"
    >
      <LogoPart />
      <LinksPart />
      <SocialsPart />
    </Flex>
  );
};

export default Footer;
