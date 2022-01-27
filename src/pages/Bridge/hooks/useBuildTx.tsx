import { useState, useEffect } from 'react';
import { parseUnits } from '@ethersproject/units';
import customMovr from '../movr';

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
) => {
  const [tx, setTxData] = useState<any[]>([]);

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
      !allowanceTarget
    ) {
      return;
    }
    const txs = [];
    if (isApprovalRequired) {
      await customMovr.fetchCheckAllowance({
        chainID: fromChainId,
        owner: address,
        allowanceTarget,
        tokenAddress: fromAsset,
      });
      const approvalTx = await customMovr.getApprovalBuildTx(
        fromChainId,
        address,
        allowanceTarget,
        fromAsset,
        parseUnits(amount, decimals),
      );
      txs.push({
        to: approvalTx.to,
        data: approvalTx.data,
      });
    }
    const currentTX = await customMovr.getBuildTx(
      address,
      fromAsset,
      fromChainId,
      toAsset,
      toChainId,
      parseUnits(amount, decimals),
      output,
      address,
      routePath,
    );
    const allowanceTxData = {
      to: currentTX.tx.to,
      data: currentTX.tx.data,
    };
    txs.push(allowanceTxData);
    setTxData(txs);
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
  ]);

  return { tx };
};

export default useBuildTx;
