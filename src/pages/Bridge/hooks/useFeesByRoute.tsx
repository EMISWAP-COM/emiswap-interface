import { useState, useEffect } from 'react';
import { useActiveWeb3React } from '../../../hooks';
import { fetchWrapper } from 'api/fetchWrapper';
import { useAppSelector } from 'state/hooks';
import { selectFromToChains } from '../slice';

const useFeesByRoute = route => {
  const { library } = useActiveWeb3React();
  const [fees, setFees] = useState<{ [key: string]: any }>({});
  const { fromChain } = useAppSelector(selectFromToChains);

  useEffect(() => {
    const main = async () => {
      let bridgePrice;
      let bridgeDecimals;
      setFees({});
      if (!route) return;
      const {
        result: {
          tokenPrice: gasUSDPrice,
          tokenInfo: { decimals: gasDecimals },
        },
      } = await fetchWrapper.get(
        `https://backend.movr.network/v1/token-price?` +
          new URLSearchParams({
            tokenAddress: route.fees.gasLimit[0].assetAddress,
            chainId: route.fees.gasLimit[0].chainId,
          }),
      );
      const gasPrice = await library.getGasPrice();

      try {
        const {
          result: {
            tokenPrice,
            tokenInfo: { decimals },
          },
        } = await fetchWrapper.get(
          `https://backend.movr.network/v1/token-price?` +
            new URLSearchParams({
              tokenAddress: route.fees.bridgeFee.assetAddress,
              chainId: fromChain.chainId.toString(),
            }),
        );
        bridgePrice = tokenPrice;
        bridgeDecimals = decimals;
      } catch (e) {
        console.log(e);
      }

      setFees({
        transactionFee:
          (
            (route.fees.gasLimit[0].amount * gasUSDPrice * gasPrice.toNumber()) /
            Math.pow(10, gasDecimals)
          ).toFixed(5) + '$',
        bridgeFee: isFinite(bridgePrice)
          ? ((route.fees.bridgeFee.amount * bridgePrice) / Math.pow(10, bridgeDecimals)).toFixed(
              5,
            ) + '$'
          : '—',
      });
    };
    main();
  }, [route, library]);

  return { fees };
};

export default useFeesByRoute;
