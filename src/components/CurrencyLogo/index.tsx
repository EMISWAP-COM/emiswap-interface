import { Token, ETHER } from '@uniswap/sdk';
import React, { useState } from 'react';
import styled from 'styled-components';

import EthereumLogo from '../../assets/images/ethereum-logo.png';

const getTokenLogoURL = address =>
  `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${address}/logo.png`;

const getTokenLogoURL1inch = async ({ symbol, address }) => {
  try {
    return require(`../../assets/currencies/${symbol}.png`);
  } catch {
    const response = await fetch(
      `https://1inch.exchange/assets/tokens/${address.toLowerCase()}.png`,
    );

    if (!response.ok) return '';

    const responseBlob = await response.blob();
    return URL.createObjectURL(responseBlob);
  }
};

const BAD_URIS: { [tokenAddress: string]: true } = {};
const FALLBACK_URIS: { [tokenAddress: string]: string } = {};

export const Image = styled.img<{ size: string }>`
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  background-color: white;
  border-radius: 1rem;
  box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.075);
`;

const StyledEthereumLogo = styled.img<{ size: string }>`
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.075);
  border-radius: 24px;
`;

export default function CurrencyLogo({
  currency,
  size = '24px',
  ...rest
}: {
  currency?: Token;
  size?: string;
  style?: React.CSSProperties;
}) {
  const [, refresh] = useState<number>(0);

  if (currency === ETHER) {
    return <StyledEthereumLogo src={EthereumLogo} size={size} {...rest} />;
  }

  if (currency instanceof Token) {
    let uri: string | undefined;

    if (!uri) {
      const defaultUri = getTokenLogoURL(currency.address);
      if (!BAD_URIS[defaultUri]) {
        uri = defaultUri;
      }
      if (FALLBACK_URIS[currency.address]) {
        uri = FALLBACK_URIS[currency.address];
      }
    }

    if (uri) {
      return (
        <Image
          {...rest}
          alt=""
          src={uri}
          size={size}
          onError={async () => {
            if (currency instanceof Token) {
              BAD_URIS[uri] = true;
              FALLBACK_URIS[currency.address] = await getTokenLogoURL1inch(currency);
            }
            refresh(i => i + 1);
          }}
        />
      );
    }
  }

  return <span />;
}
