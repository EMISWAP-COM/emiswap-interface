import React from 'react';
import styled from 'styled-components';
import { ReactComponent as TwitterIcon } from '../../assets/svg/SocIcons/twitter.svg';
import { ReactComponent as GithubIcon } from '../../assets/svg/SocIcons/github.svg';
import { ReactComponent as MediumIcon } from '../../assets/svg/SocIcons/medium.svg';
import { ReactComponent as TelegramIcon } from '../../assets/svg/SocIcons/telegram.svg';
import { ReactComponent as CoingeckoIcon } from '../../assets/svg/SocIcons/coingecko.svg';
import { ReactComponent as CoinmarketIcon } from '../../assets/svg/SocIcons/coinmarket.svg';
import { ReactComponent as WikiIcon } from '../../assets/svg/SocIcons/wiki.svg';

// import { ReactComponent as DiscordIcon } from '../../assets/svg/SocIcons/discord.svg';

const Wrapper = styled.div`
  position: fixed;
  bottom: 10%;
  right: 32px;
  display: flex;
  flex-flow: column nowrap;
  gap: 16px;

  @media (max-width: 1160px) {
    position: relative;
    flex-flow: row wrap;
    justify-content: center;
    gap: 24px;
    right: auto;
    padding: 40px 50px;
  }

  svg {
    shape-rendering: auto;
  }
`;

const ImgLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  width: 40px;
  background: #272530;
  border: 1px solid #4a4757;
  border-radius: 4px;

  :hover {
    border: 1px solid #7a2df4;

    svg path {
      fill: #000;
    }
  }
`;

export default () => (
  <Wrapper>
    <ImgLink href="https://twitter.com/emiswap">
      <TwitterIcon />
    </ImgLink>
    {/* <ImgLink href="">
      <DiscordIcon />
    </ImgLink> */}
    <ImgLink href="https://github.com/EMISWAP-COM/">
      <GithubIcon />
    </ImgLink>
    <ImgLink href="https://emiswap.medium.com/">
      <MediumIcon />
    </ImgLink>
    <ImgLink href="https://t.me/emiswap_official">
      <TelegramIcon />
    </ImgLink>
    <ImgLink href="https://www.coingecko.com/en/coins/emiswap">
      <CoingeckoIcon />
    </ImgLink>
    <ImgLink href="https://coinmarketcap.com/currencies/emiswap/">
      <CoinmarketIcon />
    </ImgLink>
    <ImgLink href="https://wiki.emiswap.com/">
      <WikiIcon />
    </ImgLink>
  </Wrapper>
);
