import React from 'react';
import styled from 'styled-components/macro';
import { Header, Level } from '../styleds';
import { useSelector } from 'react-redux';
import { AppState } from '../../../state';
import { convertBigDecimal, normalizeNumber } from '../uitls';

// const DarkText = styled.span`
//   color: ${({ theme }) => theme.grey3};
// `;
//
// const RewardsWrapper = styled.div`
//   font-size: 13px;
//   color: ${({ theme }) => theme.grey6};
//
//   margin-top: 12px;
//   margin-bottom: 16px;
//   display: grid;
//   grid-template-columns: 3fr 4fr;
//   grid-gap: 12px;
//
//   @media screen and (max-width: 1200px) {
//     margin-top: 16px;
//     margin-bottom: 12px;
//     grid-template-columns: repeat(1, 1fr);
//     grid-gap: 8px;
//   }
// `;

// const RewardsItem = styled.div`
//   display: flex;
//   justify-content: space-between;
//   padding: 14px;
//   background: #f7f8fa;
// `;
// const RewardsValue = styled(DarkText)`
//   font-size: 16px;
//   font-weight: 600;
// `;

const Wrapper = styled.div`
  width: 100%;
  margin-bottom: 20px;
  border-top: ${({ theme }) => `1px solid ${theme.grey1}`};

  @media screen and (max-width: 1200px) {
    display: flex;
    width: auto;
    border: none;
  }
`;

const Cell = styled.div`
  font-weight: 600;
  font-size: 0.9rem;
  display: flex;
  height: 50px;
  align-items: center;
  justify-content: flex-end;
  width: 16%;
  color: ${({ theme }) => theme.grey3};
  border-bottom: ${({ theme }) => `1px solid ${theme.grey1}`};

  @media screen and (max-width: 1200px) {
    justify-content: flex-start;
    width: auto;
  }
`;

const Title = styled(Cell)`
  justify-content: flex-start;
  width: 150px;
  font-size: 0.8rem;
  font-weight: normal;
  color: ${({ theme }) => theme.grey6};

  @media screen and (max-width: 1200px) {
    padding-right: 20px;
    min-width: 50px;
    width: auto;
  }
`;

const Table = styled.div`
  display: flex;
  justify-content: space-between;

  @media screen and (max-width: 1200px) {
    flex-direction: column;
    flex-grow: 1;
  }
`;

const Amount = styled.span`
  margin-right: 6px;
`;

const Referrals = styled(Table)``;

const ReferralPurchases = styled(Table)``;

// const CollectBtn = styled(WalletAction)`
//   max-width: 160px;
// `;

export const ReferralPerformance = () => {
  const { total, referrals } = useSelector((state: AppState) => state.cabinets.performance);

  const { level1, level2, level3 } = total;

  return (
    <div>
      <Header>Total Referral Performance</Header>
      {/*<RewardsWrapper>*/}
      {/*  <RewardsItem>*/}
      {/*    <div>*/}
      {/*      <span>Referral Reward, ESW</span>*/}
      {/*      <div>*/}
      {/*        <RewardsValue>{convertBigDecimal(total?.reward.ESW)}</RewardsValue>&nbsp;ESW*/}
      {/*      </div>*/}
      {/*    </div>*/}
      {/*  </RewardsItem>*/}
      {/*  <RewardsItem>*/}
      {/*    <div>*/}
      {/*      <span>Referral Reward, DAI</span>*/}
      {/*      <div>*/}
      {/*        <RewardsValue>{convertBigDecimal(total?.reward.DAI)}</RewardsValue>&nbsp;DAI*/}
      {/*      </div>*/}
      {/*    </div>*/}
      {/*    <div>*/}
      {/*      <CollectBtn onClick={() => console.log('no collect handler')}>*/}
      {/*        Collect to my wallet*/}
      {/*      </CollectBtn>*/}
      {/*    </div>*/}
      {/*  </RewardsItem>*/}
      {/*</RewardsWrapper>*/}

      <Wrapper>
        <Referrals>
          <Title>Total Referrals</Title>
          <Cell>{normalizeNumber(referrals.length)}</Cell>
          <Cell>
            <Amount>{normalizeNumber(level1?.referrals_count)}</Amount>
            <Level>1lvl</Level>
          </Cell>
          <Cell>
            <Amount>{normalizeNumber(level2?.referrals_count)}</Amount>
            <Level>2lvl</Level>
          </Cell>
          <Cell>
            <Amount>{normalizeNumber(level3?.referrals_count)}</Amount>
            <Level>3lvl</Level>
          </Cell>
        </Referrals>

        <ReferralPurchases>
          <Title>Total Ref. Purchases, ESW</Title>
          <Cell>{convertBigDecimal(total.bought.ESW)}</Cell>
          <Cell>
            <Amount>{convertBigDecimal(level1?.bought.ESW)}</Amount>
            <Level>1lvl</Level>
          </Cell>
          <Cell>
            <Amount>{convertBigDecimal(level2?.bought.ESW)}</Amount>
            <Level>2lvl</Level>
          </Cell>
          <Cell>
            <Amount>{convertBigDecimal(level3?.bought.ESW)}</Amount>
            <Level>3lvl</Level>
          </Cell>
        </ReferralPurchases>
        {/*<ReferralPurchases>*/}
        {/*  <Title>Total Ref. Purchases, DAI</Title>*/}
        {/*  <Cell>{convertBigDecimal(total.bought.DAI)}</Cell>*/}
        {/*  <Cell>*/}
        {/*    {convertBigDecimal(level1?.bought.DAI)}*/}
        {/*    <Level>1lvl</Level>*/}
        {/*  </Cell>*/}
        {/*  <Cell>*/}
        {/*    {convertBigDecimal(level2?.bought.DAI)}*/}
        {/*    <Level>2lvl</Level>*/}
        {/*  </Cell>*/}
        {/*  <Cell>*/}
        {/*    {convertBigDecimal(level3?.bought.DAI)}*/}
        {/*    <Level>3lvl</Level>*/}
        {/*  </Cell>*/}
        {/*</ReferralPurchases>*/}
      </Wrapper>
    </div>
  );
};
