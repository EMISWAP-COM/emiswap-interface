import React from 'react';
import { TYPE } from '../../../theme';
import styled from 'styled-components';
import { Level } from '../styleds';
import { WalletAction } from '../styleds';
import { useSelector } from 'react-redux';
import { AppState } from '../../../state';
import { convertBigDecimal, normalizeNumber } from '../uitls';
import { CommingSoon } from '../../../base/ui/CommingSoon';

const Wrapper = styled.div`
  width: 100%;
  border: 1px solid #707070;
  border-radius: 20px;
  position: relative;
  margin-bottom: 20px;
  // overflow: hidden;
  background: #e4e5e7;

  @media screen and (max-width: 1200px) {
    display: flex;
    flex-wrap: wrap;
    border-radius: 5px;
    border: none;
  }
`;

const Cell = styled.div`
  flex-grow: 1;
  font-weight: 600;
  display: flex;
  height: 35px;
  align-items: center;
  justify-content: center;
  color: #000000;
  width: 15%;

  > div {
    margin-left: 5px;
  }
`;

const CellSmall = styled(Cell)`
  font-size: 0.8rem;
`;

const Title = styled(Cell)`
  justify-content: flex-start;
  flex-grow: 0;
  min-width: 13rem;
  font-size: 0.8rem;
  font-weight: normal;
  padding-left: 1rem;
  color: #000000;
`;

const TwoCells = styled(Cell)`
  font-size: 1.2rem;
  font-weight: 600;
  width: auto;

  @media screen and (max-width: 1200px) {
    display: flex;
    justify-content: space-between;
  }
`;

const Table = styled.div`
  display: flex;
  width: 100%;

  @media screen and (max-width: 1200px) {
    flex-direction: column;
    padding: 1rem 0;
    background: #f7f8fa;

    > div {
      background: none;
      padding: 0 1rem;
    }

    > div:first-child {
      color: #707070;
    }
  }
`;

const Reward = styled(Table)`
  @media screen and (max-width: 1200px) {
    margin-bottom: 20px;
  }
`;

const Referals = styled(Table)`
  border-top: 1px solid #707070;
  border-bottom: 1px solid #707070;

  @media screen and (max-width: 1200px) {
    border: none;
    width: 50%;
    align-items: flex-start;
  }
`;

const ReferalPurchases = styled(Table)`
  @media screen and (max-width: 1200px) {
    width: 50%;
    align-items: flex-end;
    > div:first-child {
      justify-content: flex-end;
    }
  }
`;


export const ReferalPerformance = () => {
  const { reward, total_amount, total_count, first_level, second_level, third_level } = useSelector(
    (state: AppState) => state.cabinets.performance,
  );

  return (
    <>
      <TYPE.mediumHeader>Total Referral Performance</TYPE.mediumHeader>

      <Wrapper>
        <Reward>
          <Title>Total Referral reward</Title>
          <TwoCells>
            {convertBigDecimal(reward?.esw)} ESW
            <CommingSoon>
              <WalletAction>Claim</WalletAction>
            </CommingSoon>
          </TwoCells>
          <TwoCells>
            {convertBigDecimal(reward?.dai)} DAI
            <CommingSoon>
              <WalletAction>Claim</WalletAction>
            </CommingSoon>
          </TwoCells>
        </Reward>

        <Referals>
          <Title>Total Referrals</Title>
          <Cell>{normalizeNumber(total_count)}</Cell>
          <Cell>
            {normalizeNumber(first_level?.total_count)}
            <Level>1lvl</Level>
          </Cell>
          <Cell>
            {normalizeNumber(second_level?.total_count)}
            <Level>2lvl</Level>
          </Cell>
          <Cell>
            {normalizeNumber(third_level?.total_count)}
            <Level>3lvl</Level>
          </Cell>
        </Referals>

        <ReferalPurchases>
          <Title>Total Ref. Purchases, ESW</Title>
          <CellSmall>{convertBigDecimal(total_amount)}</CellSmall>
          <CellSmall>{convertBigDecimal(first_level?.amount)}</CellSmall>
          <CellSmall>{convertBigDecimal(second_level?.amount)}</CellSmall>
          <CellSmall>{convertBigDecimal(third_level?.amount)}</CellSmall>
        </ReferalPurchases>
      </Wrapper>
    </>
  );
};
