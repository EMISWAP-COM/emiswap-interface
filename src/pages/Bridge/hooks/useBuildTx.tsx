import { useState, useEffect } from 'react';
import { formatUnits, parseUnits } from '@ethersproject/units';
import { useGetApprovalBuildTxQuery, useGetBuildTxQuery, useGetCheckAllowanceQuery } from '../api';

const useBuildTx = (
  fromAsset,
  fromChainId,
  toAsset,
  toChainId,
  amount,
  decimals,
  routePath,
  output,
  address,
  isApprovalRequired,
  allowanceTarget,
  nonce,
) => {
  const [tx, setTxData] = useState<any[]>([]);
  const [status, setStatus] = useState<'none' | 'approve' | 'move'>('none');

  async function getDefaults(
    fromAsset,
    fromChainId,
    toAsset,
    toChainId,
    amount,
    decimals,
    routePath,
    output,
    address,
    isApprovalRequired,
    allowanceTarget,
    nonce,
  ) {
    if (
      fromAsset === undefined ||
      fromChainId === undefined ||
      toAsset === undefined ||
      toChainId === undefined ||
      !amount ||
      !routePath ||
      !output ||
      !address ||
      !allowanceTarget ||
      !nonce
    ) {
      return;
    }
    setTxData([]);
    setStatus('none');
    const { data: value } = useGetCheckAllowanceQuery(
      {
        chainID: fromChainId,
        owner: address,
        allowanceTarget,
        tokenAddress: fromAsset,
      },
      { skip: !isApprovalRequired },
    );
    const approvalTx = useGetApprovalBuildTxQuery(
      {
        chainId: fromChainId,
        owner: address,
        allowanceTarget,
        tokenAdress: fromAsset,
        amount: parseUnits(amount, decimals),
      },
      {
        skip:
          !isApprovalRequired ||
          !(parseFloat(formatUnits(Number(value), decimals)) < parseFloat(amount)),
      },
    );
    setTxData([
      {
        to: approvalTx.data.to,
        data: approvalTx.data.data,
      },
    ]);
    setStatus('approve');
    const currentTX = useGetBuildTxQuery({
      recipient: address,
      fromAsset,
      fromChainId,
      toAsset,
      toChainId,
      amount: parseUnits(amount, decimals),
      output,
      fromAddress: address,
      routePath,
    });

    const allowanceTxData = {
      to: currentTX.data.to,
      data: currentTX.data.data,
    };

    setTxData([allowanceTxData]);
    setStatus('move');
  }

  useEffect(() => {
    getDefaults(
      fromAsset,
      fromChainId,
      toAsset,
      toChainId,
      amount,
      decimals,
      routePath,
      output,
      address,
      isApprovalRequired,
      allowanceTarget,
      nonce,
    );
  }, [
    fromAsset,
    fromChainId,
    toAsset,
    toChainId,
    amount,
    decimals,
    routePath,
    output,
    address,
    isApprovalRequired,
    allowanceTarget,
    nonce,
  ]);

  return { tx, status };
};

export default useBuildTx;
