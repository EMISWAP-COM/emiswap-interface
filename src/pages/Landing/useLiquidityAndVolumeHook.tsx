import { useEffect, useMemo, useState } from 'react';

export type Data = [number, number, number] | [null, null, null];

const LIQUIDITY_VOLUME_KEY = 'Total liquidity and volume';
const ethUrl = 'https://api.thegraph.com/subgraphs/name/lombardi22/emiswap8';
const kccUrl = 'https://thegraph.kcc.network/subgraphs/name/emiswap/emiswap1';
const polygonUrl = 'https://api.thegraph.com/subgraphs/name/lombardi22/polygon';
const shidenUrl = 'https://shiden-graph.emiswap.com/subgraphs/name/shiden';
const astarUrl = 'https://astar-graph.emiswap.com/subgraphs/name/astar';

const getResult = data =>
  data.reduce(
    (acc, item) => [
      acc[0] + parseInt(item.data.emiswapFactories[0].totalLiquidityUSD),
      acc[1] + parseInt(item.data.emiswapFactories[0].totalVolumeUSD),
      acc[2] + parseInt(item.data.emiswapFactories[0].txCount),
    ],
    [0, 0, 0],
  );

const getLocalStoragePair = (
  key: string,
): { initPair: Data; setPairToLocalStorage: (value: [number, number, number]) => void } => {
  const rawValue = localStorage.getItem(key);

  return {
    initPair: rawValue
      ? (rawValue.split(',').map(x => Number(x)) as [number, number, number])
      : [null, null, null],
    setPairToLocalStorage: (newPair: [number, number, number]) => {
      localStorage.setItem(key, newPair.join(','));
    },
  };
};

const fetchLiquidityAndValue = (url: string) =>
  fetch(url, {
    headers: {
      'content-type': 'application/json',
    },
    body:
      '{"query":"{\\n  emiswapFactories(first: 1) {\\n    totalLiquidityUSD\\n    totalVolumeUSD\\n txCount\\n }\\n}\\n","variables":null}',
    method: 'POST',
  });

const useLiquidityAndVolume = (): Data => {
  const [pair, setPair] = useState<Data>([null, null, null]);

  useEffect(() => {
    const { initPair, setPairToLocalStorage } = getLocalStoragePair(LIQUIDITY_VOLUME_KEY);
    setPair(initPair);

    const getLiquidityAndValue = async () => {
      const requests = [ethUrl, kccUrl, polygonUrl, shidenUrl, astarUrl].map(url =>
        fetchLiquidityAndValue(url).then(result => result.json()),
      );

      try {
        const data = await Promise.all(requests);
        // console.log(data);
        setPair(getResult(data));
        setPairToLocalStorage(getResult(data));
      } catch (e) {
        console.error('Grath fetching erorr');
      }
    };

    getLiquidityAndValue();
  }, []);

  return pair;
};

export default useLiquidityAndVolume;
