import React, { useCallback } from 'react';
import styled from 'styled-components/macro';
import { Level } from '../styleds';
import { useSelector } from 'react-redux';
import { AppState } from '../../../state';
import { convertBigDecimal, normalizeNumber } from '../uitls';
import { useIsEthActive } from '../../../hooks/Coins';
import { fetchWrapper } from '../../../api/fetchWrapper';

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
  border-top: ${({ theme }) => `1px solid ${theme.lightGrey}`};

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
  color: ${({ theme }) => theme.white};
  border-bottom: ${({ theme }) => `1px solid ${theme.lightGrey}`};

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
  color: ${({ theme }) => theme.white};

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

export const Header = styled.div`
  color: ${({ theme }) => theme.white};

  @media screen and (max-width: 1200px) {
    margin-top: 24px;
  }
`;

const DownloadLink = styled.a`
  cursor: pointer;
  color: inherit;
  font-weight: 500;
  align-self: end;
  text-decoration: underline;
  color: #b7b7ca;

  :hover {
    text-decoration: none;
  }

  :focus {
    outline: none;
    text-decoration: none;
  }

  :active {
    text-decoration: none;
  }
`;

const HeaderContainer = styled.div`
  margin-top: 36px;
  margin-bottom: 12px;
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
`;

const Referrals = styled(Table)``;

// const CollectBtn = styled(WalletAction)`
//   max-width: 160px;
// `;

const ReferalElement = ({
  title,
  referals,
  firstLevel,
  secondLevel,
  thirdLevel,
}: {
  title: string;
  referals: number | string;
  firstLevel: number | string;
  secondLevel: number | string;
  thirdLevel: number | string;
}) => (
  <Referrals>
    <Title>{title}</Title>
    <Cell>{referals}</Cell>
    <Cell>
      <Amount>{firstLevel}</Amount>
      <Level>1lvl</Level>
    </Cell>
    <Cell>
      <Amount>{secondLevel}</Amount>
      <Level>2lvl</Level>
    </Cell>
    <Cell>
      <Amount>{thirdLevel}</Amount>
      <Level>3lvl</Level>
    </Cell>
  </Referrals>
);

const formatNetwork = (network: string): string => {
  if (network.includes('polygon')) {
    return 'Polygon';
  }
  if (network.includes('eth')) {
    return 'Ethereum';
  }
  return network;
};

const useDownloadCSV = () => {
  const { id: userId } = useSelector((state: AppState) => state.user.info);
  const callback = useCallback(() => {
    fetchWrapper.get(`/v1/public/users/${userId}/referrals/liquidity`).then(({ data }) => {
      const rows = data.map(item =>
        [
          item.date,
          formatNetwork(item.network),
          item.referral_lvl_master,
          item.user_address,
          item.referral_lvl1,
          item.referral_lvl2,
          item.referral_lvl3,
          item.pair_address,
          parseFloat(item.usd_amount),
          -parseFloat(item.usd_amount),
        ].join(','),
      );
      const title = [
        'date',
        'network',
        'parent of master level',
        'child',
        '1lvl parent',
        '2lvl parent',
        '3lvl parent',
        'pair',
        'liquidity staked',
        'liquidity withdrawn',
      ].join(',');

      rows.unshift(title);
      const rowContent = rows.join('\n');
      const content = 'data:text/csv;charset=utf-8,' + rowContent;
      const encodedUri = encodeURI(content);
      const link = document.createElement('a');
      link.setAttribute('href', encodedUri);
      link.setAttribute('download', 'Referrals.csv');
      document.body.appendChild(link);

      link.click();
    });
  }, [userId]);
  return callback;
};

export const ReferralPerformance = () => {
  const { total, referrals } = useSelector((state: AppState) => state.cabinets.performance);
  const { level1, level2, level3 } = total;
  const isEthActive = useIsEthActive();
  const callback = useDownloadCSV();

  return (
    <div>
      <HeaderContainer>
        <Header>Total Referral Performance</Header>
        <DownloadLink onClick={callback}>Download csv</DownloadLink>
      </HeaderContainer>
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
        <ReferalElement
          title={isEthActive ? 'Total Referrals' : 'Total Referral Dashboard'}
          referals={normalizeNumber(referrals.length)}
          firstLevel={normalizeNumber(level1?.referrals_count)}
          secondLevel={normalizeNumber(level2?.referrals_count)}
          thirdLevel={normalizeNumber(level3?.referrals_count)}
        />
        {isEthActive ? (
          <ReferalElement
            title={'Total Ref. Purchases, ESW'}
            referals={convertBigDecimal(total.bought.ESW)}
            firstLevel={convertBigDecimal(level1?.bought.ESW)}
            secondLevel={convertBigDecimal(level2?.bought.ESW)}
            thirdLevel={convertBigDecimal(level3?.bought.ESW)}
          />
        ) : (
          <ReferalElement
            title={'Ref. Rewards by lvl., ESW'}
            referals={convertBigDecimal(total.reward.ESW)}
            firstLevel={'—'}
            secondLevel={'—'}
            thirdLevel={'—'}
          />
        )}
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
