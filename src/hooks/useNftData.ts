// @ts-ignore
import nftPurplePng from '../assets/images/nft-purple.png';
// @ts-ignore
import nftGreenPng from '../assets/images/nft-green.png';
import { useActiveWeb3React } from './index';
import { useEffect, useState } from 'react';
import { fetchWrapper } from '../api/fetchWrapper';

export default function useNftData() {
  const { /*library, chainId,*/ account } = useActiveWeb3React();

  // const contract = getPolygonNftContract(library!, '0x527b0726d7817ce8a3281a137276e6950efb0a3c', chainId!);

  const [nfts, setNfts] = useState<any[]>([]);

  useEffect(() => {
    fetchWrapper
      .get(
        `https://api.polygonscan.com/api?` +
          new URLSearchParams({
            module: 'account',
            action: 'tokennfttx',
            apikey: '58MJVC5HYTPBNYZDJIXBUD63RKACESMMU5',
            address: account!, // '0xC1f77e2D09bbB37135D069e969854582B0EaB975',
          }),
      )
      .then(response => {
        const items = response?.result?.map((item: any, index: number) => {
          return {
            name: index === 0 ? 'Basic level NFT' : 'Top level NFT',
            img: index === 0 ? nftPurplePng : nftGreenPng,
          };
        });
        setNfts(items);
      });

    /* contract.balanceOf('0xC1f77e2D09bbB37135D069e969854582B0EaB975')
       .then((value) => {
         console.log(value);
       });*/
  }, [account]);

  return {
    nfts,
  };
}
