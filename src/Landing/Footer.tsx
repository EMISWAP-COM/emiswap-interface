import React from 'react';
import styled from 'styled-components';
import { Box, Flex, Text } from 'ThemeProvider';
import { color, HeightProps, layout, LayoutProps, space, SpaceProps, system } from 'styled-system';
import { CustomListProps, CustomTextProps } from '../ThemeProvider/customProps';
import { DiscordIcon, ESWLogo } from '../ui-kit/icons';
import {
  GithubIcon,
  FacebookIcon,
  MediumIcon,
  TwitterIcon,
  TelegramIcon,
} from '../ui-kit/icons/socials';

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

const SocialMediaButton = styled.a`
  cursor: pointer;
  &:nth-child(n + 2) {
    margin-left: 0.75rem;
  }
`;

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
  <Flex mb={4}>
    <ESWLogo />
  </Flex>
);

const LinksPart = () => (
  <Flex flexDirection={{ default: 'column', mobileL: 'row' }}>
    {Object.keys(links).map(headerLink => {
      const listLinks = Object.keys(links[headerLink]).map(listLink => (
        <LinkListItem listStyleType="none">
          <ListLink whiteSpace="preLine" textDecoration="none" href={links[headerLink][listLink]}>
            <Text variant="normalRubikRegular" color="fadedLink">
              {listLink}
            </Text>
          </ListLink>
        </LinkListItem>
      ));
      return (
        <Box ml={{ default: 0, laptop: '3.75rem' }} pr={{ default: 6, laptop: 0 }}>
          <ListLink href={headerLinks[headerLink]}>
            <Text variant="mediumRubikMedium" color="paper">
              {headerLink}
            </Text>
          </ListLink>
          <UnorderedListWrapper p="0">{listLinks}</UnorderedListWrapper>
        </Box>
      );
    })}
  </Flex>
);

const SocialsPart = () => (
  <Box>
    <ListsHeader overflow="hidden" color="paper" textOverflow="ellipsis" whiteSpace="nowrap">
      <ListLink>
        <Text variant="mediumRubikMedium" color="paper">
          Socials
        </Text>
      </ListLink>
    </ListsHeader>
    <Flex my={3}>
      <SocialMediaButton>
        <TelegramIcon />
      </SocialMediaButton>
      <SocialMediaButton>
        <TwitterIcon />
      </SocialMediaButton>
      <SocialMediaButton>
        <MediumIcon />
      </SocialMediaButton>
      <SocialMediaButton>
        <FacebookIcon />
      </SocialMediaButton>
      <SocialMediaButton>
        <DiscordIcon />
      </SocialMediaButton>
      <SocialMediaButton>
        <GithubIcon />
      </SocialMediaButton>
    </Flex>
    <Box>
      <Text variant="normalRubikRegular" color="fadedLink" mt={3} mb={1}>
        Received grants from:
      </Text>
      <br />
      <Text variant="mediumRubikMedium" color="paper">
        <HighlightedLink href="#" color="paper" textDecorationColor="paper">
          Near Protocol
        </HighlightedLink>
        <span>&nbsp;&&nbsp;</span>
        <HighlightedLink href="#" color="paper" textDecorationColor="paper">
          Gate Chain
        </HighlightedLink>
      </Text>
    </Box>
  </Box>
);

const Footer = () => {
  return (
    <Flex
      justifyContent="space-around"
      backgroundColor="bg3"
      padding="2rem"
      flexWrap="wrap"
      flexDirection={{ default: 'column', laptop: 'row' }}
    >
      <LogoPart />
      <LinksPart />
      <SocialsPart />
    </Flex>
  );
};

export default Footer;
