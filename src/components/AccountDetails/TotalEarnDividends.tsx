import React from 'react';
import styled from 'styled-components';
import { TYPE } from '../../theme';
import { ButtonSecondary } from '../Button';

const AccountGroupingRow = styled.div`
  ${({ theme }) => theme.flexRowNoWrap};
  justify-content: space-between;
  align-items: center;
  font-weight: 400;
  color: ${({ theme }) => theme.text1};

  div {
    ${({ theme }) => theme.flexRowNoWrap}
    align-items: center;
  }
`;

const AccountGroupingInfoRow = styled.div`
  ${({ theme }) => theme.flexRowNoWrap};
  flex-direction: row;
  border-right: 1px solid #edeef2;
  padding: 0.5rem 1rem;
  justify-content: space-between;
  flex: 1 1 auto;
`;

const AccountGroupingInfoColumn = styled.div`
  ${({ theme }) => theme.flexRowNoWrap};
  flex-direction: column;
  border-right: 1px solid #edeef2;
  padding: 0.5rem 1rem;
  flex: 1 1 auto;
  div {
    ${({ theme }) => theme.flexRowNoWrap};
    justify-content: space-between;
    flex: 1 1 auto;
  }
`;

const AccountGroupingInfoTitleRow = styled.div`
  flex: 1;
  justify-content: center;
  font-weight: 600;
  border-right: 1px solid #edeef2;
  padding: 0.5rem 0.5rem 0.5rem 1rem;
`;

const AccountSectionHeader = styled(AccountGroupingRow)`
  margin-bottom: 0.5rem;
  justify-content: center;
`;

const AccountSectionBody = styled.div`
  display: grid;
  margin-bottom: 1.5rem;
  border: 1px solid ${({ theme }) => theme.bg3};
  border-radius: 20px;
  font-size: 0.825rem;
  color: ${({ theme }) => theme.text3};
  > div:first-of-type > div > div > span:first-of-type {
    display: inline;
  }
`;

const Divider = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.bg3};
`;

const AccountSectionBodyPart = styled.div`
  display: flex;
  flex-wrap: wrap;
  position: relative;
  flex-direction: row;
  ${({ theme }) => theme.mediaWidth.upToMedium`
    flex-direction: column;
  `};
`;

const AccountSectionTable = styled.div`
  display: flex;
  flex: 5;
  flex-wrap: wrap;
  position: relative;
  flex-direction: row;
  > div {
    ${({ theme }) => theme.flexRowNoWrap};
    justify-content: space-between;
    flex: 1;
    flex-grow: 1;
    padding: 0.5em 0.25em;
    overflow: hidden;
    flex-direction: column;
    text-align: center;
    background-color: ${({ theme }) => theme.bg2};
    > span:first-of-type {
      display: none;
    }
  }
  ${({ theme }) => theme.mediaWidth.upToMedium`
    display: block;
    flex-direction: column;
    > div {
      width: 100% !important;
      flex-direction: row;
      justify-content: space-between;
      padding: 0.25em 0.5em;
      &:first-of-type {
        padding: 0.5em 0.5em 0.25em;
      }
      &:last-of-type {
        padding: 0.25em 0.5em 0.5em;
      }
      > span:first-of-type {
        display: inline;
      }
    }
  `};
`;

const AccountButtonSecondary = styled(ButtonSecondary)`
  width: fit-content;
  font-size: 0.825rem;
  padding: 4px 6px;
  margin-top: 1rem;
  :hover {
    cursor: pointer;
    text-decoration: none;
  }
`;

export default function TotalEarnDividends({ availableToCollect, frozenTokens, nextUnlockAmount, nextUnlockDate }) {
  return (
    <>
      <AccountSectionHeader>
        <TYPE.mediumHeader>Total ESWc</TYPE.mediumHeader>
      </AccountSectionHeader>
      <AccountSectionBody>
        <AccountSectionBodyPart>
          <AccountGroupingInfoTitleRow>
            <span>&nbsp;</span>
          </AccountGroupingInfoTitleRow>
          <AccountSectionTable>
            <div>
              <span>Total ESWc amount</span>
            </div>
            <div>
              <span>Available to collect</span>
            </div>
            <div>
              <span>Frozen tokens</span>
            </div>
            <div>
              <span>Next unlock amount</span>
            </div>
            <div>
              <span>Date of next unlock</span>
            </div>
          </AccountSectionTable>
        </AccountSectionBodyPart>
        <AccountSectionBodyPart>
          <AccountGroupingInfoTitleRow>
            <span>ESWc on Smart Contract</span>
          </AccountGroupingInfoTitleRow>
          <AccountSectionTable>
            <div>
              <span>Total ESWc amount</span>
              <span>{availableToCollect + frozenTokens}</span>
            </div>
            <div>
              <span>Available to collect</span>
              <span>{availableToCollect}</span>
            </div>
            <div>
              <span>Frozen tokens</span>
              <span>{frozenTokens}</span>
            </div>
            <div>
              <span>Next unlock amount</span>
              <span>{nextUnlockAmount}</span>
            </div>
            <div>
              <span>Date of next unlock</span>
              <span>{nextUnlockDate}</span>
            </div>
          </AccountSectionTable>
        </AccountSectionBodyPart>
        <Divider />
        <AccountSectionBodyPart>
          <AccountGroupingInfoColumn>
            <div>
              <span>ESWc on Smark Contract</span>
              <span>100</span>
            </div>
            <AccountButtonSecondary>Collect to my wallet</AccountButtonSecondary>
          </AccountGroupingInfoColumn>
          <AccountGroupingInfoRow>
            <span>Total ESWc</span>
            <span>280</span>
          </AccountGroupingInfoRow>
        </AccountSectionBodyPart>
      </AccountSectionBody>
    </>
  );
}
