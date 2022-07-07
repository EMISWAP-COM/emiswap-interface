// @ts-nocheck
import nftPurplePng from '../assets/images/nft-purple.png';
import nftPurpleRabbitPng from '../assets/images/nft-purple-rabbit.png';
import nftPurpleBigPng from '../assets/images/nft-purple-big.png';
import nftPurpleRabbitBigPng from '../assets/images/nft-purple-rabbit-big.png';
import { useActiveWeb3React } from './index';
import { useEffect, useState } from 'react';
import { fetchWrapper } from '../api/fetchWrapper';

export interface INft {
  name: string;
  img: string;
  imgBig: string;
}

export default function useNftData() {
  const { /*library, chainId,*/ account } = useActiveWeb3React();

  // const contract = getPolygonNftContract(library!, '0x527b0726d7817ce8a3281a137276e6950efb0a3c', chainId!);

  const [nfts, setNfts] = useState<INft[]>([]);

  const isTest = false;
  const url = isTest ? 'https://api-testnet.polygonscan.com' : 'https://api.polygonscan.com';

  useEffect(() => {
    fetchWrapper
      .get(
        `${url}/api?` +
          new URLSearchParams({
            module: 'account',
            action: 'tokennfttx',
            apikey: '58MJVC5HYTPBNYZDJIXBUD63RKACESMMU5',
            address: '0xC1f77e2D09bbB37135D069e969854582B0EaB975', // 0xE8d3dE7260e631B81cEcB1B29808Cd3F3998D1FA
          }),
      )
      .then(response => {
        const items: INft[] = response?.result?.map((item: any, index: number) => {
          return {
            name: index === 0 ? 'Basic level NFT' : 'Top level NFT',
            img: index === 0 ? nftPurpleRabbitPng : nftPurplePng,
            imgBig: index === 0 ? nftPurpleRabbitBigPng : nftPurpleBigPng,
          } as INft;
        });
        setNfts(items);
      });

    /* contract.balanceOf('0xC1f77e2D09bbB37135D069e969854582B0EaB975')
       .then((value) => {
         console.log(value);
       });*/
  }, [account]);

  return {
    // nfts,
    nfts: nfts[0] ? [nfts[0]] : [],
  };
}
