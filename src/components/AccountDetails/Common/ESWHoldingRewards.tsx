import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Header, WalletAction } from '../styleds';
import styled from 'styled-components/macro';

import { AppDispatch, AppState } from '../../../state';
import { loadDepositsEswHistoryRewards } from '../../../state/cabinets/actions';

const DarkText = styled.span`
  color: ${({ theme }) => theme.white};
`;
const RewardsWrapper = styled.div`
  font-size: 13px;
  color: ${({ theme }) => theme.darkText};

  margin-top: 12px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 12px;

  @media screen and (max-width: 1200px) {
    margin-top: 16px;
    grid-template-columns: repeat(1, 1fr);
    grid-gap: 8px;
  }
`;

const RewardsItem = styled.div`
  padding: 14px;
  background: ${({ theme }) => theme.darkGrey};
`;
const RewardsValue = styled(DarkText)`
  font-size: 16px;
  font-weight: 600;
`;

const RewardsFooter = styled.div`
  margin-top: 16px;
  display: flex;
  flex-direction: row-reverse;
  @media screen and (max-width: 1200px) {
    flex-direction: column;
  }
`;

const RewardsText = styled.div`
  color: #b7b7ca;
  font-size: 13px;
  line-height: 150%;
`;

const PrimaryText = styled.div`
  max-width: 380px;
`;

const SecondaryText = styled.div`
  padding-top: 16px;
  max-width: 450px;
`;

const ActionBtn = styled(WalletAction)`
  height: 30px;
`;

const CollectBtnRewards = styled(ActionBtn)`
  background: #27272e;
  border: 1px solid #615c69;
  color: #615c69;
  line-height: 16px;
  font-size: 12px;
  border-radius: 4px;
  width: 190px;
  padding: 7px 14px;
  margin-left: auto;
  pointer-events: none;
  @media screen and (max-width: 1200px) {
    margin-bottom: 16px;
  }
`;

export const ESWHoldingRewards = () => {
  const { id: userId } = useSelector((state: AppState) => state.user.info);
  const { depositsEswHistoryRewards: data } = useSelector((state: AppState) => state.cabinets);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(loadDepositsEswHistoryRewards(userId) as any);
  }, [dispatch, userId]);

  return (
    <div>
      <Header>ESW Holding Rewards</Header>
      <RewardsWrapper>
        <RewardsItem>
          <span>Total</span>
          <div>
            <RewardsValue>{data?.total ?? 0}</RewardsValue>
            &nbsp;DAI
          </div>
        </RewardsItem>
        <RewardsItem>
          <span>Collected</span>
          <div>
            <RewardsValue>{data?.collected ?? 0}</RewardsValue>
            &nbsp;DAI
          </div>
        </RewardsItem>
        <RewardsItem>
          <span>Available to collect</span>
          <div>
            <RewardsValue>{data?.available_collect ?? 0}</RewardsValue>
            &nbsp;DAI
          </div>
        </RewardsItem>
      </RewardsWrapper>
      <RewardsFooter>
        <CollectBtnRewards>Collect rewards to my wallet</CollectBtnRewards>
        <RewardsText>
          <PrimaryText>
            Conversion to DAI is made at an indicative market rate as for accrual's date and may
            differ from the actual rate
          </PrimaryText>
          <SecondaryText>
            All ESW holders are entitled to get approximately 0.05% from all trading operations on
            EmiSwap.
          </SecondaryText>
        </RewardsText>
      </RewardsFooter>
    </div>
  );
};
