import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { CommingSoon } from '../../../base/ui/CommingSoon';
import useWindowDimensions from '../../../hooks/useWindowDimensions';
import { AppState } from '../../../state';
import { TYPE } from '../../../theme'

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

const DateBlock = styled.span`
  font-family: 'IBM Plex Sans';
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  color: ${({ theme }) => theme.grey3};
`;

const Wrapper = styled.div`
  width: 100%;
  overflow: hidden;
  background: none;
  border-radius: 20px;
  border: 1px solid #707070;
  margin-bottom: 20px;
  @media screen and (max-width: 1200px) {
    border-radius: 4px;
    background: #f7f8fa;
    border: none;
  }
`;

const TopRows = styled.div`
  display: flex;
  justify-content: space-between;
  font-family: IBM Plex Sans;
  font-style: normal;
  font-weight: 500;
  font-size: 13px;
  line-height: 17px;
  .item-top {
    background: #ccc;
    position: relative;
    padding: 12px 16px;
    white-space: nowrap;
    margin-bottom: 14px;
    font-family: 'IBM Plex Sans';
    font-style: normal;
    font-weight: 500;
    font-size: 13px;
    line-height: 17px;
  }
  .item-top:after {
    content: '';
    width: 1px;
    height: 20px;
    background: #707070;
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
  }

  > div:nth-child(1) {
    text-align: left;
    .item-bottom {
      padding-left: 16px;
    }
  }

  > div:last-child {
    text-align: right;
    .item-bottom {
      padding-right: 16px;
    }
  }

  @media screen and (max-width: 1200px) {
    flex-direction: column;
    padding: 14px 16px;
    .item-top {
      background: none;
      padding: 0;
      font-family: 'Roboto';
      font-style: normal;
      font-weight: normal;
      font-size: 12px;
      line-height: 21px;
    }
    > div:nth-child(1) {
      .item-bottom {
        padding-left: 0;
      }
    }

    > div:last-child {
      .item-bottom {
        padding-right: 0;
      }
    }
    .item-top:after {
      display: none;
    }
  }
`;

const RowItem = styled.div`
  width: 100%;
  text-align: center;
  position: relative;
  @media screen and (max-width: 1200px) {
    display: flex;
    justify-content: space-between;
  }
`;

const BottomRow = styled.div`
  display: flex;
  justify-content: center;
  padding: 12px 0 2px 0;
  font-family: 'IBM Plex Sans';
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 21px;
  @media screen and (max-width: 1200px) {
    padding-top: 0;
  }
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
  return (
    <>
      <TYPE.mediumHeader>My ESW Performance</TYPE.mediumHeader>
      <Wrapper>
        <TopRows>
          <RowItem>
            <div className="item-top">Total ESW</div>
            <div className="item-bottom">{total}</div>
          </RowItem>
          <RowItem>
            <div className="item-top">Unfrozen</div>
            <div className="item-bottom">{amount || '-'}</div>
          </RowItem>
          <RowItem>
            <div className="item-top">Frozen</div>
            <div className="item-bottom">{nextUnlockAmount || '-'}</div>
          </RowItem>
          <RowItem>
            <div className="item-top">Next unlock amount</div>
            <div className="item-bottom">{lockedAmount || '-'}</div>
          </RowItem>
          <RowItem>
            <div className="item-top">Next unlock date</div>
            <div className="item-bottom">
              <DateBlock>{unlockDate}</DateBlock>
            </div>
          </RowItem>
        </TopRows>
        <BottomRow>
          <CommingSoon>
            <WalletButton>Collect to my wallet</WalletButton>
          </CommingSoon>
        </BottomRow>
      </Wrapper>
    </>
  );
};
