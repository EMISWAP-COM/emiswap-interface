import React from 'react';
import styled from 'styled-components';
import { TYPE } from '../../theme';

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

export default function SourcesList() {
  return (
    <>
      <AccountSectionHeader>
        <TYPE.mediumHeader>Sources of received ESW</TYPE.mediumHeader>
      </AccountSectionHeader>
      <AccountSectionBody>
        <AccountSectionBodyPart>
          <AccountGroupingInfoTitleRow>
            <span>Bought on crowdsale</span>
          </AccountGroupingInfoTitleRow>
          <AccountSectionTable>
            <div>
              <span>Total acquired (available + minted)</span>
              <span>10000</span>
            </div>
            <div>
              <span>Already minted</span>
              <span>10000</span>
            </div>
            <div>
              <span>Available for minting</span>
              <span>-</span>
            </div>
          </AccountSectionTable>
        </AccountSectionBodyPart>
        <AccountSectionBodyPart>
          <AccountGroupingInfoTitleRow>
            <span>Swapping</span>
          </AccountGroupingInfoTitleRow>
          <AccountSectionTable>
            <div>
              <span>Total acquired (available + minted)</span>
              <span>25</span>
            </div>
            <div>
              <span>Already minted</span>
              <span>5</span>
            </div>
            <div>
              <span>Available for minting</span>
              <span>20</span>
            </div>
          </AccountSectionTable>
        </AccountSectionBodyPart>
        <AccountSectionBodyPart>
          <AccountGroupingInfoTitleRow>
            <span>Providing liquidity</span>
          </AccountGroupingInfoTitleRow>
          <AccountSectionTable>
            <div>
              <span>Total acquired (available + minted)</span>
              <span>25</span>
            </div>
            <div>
              <span>Already minted</span>
              <span>5</span>
            </div>
            <div>
              <span>Available for minting</span>
              <span>20</span>
            </div>
          </AccountSectionTable>
        </AccountSectionBodyPart>
        <AccountSectionBodyPart>
          <AccountGroupingInfoTitleRow>
            <span>Bonus ESW for being crowdsale referral</span>
          </AccountGroupingInfoTitleRow>
          <AccountSectionTable>
            <div>
              <span>Total acquired (available + minted)</span>
              <span>30</span>
            </div>
            <div>
              <span>Already minted</span>
              <span>10</span>
            </div>
            <div>
              <span>Available for minting</span>
              <span>20</span>
            </div>
          </AccountSectionTable>
        </AccountSectionBodyPart>
        <AccountSectionBodyPart>
          <AccountGroupingInfoTitleRow>
            <span>Bonus ESW for being swap referral</span>
          </AccountGroupingInfoTitleRow>
          <AccountSectionTable>
            <div>
              <span>Total acquired (available + minted)</span>
              <span>25</span>
            </div>
            <div>
              <span>Already minted</span>
              <span>5</span>
            </div>
            <div>
              <span>Available for minting</span>
              <span>20</span>
            </div>
          </AccountSectionTable>
        </AccountSectionBodyPart>
        <AccountSectionBodyPart>
          <AccountGroupingInfoTitleRow>
            <span>Bonus ESW for being ambassador</span>
          </AccountGroupingInfoTitleRow>
          <AccountSectionTable>
            <div>
              <span>Total acquired (available + minted)</span>
              <span>30</span>
            </div>
            <div>
              <span>Already minted</span>
              <span>10</span>
            </div>
            <div>
              <span>Available for minting</span>
              <span>0</span>
            </div>
          </AccountSectionTable>
        </AccountSectionBodyPart>
      </AccountSectionBody>
    </>
  );
}
