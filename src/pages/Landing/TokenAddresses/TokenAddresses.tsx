import React, { useCallback, useEffect, useRef, useState } from 'react';
import copy from 'copy-to-clipboard';

import * as S from './styleds';
import mmPng from '../../../assets/images/metamask.png';
import copySvg from '../../../assets/svg/copy.svg';
import polygonSvg from '../../../assets/svg/polygon-network.svg';
import ethereumSvg from '../../../assets/svg/ethereum-network.svg';
import kccSVG from '../../../assets/svg/kcc-network.svg';
import arrowSvg from '../../../assets/svg/arrow.svg';
import { shortenAddressHeadTail } from '../../../utils';
import { useTranslation } from 'react-i18next';
import chainIds from '../../../constants/chainIds';
import AstarNetworkIcon from '../../../assets/images/astar-network.png';
import ShidenNetworkIcon from '../../../assets/images/shiden-network.png';
import GateChainNetworkIcon from '../../../assets/currencies/GT.png';
import AuroraNetworkIcon from '../../../assets/svg/aurora-network.svg';
import MandalaNetworkIcon from '../../../assets/images/mandala-network.png';
import NftBoostSvg from '../../../assets/svg/nft-boost.svg';

export const tokens = [
  {
    chainName: 'Polygon',
    address: '0xd2A2a353D28e4833FAFfC882f6649c9c884a7D8f',
    chainId: '137',
    icon: polygonSvg,
    symbol: 'ESW',
    decimals: 18,
    isNetwork: true,
  },
  {
    chainName: 'Ethereum',
    address: '0x5a75a093747b72a0e14056352751edf03518031d',
    chainId: '1',
    icon: ethereumSvg,
    symbol: 'ESW',
    decimals: 18,
    isNetwork: true,
  },
  {
    chainName: 'KCC',
    address: '0x8933a6e58eeee063b5fd3221f2e1d17821dc1031',
    chainId: '321',
    icon: kccSVG,
    symbol: 'ESW',
    decimals: 18,
    isNetwork: true,
  },
  {
    chainName: 'Astar',
    address: '0xb361DAD0Cc1a03404b650A69d9a5ADB5aF8A531F',
    chainId: chainIds.ASTAR,
    icon: AstarNetworkIcon,
    symbol: 'ASTR',
    decimals: 18,
    isNetwork: true,
  },
  {
    chainName: 'Shiden',
    address: '0xb4BcA5955F26d2fA6B57842655d7aCf2380Ac854',
    chainId: chainIds.SHIDEN,
    icon: ShidenNetworkIcon,
    symbol: 'SDN',
    decimals: 18,
    isNetwork: true,
  },
  {
    chainName: 'GateChain',
    address: '0x18f38359551258C35e8593d775cb6Fe8D27fd89b',
    chainId: chainIds.GATECHAIN,
    icon: GateChainNetworkIcon,
    symbol: 'GT',
    decimals: 18,
    isNetwork: true,
  },
  {
    chainName: 'Aurora',
    address: '0xd2Fa7C9386040f260e3Ec934601982aD4Cd7902B',
    chainId: chainIds.AURORA,
    icon: AuroraNetworkIcon,
    symbol: 'ETH',
    decimals: 18,
    isNetwork: true,
  },
  /*{
    chainName: 'Mandala',
    address: '0x0000000000000000000100000000000000000000',
    chainId: chainIds.MANDALA,
    icon: MandalaNetworkIcon,
    symbol: 'ACA',
    decimals: 18,
    isNetwork: true,
  },*/
  {
    chainName: 'EmiChiko',
    address: '0xd1f4513cacBFF3AbaF3a6A6bB6D976c5157720C9',
    chainId: '137',
    icon: polygonSvg,
    symbol: 'ESW',
    decimals: 18,
    isNetwork: false,
    isNftBoost: true,
  },
  {
    chainName: 'EmiRoko',
    address: '0x850fbF18C87b6d209e9dE0477B077c613feE5435',
    chainId: '137',
    icon: polygonSvg,
    symbol: 'ESW',
    decimals: 18,
    isNetwork: false,
    isNftBoost: true,
  },
];

const TokenAddresses = () => {
  const { t } = useTranslation();
  const { ethereum } = window as any;

  const optionsRef = useRef(null);
  const switchRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [optionsOpened, setOptionsOpened] = useState(false);

  useOnClickOutside(optionsRef, switchRef, () => setOptionsOpened(false));

  const isMetamask = ethereum?.isMetaMask;
  // @ts-ignore
  const connectedNetworkId = ethereum?.networkVersion;

  const addTokenToMetamsak = useCallback(
    async token => {
      if (!ethereum) return;

      await ethereum.request({
        method: 'wallet_watchAsset',
        params: {
          type: 'ERC20',
          options: {
            address: token.address,
            symbol: token.symbol,
            decimals: token.decimals,
          },
        },
      });
    },
    [ethereum],
  );

  const enableAddToken =
    ethereum && isMetamask && connectedNetworkId === tokens[activeIndex].chainId;

  return (
    <S.Root>
      <S.Control>
        <S.Label>
          {tokens[activeIndex]
            ? `${tokens[activeIndex].chainName} ${tokens[activeIndex].symbol}`
            : t('landing.banner.tokenAddress')}
        </S.Label>
        <S.Details>
          <S.Address>{shortenAddressHeadTail(tokens[activeIndex].address, 4, 20)}</S.Address>
          <S.Controls>
            <S.Metamask
              onClick={() => enableAddToken && addTokenToMetamsak(tokens[activeIndex])}
              disabled={!enableAddToken}
            >
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
            <S.Option
              onClick={() => {
                setActiveIndex(i);
                setOptionsOpened(false);
              }}
            >
              <S.Details>
                <S.Address>{shortenAddressHeadTail(token.address)}</S.Address>
                <S.Controls>
                  <S.Chain>
                    {token.isNftBoost && <S.NftBoostImg src={NftBoostSvg} />}
                    <img className="img-icon" src={token.icon} alt="" />
                    <S.ChainName>{token.chainName}</S.ChainName>
                  </S.Chain>
                </S.Controls>
              </S.Details>
            </S.Option>
          ))}
        </S.Options>
      )}
    </S.Root>
  );
};

// Hook
function useOnClickOutside(ref, excludeRef, handler) {
  useEffect(() => {
    const listener = event => {
      if (
        !ref.current ||
        ref.current.contains(event.target) ||
        excludeRef.current.contains(event.target)
      ) {
        return;
      }
      handler(event);
    };
    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);
    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, excludeRef, handler]);
}

export { TokenAddresses };
