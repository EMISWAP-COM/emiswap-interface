import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { TYPE } from '../../../theme';
import { CommingSoon } from '../../../base/ui/CommingSoon';
import useWindowDimensions from '../../../hooks/useWindowDimensions';
import { AppState } from '../../../state';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background: #f7f8fa;
  border-radius: 4px;
  padding: 1rem;
  margin-bottom: 20px;
`;

const StyledTable = styled.table`
  width: 100%;
  border: 1px solid #707070;
  border-radius: 20px;
  position: relative;
  margin-bottom: 20px;
  overflow: hidden;
  border-spacing: 0;
  margin-bottom: 20px;
`;

const Row = styled.tr`
  display: flex;
  justify-content: space-between;
  padding: 0 1rem;
  height: 40px;
  align-items: center;
  > td:nth-child(1) {
    text-align: left;
  }

  > td:nth-child(5) {
    text-align: right;
  }
`;

const AmountRow = styled(Row)`
  > td:nth-child(1) {
    max-width: 116px;
  }
  > td:nth-child(2) {
    max-width: 110px;
  }
  > td:nth-child(3) {
    max-width: 97px;
  }
  > td:nth-child(4) {
    max-width: 174px;
  }
  > td:nth-child(5) {
    max-width: 153px;
  }
`;

const Cell = styled.td`
  max-height: 20px;
  font-family: 'IBM Plex Sans';
  font-style: normal;
  font-weight: 500;
  font-size: 13px;
  line-height: 17px;
  flex-grow: 1;
  text-align: center;
`;

const TittleRow = styled(Row)`
  background: #e4e5e7;
  > td:not(:last-child) {
    border-right: 1.5px solid #707070;
  }
`;

const ButtonRow = styled(Row)`
  display: flex;
  justify-content: center;
`;

const WalletButton = styled.span`
  display: block;
  width: 100%;
  max-width: 133px;
  padding: 7px 11px 6px 15px;
  height: 29px;
  font-family: 'IBM Plex Sans';
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 16px;
  text-align: center;
  color: ${({ theme }) => theme.black};
  border-radius: 5px;
  background: ${({ theme }) => theme.primary1};
  @media screen and (max-width: 1200px) {
    max-width: 295px;
    height: 40px;
    padding: 11px 80px;
    font-size: 14px;
    font-weight: 500;
  }
`;

const InfoBlock = styled.div`
  display: flex;
  justify-content: space-between;
  align-self: stretch;
`;
const LeftSideBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  span {
    margin-bottom: 12px;
  }
`;

const RightSideBlock = styled(LeftSideBlock)`
  align-items: flex-end;
`;

const SideItem = styled.span`
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 21px;
`;

const Amount = styled.span`
  font-family: 'IBM Plex Sans';
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 21px;
  color: ${({ theme }) => theme.grey3};
`;

const DateBlock = styled.span`
  font-family: 'IBM Plex Sans';
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  color: ${({ theme }) => theme.grey3};
`;

export const getDate = (date: string) => {
  const newDate = new Date(date);
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  return `${months[newDate.getMonth()]} ${newDate.getDay()}, ${newDate.getFullYear()}`;
};

export const ESWStats = () => {
  const { width } = useWindowDimensions();

  const balance = useSelector((state: AppState) => state.cabinets.balance);

  const amount = Number(balance?.amount).toFixed(2);
  const nextUnlockAmount = Number(balance?.nearest_unlock?.amount).toFixed(2);
  const lockedAmount = Number(balance?.locked).toFixed(2);
  const unlockDate = balance?.nearest_unlock?.unlock_date
    ? getDate(balance?.nearest_unlock?.unlock_date)
    : '-';
  const total = amount && lockedAmount ? +amount + +nextUnlockAmount : '-';
  if (width <= 1200) {
    return (
      <>
        <TYPE.mediumHeader>ESW STATS</TYPE.mediumHeader>
        <Wrapper>
          <InfoBlock>
            <LeftSideBlock>
              <SideItem>Total ESW</SideItem>
              <SideItem>Unfrozen</SideItem>
              <SideItem>Next unlock amount</SideItem>
              <SideItem>Frozen</SideItem>
              <SideItem>Next unlock date</SideItem>
            </LeftSideBlock>
            <RightSideBlock>
              <SideItem>
                <Amount>{total}</Amount> ESW
              </SideItem>
              <SideItem>
                <Amount>{amount || '-'}</Amount> ESW
              </SideItem>
              <SideItem>
                <Amount>{nextUnlockAmount || '-'}</Amount> ESW
              </SideItem>
              <SideItem>
                <Amount>{lockedAmount || '-'}</Amount> ESW
              </SideItem>
              <SideItem>
                <DateBlock>{unlockDate}</DateBlock>
              </SideItem>
            </RightSideBlock>
          </InfoBlock>
          <CommingSoon>
            <WalletButton>Collect to my wallet</WalletButton>
          </CommingSoon>
        </Wrapper>
      </>
    );
  }
  return (
    <>
      <TYPE.mediumHeader>ESW STATS</TYPE.mediumHeader>
      <StyledTable>
        <TittleRow>
          <Cell>Total ESW</Cell>
          <Cell>Unfrozen</Cell>
          <Cell>Frozen</Cell>
          <Cell>Next unlock amount</Cell>
          <Cell>Next unlock date</Cell>
        </TittleRow>
        <AmountRow>
          <Cell>{total}</Cell>
          <Cell>{amount || '-'}</Cell>
          <Cell>{nextUnlockAmount || '-'}</Cell>
          <Cell>{lockedAmount || '-'}</Cell>
          <Cell>
            <DateBlock>{unlockDate}</DateBlock>
          </Cell>
        </AmountRow>
        <ButtonRow>
          <CommingSoon>
            <WalletButton>Collect to my wallet</WalletButton>
          </CommingSoon>
        </ButtonRow>
      </StyledTable>
    </>
  );
};
