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

interface LockedItemInterface {
  alt: string;
  src: string;
  label: string;
  value: string;
  isUnlockDate?: boolean;
}

const Item = ({ alt, src, label, value, isUnlockDate }: LockedItemInterface) => (
  <LockedItem>
    <img alt={alt} src={src} />
    <LockedItemWrapper>
      <span>{label}</span>
      <div>
        <LockedValue>{value}</LockedValue>
        {isUnlockDate ? null : <>&nbsp;ESW</>}
      </div>
    </LockedItemWrapper>
  </LockedItem>
);
export const ESWLocked = () => {
  const { details, total } = useSelector((state: AppState) => state.cabinets.balance);

  const nextUnlock = details?.locked.ESW ? details?.locked.ESW[0] : null;

  return (
    <div>
      <Header>ESW Locked Balance</Header>
      <LockedWrapper>
        <Item
          alt="lock"
          src={lock}
          label="Next unlock amount"
          value={convertBigDecimal(total.locked.ESW)}
        />
        <Item
          alt="unlock"
          src={unlock}
          label="Locked at Emiswap"
          value={convertBigDecimal(nextUnlock?.amount)}
        />
        <Item
          alt="timer"
          src={timer}
          label="Next unlock date"
          value={convertDate(nextUnlock?.available_at, DateFormat.full)}
          isUnlockDate
        />
      </LockedWrapper>
    </div>
  );
};
