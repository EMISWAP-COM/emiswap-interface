import React from 'react';
import { AnyAction } from 'redux';
import { useDispatch, useSelector } from 'react-redux';

import { useActiveWeb3React } from '../../../../hooks';
import { AppDispatch, AppState } from '../../../../state';
import { loadDepositsEswHistory } from '../../../../state/cabinets/actions';

import {
  LiquidityRewardHistory,
  YourPurchaseHistory,
  ReferralPurchaseHistory,
  FeeCompensationHistory,
  HoldingRewardHistory,
  SwappingRewardHistory,
} from './components';

const MAGIC_CHAIN_ID = 42; // todo: what it is?
const ETHERSCAN_URL = 'https://etherscan.io';
const KOVAN_ETHERSCAN_URL = 'https://kovan.etherscan.io';

export const PurchaseHistory = () => {
  const { chainId } = useActiveWeb3React();

  const dispatch = useDispatch<AppDispatch>();
  const { id: userId } = useSelector((state: AppState) => state.user.info);

  const etherscanBaseUrl = chainId === MAGIC_CHAIN_ID ? KOVAN_ETHERSCAN_URL : ETHERSCAN_URL;

  React.useEffect(() => {
    dispatch((loadDepositsEswHistory(userId) as any) as AnyAction);
  }, [dispatch, userId]);

  return (
    <>
      <LiquidityRewardHistory />

      <YourPurchaseHistory etherscanBaseUrl={etherscanBaseUrl} />

      <ReferralPurchaseHistory etherscanBaseUrl={etherscanBaseUrl} />

      <FeeCompensationHistory etherscanBaseUrl={etherscanBaseUrl} />

      <HoldingRewardHistory />

      <SwappingRewardHistory etherscanBaseUrl={etherscanBaseUrl} />
    </>
  );
};
