import { useState, useEffect } from 'react';
import { formatUnits, parseUnits } from '@ethersproject/units';
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
    if (isApprovalRequired) {
      const { value } = await customMovr.fetchCheckAllowance({
        chainID: fromChainId,
        owner: address,
        allowanceTarget,
        tokenAddress: fromAsset,
      });
      if (parseFloat(formatUnits(value, decimals)) < parseFloat(amount)) {
        const approvalTx = await customMovr.getApprovalBuildTx(
          fromChainId,
          address,
          allowanceTarget,
          fromAsset,
          parseUnits(amount, decimals),
        );
        setTxData([
          {
            to: approvalTx.to,
            data: approvalTx.data,
          },
        ]);
        setStatus('approve');
        return;
      }
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
