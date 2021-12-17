import React, { useState, useEffect } from 'react';
import { useActiveWeb3React } from '../../../hooks';
import Web3 from 'web3';

const useFeesByRoute = route => {
  const { library } = useActiveWeb3React();
  const [fees, setFees] = useState<{ [key: string]: any }>({});

  useEffect(() => {
    if (!route) return;

    library.getGasPrice().then(gasPrice => {
      const gas = Web3.utils.fromWei(gasPrice.toString());

      setFees({
        transactionFee: route.fees.gasLimit.amount * Number(gas.toString()),
        bridgeFee: Web3.utils.fromWei(route.fees.bridgeFee.amount),
      });
    });
  }, [route, library]);

  return { fees };
};

export default useFeesByRoute;
