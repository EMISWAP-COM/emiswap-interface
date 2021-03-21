import React from 'react';
import styled from 'styled-components/macro';
import timer from '../../../assets/images/timer.svg';

const Header = styled.div`
  margin-top: 36px;
  color: ${({ theme }) => theme.text1};

  @media screen and (max-width: 1200px) {
    margin-top: 24px;
  }
`;

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
  return (
    <div>
      <Header>ESW Locked Balance</Header>
      <LockedWrapper>
        <LockedItem>
          <img alt="timer" src={timer} />

          <LockedItemWrapper>
            <span>Locked at Emiswap</span>
            <div>
              <LockedValue>4 500.00</LockedValue>&nbsp;ESW
            </div>
          </LockedItemWrapper>
        </LockedItem>
        <LockedItem>
          <img alt="timer" src={timer} />

          <LockedItemWrapper>
            <span>Next unlock amount</span>
            <div>
              <LockedValue>4 500.00</LockedValue>
              &nbsp;ESW
            </div>
          </LockedItemWrapper>
        </LockedItem>
        <LockedItem>
          <img alt="timer" src={timer} />
          <LockedItemWrapper>
            <span>Next unlock date</span>
            <DarkText>March 20, 2021</DarkText>
          </LockedItemWrapper>
        </LockedItem>
      </LockedWrapper>
    </div>
  );
};
