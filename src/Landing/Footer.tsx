import React from 'react';
import styled from 'styled-components';
import { Box, Button, Flex, Image, Text } from '../ThemeProvider';
import { color, HeightProps, layout, LayoutProps, space, SpaceProps, system } from 'styled-system';
import EmiswapLogo from '../assets/svg/logo.svg';
import { CustomListProps, CustomTextProps } from '../ThemeProvider/customProps';
import { DiscordIcon } from '../ui-kit/icons';
import theme from '../ThemeProvider/theme';
import { FacebookIcon } from '../ui-kit/icons';
import { MediumIcon } from '../ui-kit/icons';
import { TwitterIcon } from '../ui-kit/icons';
import { TelegramIcon } from '../ui-kit/icons';

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

ListsHeader.defaultProps = {
  height: 3,
};

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

ListLink.defaultProps = {
  textDecoration: 'none',
};

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
  &:nth-child(n + 2) {
    margin-left: 0.75rem;
  }
`;

SocialMediaButton.defaultProps = {
  width: 4,
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

const FOOTER_MIN_HEIGHT = theme.sizes[11];

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
  },
};

const LogoPart = () => (
  <Box pr="4rem" width={1 / 4}>
    <Flex alignItems="baseline" justifyContent="flex-end" mb="4rem" width="100%" height="100%">
      <Image
        width="9rem"
        height={4}
        backgroundImage={`url(${EmiswapLogo})`}
        backgroundSize="cover"
      />
    </Flex>
  </Box>
);

const LinksPart = () => (
  <Flex width={1 / 2}>
    {Object.keys(links).map(headerLink => {
      const listLinks = Object.keys(links[headerLink]).map(listLink => (
        <LinkListItem listStyleType="none">
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
            mb={3}
            overflow="hidden"
            color="text"
            textOverflow="ellipsis"
            whiteSpace="nowrap"
          >
            <ListLink color="text" href={headerLinks[headerLink]}>
              {headerLink}
            </ListLink>
          </ListsHeader>
          <UnorderedListWrapper p="0">{listLinks}</UnorderedListWrapper>
        </ListWrapper>
      );
    })}
  </Flex>
);

const SOCIALS_ICONS_WIDTH = theme.sizes[3];

const SocialsPart = () => (
  <Box width={1 / 4}>
    <ListsHeader mb={3} overflow="hidden" color="text" textOverflow="ellipsis" whiteSpace="nowrap">
      <ListLink color="text">Socials</ListLink>
    </ListsHeader>
    <Flex>
      <SocialMediaButton>
        <TelegramIcon width={SOCIALS_ICONS_WIDTH} height={SOCIALS_ICONS_WIDTH} />
      </SocialMediaButton>
      <SocialMediaButton>
        <TwitterIcon width={SOCIALS_ICONS_WIDTH} height={SOCIALS_ICONS_WIDTH} />
      </SocialMediaButton>
      <SocialMediaButton>
        <MediumIcon width={SOCIALS_ICONS_WIDTH} height={SOCIALS_ICONS_WIDTH} />
      </SocialMediaButton>
      <SocialMediaButton>
        <FacebookIcon width={SOCIALS_ICONS_WIDTH} height={SOCIALS_ICONS_WIDTH} />
      </SocialMediaButton>
      <SocialMediaButton>
        <DiscordIcon width={SOCIALS_ICONS_WIDTH} height={SOCIALS_ICONS_WIDTH} />
      </SocialMediaButton>
    </Flex>
    <Box>
      <Text color="fadedLink" mt={3} mb={1}>
        Received grants from:
      </Text>
      <Text color="text">
        <HighlightedLink href="#" color="text" textDecorationColor="text">
          Near Protocol
        </HighlightedLink>
        <span>&nbsp;&&nbsp;</span>
        <HighlightedLink href="#" color="text" textDecorationColor="text">
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
