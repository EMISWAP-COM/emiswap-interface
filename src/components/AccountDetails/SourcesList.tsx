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
    ${({ theme }) => theme.flexRowNoWrap};
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
  ${({ theme }) => theme.mediaWidth.upToMedium`
  > div > div > div > span:first-of-type {
    display: flex;
    justify-content: center;
    align-items: center;
    }
  > div:first-of-type {
    display: none;
  }
  `};
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

const AccountTotalSectionBody = styled.div`
  display: grid;
  margin-bottom: 1.5rem;
  font-size: 1rem;
  color: ${({ theme }) => theme.text3};
  > div:first-of-type > div > div > span:first-of-type {
    display: inline;
  }
`;
const AccountTotalSectionTable = styled.div`
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

export default function SourcesList({
  totalAcquired,
  totalAcquiredInDAI,
  crowdSaleAcquired,
  crowdSaleAlreadyMinted,
  crowdSaleReferralRewardAcquired,
  crowdSaleReferralRewardAlreadyMinted,
}: Record<string, string>) {
  return (
    <>
      <AccountTotalSectionBody>
        <AccountSectionBodyPart>
          <AccountGroupingInfoTitleRow>
            <AccountTotalSectionTable>
              <div>
                <span>Total ESW aquired</span>
                <span>
                  Total ESW aquired
                  <br />
                  {totalAcquired}
                </span>
              </div>
              <div>
                <span>Value in DAI</span>
                <span>
                  Value in DAI
                  <br />
                  {totalAcquiredInDAI}
                </span>
              </div>
            </AccountTotalSectionTable>
          </AccountGroupingInfoTitleRow>
        </AccountSectionBodyPart>
      </AccountTotalSectionBody>
      <AccountSectionHeader>
        <TYPE.mediumHeader>Sources of ESW</TYPE.mediumHeader>
      </AccountSectionHeader>
      <AccountSectionBody>
        <AccountSectionBodyPart>
          <AccountGroupingInfoTitleRow>
            <span>Source of ESW</span>
          </AccountGroupingInfoTitleRow>
          <AccountSectionTable>
            <div>
              <span>ESW acquired</span>
            </div>
            <div>
              <span>
                <span>Minted</span>
              </span>
            </div>
          </AccountSectionTable>
        </AccountSectionBodyPart>
        <AccountSectionBodyPart>
          <AccountGroupingInfoTitleRow>
            <span>Crowdsale</span>
          </AccountGroupingInfoTitleRow>
          <AccountSectionTable>
            <div>
              <span>ESW acquired</span>
              <span>{crowdSaleAcquired}</span>
            </div>
            <div>
              <span>
                <span>Minted</span>
              </span>
              <span>{crowdSaleAlreadyMinted}</span>
            </div>
          </AccountSectionTable>
        </AccountSectionBodyPart>

        <AccountSectionBodyPart>
          <AccountGroupingInfoTitleRow>
            <span>Crowdsale referral reward</span>
          </AccountGroupingInfoTitleRow>
          <AccountSectionTable>
            <div>
              <span>ESW acquired</span>
              <span>coming soon</span>
            </div>
            <div>
              <span>
                <span>Minted</span>
              </span>
              <span>coming soon</span>
            </div>
          </AccountSectionTable>
        </AccountSectionBodyPart>
        <AccountSectionBodyPart>
          <AccountGroupingInfoTitleRow>
            <span>Total</span>
          </AccountGroupingInfoTitleRow>
          <AccountSectionTable>
            <div>
              <span>ESW acquired</span>
              <span>{crowdSaleAcquired + crowdSaleReferralRewardAcquired}</span>
            </div>
            <div>
              <span>
                <span>Minted</span>
              </span>
              <span>{crowdSaleAlreadyMinted + crowdSaleReferralRewardAlreadyMinted}</span>
            </div>
          </AccountSectionTable>
        </AccountSectionBodyPart>
      </AccountSectionBody>
    </>
  );
}
