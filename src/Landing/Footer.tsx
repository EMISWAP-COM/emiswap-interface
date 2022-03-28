import React from 'react';
import styled from 'styled-components';
import { Flex, Paragraph } from '../ThemeProvider/components';
import { Props } from '../ThemeProvider';
import { flex, color, layout, space } from 'styled-system';
import EmiswapLogo from '../assets/svg/logo.svg';
import TelegramOutlinedLogo from '../assets/svg/SocIcons/telegramOutlined.svg';
import TwitterLogo from '../assets/svg/SocIcons/twitter.svg';
import MediumLogo from '../assets/svg/SocIcons/medium.svg';
import FacebookLogo from '../assets/svg/SocIcons/facebook.svg';
import DiscordLogo from '../assets/svg/SocIcons/discord.svg';

const FooterWrapper = styled(Flex)<Props>`
  ${flex}
  ${color}
  ${layout}
  ${space}
  padding: 2rem;
`;

const LogoWrapper = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: flex-end;
  width: 25%;
  & > img {
    margin-right: 4rem;
  }
`;

const ListWrapper = styled.div`
  &:nth-of-type(n + 2) {
    margin-left: 3.75rem;
  }
`;

const LinksPartWrapper = styled.div`
  display: flex;
  width: 50%;
`;

const SocialsPartWrapper = styled.div`
  width: 25%;
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

const SocialMediaButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2rem;
  height: 2rem;
  border: none;
  cursor: pointer;
  border-radius: 0.625rem;
  background: rgba(255, 255, 255, 0.15);
  & > img {
    width: 20px;
  }
  &:nth-child(n + 2) {
    margin-left: 0.75rem;
  }
`;

const UnorderedListWrapper = styled.ul`
  padding: 0;
`;

const ReceivedGrantsParagraph = styled.p`
  ${color};
  margin-top: 1rem;
  margin-bottom: 0.25rem;
`;

const HighlightedLink = styled.a`
  color: white;
  text-decoration-color: white;
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
  <LinksPartWrapper>
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
  </LinksPartWrapper>
);

const SocialsPart = () => (
  <SocialsPartWrapper>
    <ListsHeader
      color="text"
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
    <div>
      <ReceivedGrantsParagraph color="fadedLink">Received grants from:</ReceivedGrantsParagraph>
      <Paragraph color="text">
        <HighlightedLink href="#">Near Protocol</HighlightedLink>
        <span>&nbsp;&&nbsp;</span>
        <HighlightedLink href="#">Gate Chain</HighlightedLink>
      </Paragraph>
    </div>
  </SocialsPartWrapper>
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
