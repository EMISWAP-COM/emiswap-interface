// @ts-ignore
import nftPurplePng from '../assets/images/nft-purple.png';
// @ts-ignore
import nftGreenPng from '../assets/images/nft-green.png';

export default function useNftData() {
  const nfts = [
    {
      name: 'Basic level NFT',
      img: nftPurplePng,
    },
    {
      name: 'Top level NFT',
      img: nftGreenPng,
    },
  ];

  return {
    nfts,
  };
}
