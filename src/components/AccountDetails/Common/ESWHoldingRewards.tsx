import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Header, WalletAction } from '../styleds';
import styled from 'styled-components/macro';

import { AppDispatch, AppState } from '../../../state';
import { loadDepositsEswHistoryRewards } from '../../../state/cabinets/actions';
import { TruncatedTextWithTooltip } from '../../../base/ui/TruncatedTextWithTooltip';

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
    grid-template-columns: repeat(2, 1fr);
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

const Star = styled.span`
  margin-left: 3px;
  color: #e478ff;
`;

const StarForText = styled.span`
  margin-right: 6px;
  color: #e478ff;
`;

const ActionBtn = styled(WalletAction)`
  height: 30px;
`;

const CollectBtnRewards = styled(ActionBtn)`
  background: #27272e;
  border: 1px solid #ffffff;
  color: #ffffff;
  line-height: 16px;
  font-size: 12px;
  border-radius: 4px;
  width: 190px;
  padding: 7px 14px;
  margin-left: auto;
  pointer-events: none;
  @media screen and (max-width: 1200px) {
    margin-bottom: 24px;
    margin-right: auto;
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
          <Star>*</Star>
          <div>
            <RewardsValue>
              {data?.total &&
              `${data?.total}`.includes('.') &&
              `${data?.total}`.split('.')[1].length > 6 ? (
                <TruncatedTextWithTooltip title={parseFloat(`${data?.total}`)}>
                  {parseFloat(`${data?.total}`).toFixed(6)}...
                </TruncatedTextWithTooltip>
              ) : (
                data?.total ?? 0
              )}
            </RewardsValue>
            &nbsp;DAI
          </div>
        </RewardsItem>
        <RewardsItem>
          <span>Collected</span>
          <Star>*</Star>
          <div>
            <RewardsValue>
              {data?.collected &&
              `${data?.collected}`.includes('.') &&
              `${data?.collected}`.split('.')[1].length > 6 ? (
                <TruncatedTextWithTooltip title={parseFloat(`${data?.collected}`)}>
                  {parseFloat(`${data?.collected}`).toFixed(6)}...
                </TruncatedTextWithTooltip>
              ) : (
                data?.collected ?? 0
              )}
            </RewardsValue>
            &nbsp;DAI
          </div>
        </RewardsItem>
        <RewardsItem>
          <span>Available to collect</span>
          <Star>*</Star>
          <div>
            <RewardsValue>
              {data?.available_collect &&
              `${data?.available_collect}`.includes('.') &&
              `${data?.available_collect}`.split('.')[1].length > 6 ? (
                <TruncatedTextWithTooltip title={parseFloat(`${data?.available_collect}`)}>
                  {parseFloat(`${data?.available_collect}`).toFixed(6)}...
                </TruncatedTextWithTooltip>
              ) : (
                data?.available_collect ?? 0
              )}
            </RewardsValue>
            &nbsp;DAI
          </div>
        </RewardsItem>
      </RewardsWrapper>
      <RewardsFooter>
        <CollectBtnRewards>Collect rewards to my wallet</CollectBtnRewards>
        <RewardsText>
          <PrimaryText>
            <StarForText>*</StarForText>
            Conversion to DAI is made at an indicative market rate as for accrual's date and may
            differ from the actual rate
          </PrimaryText>
          <SecondaryText>
            <StarForText>*</StarForText>
            All ESW holders are entitled to get approximately 0.05% from all trading operations on
            EmiSwap.
          </SecondaryText>
        </RewardsText>
      </RewardsFooter>
    </div>
  );
};
