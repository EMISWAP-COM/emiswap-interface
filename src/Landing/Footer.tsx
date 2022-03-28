import React from 'react';
import styled from 'styled-components';
import { Flex } from '../ThemeProvider/components';
import { Props } from '../ThemeProvider';
import { flex, color, layout, space, typography } from 'styled-system';
import EmiswapLogo from '../assets/svg/logo.svg';

const FooterWrapper = styled(Flex)<Props>`
  ${flex}
  ${color}
  ${layout}
  ${space}
  padding: 2rem;
  & > div {
    width: 33%;
  }
`;

const LogoWrapper = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: flex-end;
  & > img {
    margin-right: 4rem;
  }
`;

const ListWrapper = styled.div`
  &:nth-of-type(n + 2) {
    margin-left: 3.75rem;
  }
`;

const ListsHeader = styled.header`
  ${color};
  height: 1rem;
  margin-bottom: 1rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const ListLink = styled.a`
  ${color};
  text-decoration: none;
`;

const LinkListItem = styled.li`
  list-style-type: none;
  margin-bottom: 0.5rem;
`;

const UnorderedListWrapper = styled.ul`
  padding: 0;
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
    ['Smart Contract \n audit By Hacken']: '#',
    ['Smart contract \n audit by BlueSwarm']: '#',
    ['Code']: '#',
  }
};

const LogoPart = () => (
  <LogoWrapper>
    <img
      width={142}
      src={EmiswapLogo}
      alt="Emiswap logo"
    />
  </LogoWrapper>
);

const LinksPart = () => (
  <Flex>
    {Object.keys(links).map((headerLink) => {
      const listLinks = Object.keys(links[headerLink]).map((listLink) => (
        <LinkListItem>
          <ListLink
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
            color="text"
          >
            <ListLink
              color="text"
              href={headerLinks[headerLink]}
            >
              {headerLink}
            </ListLink>
          </ListsHeader>
          <UnorderedListWrapper>
            {listLinks}
          </UnorderedListWrapper>
        </ListWrapper>
      );
    })}
  </Flex>
);

const SocialsPart = () => (
  <span>Socials will be here</span>
);

const Footer = () => {
  return (
    <FooterWrapper
      bg="bg"
      minHeight={FOOTER_MIN_HEIGHT}
    >
      <LogoPart />
      <LinksPart />
      <SocialsPart />
    </FooterWrapper>
  );
};

export default Footer;
