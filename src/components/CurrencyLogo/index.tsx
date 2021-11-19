import { ETHER, Token } from '@uniswap/sdk';
import React, { useState } from 'react';
import styled from 'styled-components';

import EswLogo from '../../assets/currencies/ESW.png';
import EthereumLogo from '../../assets/images/ethereum-logo.png';
import KucoinLogo from '../../assets/currencies/KCS.png';
import MaticLogo from '../../assets/currencies/MATIC.png';
import AvaxLogo from '../../assets/currencies/AVAX.png';
import defaultCoins from '../../constants/defaultCoins';
import { useActiveWeb3React } from '../../hooks';
import LpTokenSymbol from '../../pages/Farm/LpTokenSymbol';

const getTokenLogoInRaw = address =>
  `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${address}/logo.png`;

const getTokenLogoLocal = ({ symbol, address }) => {
  try {
    return require(`../../assets/currencies/${symbol}.png`);
  } catch (e) {
    return '';
  }
};

const getTokenLogoURL = async (urls: string[]): Promise<string> => {
  for (const url of urls) {
    try {
      const response = await fetch(url);
      if (response.ok) {
        const responseBlob = await response.blob();
        return URL.createObjectURL(responseBlob);
      }
    } catch {
    }
  }

  return '';
};

const getTokenLogo = async ({ symbol, address }) => {
  let url: string = getTokenLogoLocal({ symbol, address });

  if (!url) {
    url = await getTokenLogoURL([
      `https://1inch.exchange/assets/tokens/${address.toLowerCase()}.png`,
      `https://raw.githubusercontent.com/KoffeeSwap/kcc-assets/main/mainnet/tokens/${address}/logo.png`,
    ]);
  }

  return url;
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

export const StyledEthereumLogo = styled.img<{ size: string }>`
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
  const { chainId } = useActiveWeb3React();

  const [refreshCount, refresh] = useState<number>(0);

  if (currency === ETHER) {
    return <StyledEthereumLogo src={EthereumLogo} size={size} {...rest} />;
  }

  if (currency?.symbol === 'KCS' || currency?.symbol === 'WKCS') {
    return <StyledEthereumLogo src={KucoinLogo} size={size} {...rest} />;
  }

  if (currency?.symbol === 'MATIC' || currency?.symbol === 'WMATIC') {
    return <StyledEthereumLogo src={MaticLogo} size={size} {...rest} />;
  }

  if (currency?.symbol === 'AVAX' || currency?.symbol === 'WAVAX') {
    return <StyledEthereumLogo src={AvaxLogo} size={size} {...rest} />;
  }

  if (currency?.symbol === 'ESW') {
    return <StyledEthereumLogo src={EswLogo} size={size} {...rest} />;
  }

  if (currency?.name?.includes('LP ')) {
    return (
      <div {...rest}>
        <LpTokenSymbol size={18} fontSize={10}/>
      </div>
    );
  }

  if (currency instanceof Token) {
    const coinToken = defaultCoins.tokens.find(ct => {
      return ct.address.toLowerCase() === currency.address.toLowerCase() && ct.chainId === chainId;
    });

    let uri: string | undefined = coinToken?.logoURI;

    if (!uri || BAD_URIS[uri]) {
      const defaultUri = getTokenLogoInRaw(currency.address);
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
              FALLBACK_URIS[currency.address] = await getTokenLogo(currency);
            }
            if (refreshCount < 20) {
              refresh(i => i + 1);
            }
          }}
        />
      );
    }
  }

  return <span style={{ width: '20px', height: '20px' }}/>;
}
