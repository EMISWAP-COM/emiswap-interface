import React, { useState, useRef, useEffect, useCallback } from 'react';
import copy from 'copy-to-clipboard';

import * as S from './styleds';
import mmPng from '../../../assets/images/metamask.png';
import copySvg from '../../../assets/svg/copy.svg';
import polygonSvg from '../../../assets/svg/polygon-network.svg';
import ethereumSvg from '../../../assets/svg/ethereum-network.svg';
import kucoinSvg from '../../../assets/svg/kucoin-network.svg';
import arrowSvg from '../../../assets/svg/arrow.svg';
import { shortenAddressHeadTail } from '../../../utils';
import { useActiveWeb3React } from '../../../hooks';
import { useTranslation } from 'react-i18next';


const TokenAddresses = () => {
  const { connector } = useActiveWeb3React();
  const { t } = useTranslation();

  const optionsRef = useRef(null);
  const switchRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [optionsOpened, setOptionsOpened] = useState(false);

  useOnClickOutside(optionsRef, switchRef, () => setOptionsOpened(false));

  const isMetamask = window?.ethereum?.isMetaMask;
  // @ts-ignore
  const connectedNetworkId = window?.ethereum?.networkVersion;

  const addTokenToMetamsak = useCallback(async (token) => {
    if (!connector) return;

    const provider = await connector.getProvider();

    provider.request({
      method: 'wallet_watchAsset',
      params: {
        type: 'ERC20',
        options: {
          address: token.address,
          symbol: token.symbol,
          decimals: token.decimals,
        },
      },
    })
  }, [connector]);

  const tokens = [
    {
      chainName: 'Polygon',
      address: '0xd2A2a353D28e4833FAFfC882f6649c9c884a7D8f',
      chainId: '137',
      icon: polygonSvg,
      symbol: 'ESW',
      decimals: 18,
    },
    {
      chainName: 'Ethereum',
      address: '0x5a75a093747b72a0e14056352751edf03518031d',
      chainId: '1',
      icon: ethereumSvg,
      symbol: 'ESW',
      decimals: 18
    },
    {
      chainName: 'Kucoin',
      address: '0x8933a6e58eeee063b5fd3221f2e1d17821dc1031',
      chainId: '321',
      icon: kucoinSvg,
      symbol: 'ESW',
      decimals: 18
    }
  ]

  const enableAddToken = connector && isMetamask && connectedNetworkId === tokens[activeIndex].chainId;

  return (
    <S.Root>
      <S.Control>
        <S.Label>{t('landing.banner.tokenAddress')}</S.Label>
        <S.Details>
          <S.Address>{shortenAddressHeadTail(tokens[activeIndex].address, 4, 20)}</S.Address>
          <S.Controls>
            <S.Metamask onClick={() => enableAddToken && addTokenToMetamsak(tokens[activeIndex])} disabled={!enableAddToken}>
              <img src={mmPng} alt="" />
            </S.Metamask>
            <S.Copy onClick={() => copy(tokens[activeIndex].address)}>
              <img src={copySvg} alt="" />
            </S.Copy>
            <S.Chain onClick={() => setOptionsOpened(!optionsOpened)} ref={switchRef}>
              <img src={tokens[activeIndex].icon} alt="" />
              <S.Arrow src={arrowSvg} />
            </S.Chain>
          </S.Controls>
        </S.Details>
      </S.Control>
      {optionsOpened && (
        <S.Options ref={optionsRef}>
          {tokens.map((token, i) => (
            <S.Option onClick={() => {setActiveIndex(i); setOptionsOpened(false);}}>
              <S.Details>
                <S.Address>{shortenAddressHeadTail(token.address)}</S.Address>
                <S.Controls>
                  <S.Chain><img src={token.icon} alt="" /><S.ChainName>{token.chainName}</S.ChainName></S.Chain>
                </S.Controls>
              </S.Details>
            </S.Option>
          ))}  
        </S.Options>
      )}
    </S.Root>
  )
}

// Hook
function useOnClickOutside(ref, excludeRef, handler) {
  useEffect(
    () => {
      const listener = (event) => {
        if (!ref.current || ref.current.contains(event.target) || excludeRef.current.contains(event.target)) {
          return;
        }
        handler(event);
      };
      document.addEventListener("mousedown", listener);
      document.addEventListener("touchstart", listener);
      return () => {
        document.removeEventListener("mousedown", listener);
        document.removeEventListener("touchstart", listener);
      };
    },
    [ref, excludeRef, handler]
  );
}

export { TokenAddresses };
