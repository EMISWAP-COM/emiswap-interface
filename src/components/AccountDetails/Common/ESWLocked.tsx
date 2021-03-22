import React from 'react';
import styled from 'styled-components/macro';
import timer from '../../../assets/images/timer.svg';
import { Header } from '../styleds';
import { useSelector } from 'react-redux';
import { AppState } from '../../../state';
import { convertBigDecimal } from '../uitls';

const DarkText = styled.span`
  color: ${({ theme }) => theme.grey3};
`;
const LockedWrapper = styled.div`
  font-size: 13px;
  color: ${({ theme }) => theme.grey6};

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

const LockedItem = styled.div`
  display: flex;
  align-items: center;
  padding: 14px;
  background: #f7f8fa;
`;

const LockedItemWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
  margin-left: 10px;
`;
const LockedValue = styled(DarkText)`
  font-size: 16px;
  font-weight: 600;
`;

export const ESWLocked = () => {
  const balance = useSelector((state: AppState) => state.cabinets.balance);

  return (
    <div>
      <Header>ESW Locked Balance</Header>
      <LockedWrapper>
        <LockedItem>
          <img alt="timer" src={timer} />

          <LockedItemWrapper>
            <span>Locked at Emiswap</span>
            <div>
              <LockedValue>{convertBigDecimal(balance?.locked)}</LockedValue>&nbsp;ESW
            </div>
          </LockedItemWrapper>
        </LockedItem>
        <LockedItem>
          <img alt="timer" src={timer} />

          <LockedItemWrapper>
            <span>Next unlock amount</span>
            <div>
              <LockedValue>{convertBigDecimal(balance?.nearest_unlock?.amount)}</LockedValue>
              &nbsp;ESW
            </div>
          </LockedItemWrapper>
        </LockedItem>
        <LockedItem>
          <img alt="timer" src={timer} />
          <LockedItemWrapper>
            <span>Next unlock date</span>
            <DarkText>{convertBigDecimal(balance?.nearest_unlock?.unlock_date)}</DarkText>
          </LockedItemWrapper>
        </LockedItem>
      </LockedWrapper>
    </div>
  );
};
