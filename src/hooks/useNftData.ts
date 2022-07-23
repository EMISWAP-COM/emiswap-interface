import nftPurplePng from '../assets/images/nft-purple.png';
import nftPurpleRabbitPng from '../assets/images/nft-purple-rabbit.png';
import nftPurpleBigPng from '../assets/images/nft-purple-big.png';
import nftPurpleRabbitBigPng from '../assets/images/nft-purple-rabbit-big.png';
import { useActiveWeb3React } from './index';
import { useEffect, useState } from 'react';
import { fetchWrapper } from '../api/fetchWrapper';

export interface IPolygonAccountResponse {
  message: 'OK';
  result: Array<{
    blockNumber: '27037676';
    timeStamp: '1657014803';
    hash: '0xd0b730ee85dccc0775bb3c9f623d34c01bb014093584b4bcc3c50dde24f06fbe';
    nonce: '10';
    blockHash: '0xd73bc43fe867f451e7cb73b3a26edfaf09fc522133c2510554e00979eb2edfca';
    from: '0x0000000000000000000000000000000000000000';
    contractAddress: '0xe8d3de7260e631b81cecb1b29808cd3f3998d1fa';
    to: '0x6e3dfdd80eaefc4c10e5c136b19de0b2a943089e';
    tokenID: '2';
    tokenName: 'EmiChiko Gift Certificate';
    tokenSymbol: 'EMICHIKO' | 'EMIROKO';
    tokenDecimal: '0';
    transactionIndex: '21';
    gas: '143841';
    gasPrice: '2500000028';
    gasUsed: '143841';
    cumulativeGasUsed: '2995566';
    input: 'deprecated';
    confirmations: '102298';
  }>;
  status: '1';
}

export interface INft {
  tokenSymbol: string;
  name: string;
  img: string;
  imgBig: string;
  type: 'basic' | 'top';
}

export default function useNftData() {
  const { /*library, chainId,*/ account } = useActiveWeb3React();

  // const contract = getPolygonNftContract(library!, '0x527b0726d7817ce8a3281a137276e6950efb0a3c', chainId!);

  const [nfts, setNfts] = useState<INft[]>([]);
  const [requestAccount, setRequestAccount] = useState<string | null | undefined>(null);

  const isTest = false;
  const url = isTest ? 'https://api-testnet.polygonscan.com' : 'https://api.polygonscan.com';

  const contractsAddresses = [
    '0xE8d3dE7260e631B81cEcB1B29808Cd3F3998D1FA',
    '0x4A44941B455b15E316F5AAB380A15074f2eF1448',
    '0xd1f4513cacBFF3AbaF3a6A6bB6D976c5157720C9',
    '0x850fbF18C87b6d209e9dE0477B077c613feE5435',
  ].map(value => value.toLowerCase());

  // const address = account as string;
  const address = '0xC1f77e2D09bbB37135D069e969854582B0EaB975';
  // const address = '0x6E3dfdD80EAeFc4C10e5C136b19de0b2a943089E'; // Basic
  // const address = '0x412c090d8CeC64de9Be2ae48689155EA96D5Ac3e'; // Top

  useEffect(() => {
    if (requestAccount !== address) {
      setRequestAccount(address);

      fetchWrapper
        .get(
          `${url}/api?` +
            new URLSearchParams({
              module: 'account',
              action: 'tokennfttx',
              apikey: '58MJVC5HYTPBNYZDJIXBUD63RKACESMMU5',
              address,
            }),
        )
        .then((response: IPolygonAccountResponse) => {
          if (!response?.result?.length) {
            return;
          }

          const items: INft[] = [];

          response.result.forEach(item => {
            if (item.tokenSymbol !== 'EMICHIKO' && item.tokenSymbol !== 'EMIROKO') {
              return;
            }

            if (!contractsAddresses.includes(item.contractAddress.toLowerCase())) {
              return;
            }

            if (items.find(v => v.tokenSymbol === item.tokenSymbol)) {
              return;
            }

            const isBasic = item.tokenSymbol === 'EMIROKO';

            items.push({
              tokenSymbol: item.tokenSymbol,
              name: isBasic ? 'Basic level NFT' : 'Top level NFT',
              img: isBasic ? nftPurpleRabbitPng : nftPurplePng,
              imgBig: isBasic ? nftPurpleRabbitBigPng : nftPurpleBigPng,
              type: isBasic ? 'basic' : 'top',
            } as INft);
          });

          items.sort((a, b) => {
            if (a.type === 'basic' && b.type !== 'basic') {
              return -1;
            }

            return 1;
          });

          setNfts(items);
        })
        .catch(e => console.log(e));
    }
    /* contract.balanceOf('0xC1f77e2D09bbB37135D069e969854582B0EaB975')
       .then((value) => {
         console.log(value);
       });*/
  }, [account]);

  return {
    nfts,
    // nfts: nfts[0] ? [nfts[0]] : [],
  };
}
