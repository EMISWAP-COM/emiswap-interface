import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { CommingSoon } from '../../../base/ui/CommingSoon';
import { AppState } from '../../../state';
import { TYPE } from '../../../theme';
import { convertBigDecimal, convertDate, DateFormat } from '../uitls';
import { WalletAction } from '../styleds';
import { useHistory } from 'react-router';
import { useWalletModalToggle } from '../../../state/application/hooks';

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

    &:after {
      content: '';
      width: 1px;
      height: 20px;
      background: #707070;
      position: absolute;
      top: 50%;
      right: 0;
      transform: translateY(-50%);
    }

    &.no-border:after {
      display: none;
    }
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

export const ESWStats = () => {
  const balance = useSelector((state: AppState) => state.cabinets.balance);

  const unfrozen = convertBigDecimal(balance?.available);
  const frozen = convertBigDecimal(String(balance?.locked));
  const nextUnlockAmount = convertBigDecimal(balance?.nearest_unlock?.amount);
  const unlockDate =
    balance?.nearest_unlock?.unlock_date === undefined
      ? null
      : convertDate(balance?.nearest_unlock?.unlock_date, DateFormat.short);
  const total = convertBigDecimal(balance?.amount);
  const history = useHistory();
  const toggle = useWalletModalToggle();

  const handleClaim = () => {
    toggle();
    history.push('/claim/ESW');
  };

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
            <div className="item-bottom">{unfrozen}</div>
          </RowItem>
          <RowItem>
            <div className="item-top">Frozen</div>
            <div className="item-bottom">{frozen}</div>
          </RowItem>
          <RowItem>
            <div className="item-top">Next unlock amount</div>
            <div className="item-bottom">{nextUnlockAmount}</div>
          </RowItem>
          <RowItem>
            <div className="item-top no-border">Next unlock date</div>
            <div className="item-bottom">
              <DateBlock>{unlockDate}</DateBlock>
            </div>
          </RowItem>
        </TopRows>
        <BottomRow>
          <CommingSoon>
            <WalletAction onClick={handleClaim}>Collect to my wallet</WalletAction>
          </CommingSoon>
        </BottomRow>
      </Wrapper>
    </>
  );
};
