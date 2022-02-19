import React, { useState } from 'react';
import styled from 'styled-components/macro';
import { Level } from '../styleds';
import { useSelector } from 'react-redux';
import { AppState } from '../../../state';
import { convertBigDecimal, normalizeNumber } from '../uitls';
import { useIsEthActive } from '../../../hooks/Coins';
import { ChevronDown, ChevronUp } from 'react-feather';

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

const HeaderContainer = styled.div`
  margin-top: 36px;
  margin-bottom: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const DownloadRefferalsWrapper = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  position relative;
  @media screen and (max-width: 1200px) {
    margin-top: 24px;
  }
`;

const DownloadRefferalsButton = styled.a`
  font-family: Roboto;
  font-weight: 400;
  font-size: 12px;
  align-self: end;
  text-decoration: none;
  color: white;
  margin-right: 8px;
`;

const DownloadRefferalsMenuWrapper = styled.div`
  position: absolute;
  top: 28px;
  right: 0;
  width: 125px;
  height: 184px;
  display: grid;
  grid-template-columns: auto;
  background: #27272e;
  border: 1px solid #615c69;
  box-sizing: border-box;
  border-radius: 6px;
  z-index: 200;
`;

const DownloadRefferalsItem = styled.a`
  padding-left: 6px;
  color: white;
  font-size: 12px;
  font-weight: normal;
  display: flex;
  align-items: center;
  font-family: Roboto;
  &:hover {
    background: rgba(255, 255, 255, 0.15);
`;

const Referrals = styled(Table)``;

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

const DownloadRefferals = (userId: string, value: string) => {
  return fetch(`/v1/public/users/${userId}/referrals/report/${value}`)
    .then(response => {
      const reader = response.body.getReader();
      return new ReadableStream({
        start(controller) {
          return pump();
          function pump() {
            return reader.read().then(({ done, value }) => {
              // When no more data needs to be consumed, close the stream
              if (done) {
                controller.close();
                return;
              }
              // Enqueue the next data chunk into our target stream
              controller.enqueue(value);
              return pump();
            });
          }
        },
      });
    })
    .then(stream => new Response(stream))
    .then(response => response.blob())
    .then(blob => URL.createObjectURL(blob))
    .then(url => {
      const link = document.createElement('a');
      link.href = url;
      const d = new Date();
      link.setAttribute(
        'download',
        `Report ${d.getDate()}.${d.getMonth()}.${d.getFullYear()}  ${d.getHours()}.${d.getMinutes()}.xlsx`,
      );
      document.body.appendChild(link);
      link.click();
      link.remove();
    })
    .catch(err => console.error(err));
};

export const ReferralPerformance = () => {
  const { total, referrals } = useSelector((state: AppState) => state.cabinets.performance);
  const { level1, level2, level3 } = total;
  const isEthActive = useIsEthActive();
  const [openMenu, setOpenMenu] = useState(false);
  const { id: userId } = useSelector((state: AppState) => state.user.info);
  const menuItems = [
    {
      value: 'day',
      title: 'Last 24h',
    },
    {
      value: 'week',
      title: 'Last week',
    },
    {
      value: 'month',
      title: 'Last month',
    },
    {
      value: 'year',
      title: 'Last year',
    },
    {
      value: 'all',
      title: 'All time',
    },
  ];

  return (
    <div>
      <HeaderContainer>
        <Header>Total Referral Performance</Header>
        <DownloadRefferalsWrapper onClick={() => setOpenMenu(!openMenu)}>
          <DownloadRefferalsButton>Download report</DownloadRefferalsButton>
          {openMenu ? (
            <>
              <DownloadRefferalsMenuWrapper>
                {menuItems.map(item => (
                  <DownloadRefferalsItem onClick={() => DownloadRefferals(userId, item.value)}>
                    {item.title}
                  </DownloadRefferalsItem>
                ))}
              </DownloadRefferalsMenuWrapper>
              <ChevronUp size={12} color="white" />
            </>
          ) : (
            <ChevronDown size={12} color="white" />
          )}
        </DownloadRefferalsWrapper>
      </HeaderContainer>

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
            firstLevel={convertBigDecimal(total.level1?.reward)}
            secondLevel={convertBigDecimal(total.level2?.reward)}
            thirdLevel={convertBigDecimal(total.level3?.reward)}
          />
        )}
      </Wrapper>
    </div>
  );
};
