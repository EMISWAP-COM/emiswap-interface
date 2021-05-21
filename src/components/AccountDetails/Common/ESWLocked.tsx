import React from 'react';
import styled from 'styled-components/macro';
import timer from '../../../assets/images/timer.svg';
import lock from '../../../assets/images/lock.svg';
import unlock from '../../../assets/images/unlock.svg';
import { Header } from '../styleds';
import { useSelector } from 'react-redux';
import { AppState } from '../../../state';
import { convertBigDecimal, convertDate, DateFormat } from '../uitls';

const DarkText = styled.span`
  color: ${({ theme }) => theme.white};
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
  background: ${({ theme }) => theme.darkGrey};
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
  const { details, total } = useSelector((state: AppState) => state.cabinets.balance);

  const nextUnlock = details?.locked?.ESW ? details?.locked?.ESW[0] : null;

  return (
    <div>
      <Header>ESW Locked Balance</Header>
      <LockedWrapper>
        <LockedItem>
          <img alt="lock" src={lock} />

          <LockedItemWrapper>
            <span>Locked at Emiswap</span>
            <div>
              <LockedValue>{convertBigDecimal(total.locked.ESW)}</LockedValue>&nbsp;ESW
            </div>
          </LockedItemWrapper>
        </LockedItem>
        <LockedItem>
          <img alt="unlock" src={unlock} />

          <LockedItemWrapper>
            <span>Next unlock amount</span>
            <div>
              <LockedValue>{convertBigDecimal(nextUnlock?.amount)}</LockedValue>
              &nbsp;ESW
            </div>
          </LockedItemWrapper>
        </LockedItem>
        <LockedItem>
          <img alt="timer" src={timer} />
          <LockedItemWrapper>
            <span>Next unlock date</span>
            <DarkText>{convertDate(nextUnlock?.available_at, DateFormat.full)}</DarkText>
          </LockedItemWrapper>
        </LockedItem>
      </LockedWrapper>
    </div>
  );
};
