import React from 'react';
import styled from 'styled-components';
import { TYPE } from '../../theme';
import Question from '../../components/QuestionHelper';

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
  overflow: hidden;
  color: ${({ theme }) => theme.text3};
  > div > div > div > span:first-of-type {
    display: none;
  }
  > div:first-of-type > div > div > span:first-of-type {
    display: flex;
    justify-content: center;
    align-items: center;
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
    }
  `};
`;


const AccountTotalSectionBody = styled.div`
  display: grid;
  margin-bottom: 1.5rem;
  font-size: 1 rem;
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
  crowdSaleAvailableForMinting,
  crowdSaleReferralRewardAcquired,
  crowdSaleReferralRewardAlreadyMinted,
  crowdSaleReferralRewardAvailableForMinting
}) {
  return (
    <>
      <AccountTotalSectionBody>
        <AccountSectionBodyPart>
          <AccountGroupingInfoTitleRow style={{ borderRight: '0px'}}>
            <AccountTotalSectionTable>
              <div>
                <span>Total ESWc aquired</span>
                <span>{totalAcquired}</span>
              </div>
              <div>
                <span>Value in DAI</span>
                <span>{totalAcquiredInDAI}</span>
              </div>
            </AccountTotalSectionTable>
          </AccountGroupingInfoTitleRow>
          {/* <AccountSectionTable> */}
            {/* <div>
              <span>Total ESWc aquired</span>
              <span>{totalAcquired}</span>
            </div>
            <div>
              <span>Value in DAI</span>
              <span>{totalAcquiredInDAI}</span>
            </div> */}
          {/* </AccountSectionTable> */}
        </AccountSectionBodyPart>
      </AccountTotalSectionBody>
      <AccountSectionHeader>
        <TYPE.mediumHeader>ESWc sources</TYPE.mediumHeader>
      </AccountSectionHeader>
      <AccountSectionBody>
        <AccountSectionBodyPart>
          <AccountGroupingInfoTitleRow>
            <span>ESWc source</span>
          </AccountGroupingInfoTitleRow>
          <AccountSectionTable>
            <div>
              <span>ESWc acquired</span>
            </div>
            <div>
              <span>
                <span>Minted</span>
                <Question isSetting text="These are already minted ESW tokens that earn you profit." />
              </span>
            </div>
            {/* <div>
              <span>Available for minting</span>
            </div> */}
          </AccountSectionTable>
        </AccountSectionBodyPart>
        <AccountSectionBodyPart>
          <AccountGroupingInfoTitleRow>
            <span>Crowdsale</span>
          </AccountGroupingInfoTitleRow>
          <AccountSectionTable>
            <div>
              <span>ESWc acquired</span>
              <span>{crowdSaleAcquired}</span>
            </div>
            <div>
              <span>
                <span>Minted</span>
                <Question isSetting text="These are already minted ESW tokens that earn you profit." />
              </span>
              <span>{crowdSaleAlreadyMinted}</span>
            </div>
            {/* <div>
              <span>Available for minting</span>
              <span>{crowdSaleAvailableForMinting}</span>
            </div> */}
          </AccountSectionTable>
        </AccountSectionBodyPart>

        <AccountSectionBodyPart>
          <AccountGroupingInfoTitleRow>
            <span>Crowdsale referral reward</span>
          </AccountGroupingInfoTitleRow>
          <AccountSectionTable>
            <div>
              <span>ESWc acquired</span>
              <span>{crowdSaleReferralRewardAcquired}</span>
            </div>
            <div>
              <span>
                <span>Minted</span>
                <Question isSetting text="These are already minted ESW tokens that earn you profit." />
              </span>
              <span>{crowdSaleReferralRewardAlreadyMinted}</span>
            </div>
            {/* <div>
              <span>Available for minting</span>
              <span>{crowdSaleReferralRewardAvailableForMinting}</span>
            </div> */}
          </AccountSectionTable>
        </AccountSectionBodyPart>
        <AccountSectionBodyPart>
          <AccountGroupingInfoTitleRow>
            <span>Total</span>
          </AccountGroupingInfoTitleRow>
          <AccountSectionTable>
            <div>
              <span>ESWc acquired</span>
              <span>{crowdSaleAcquired + crowdSaleReferralRewardAcquired}</span>
            </div>
            <div>
              <span>
                <span>Minted</span>
                <Question isSetting text="These are already minted ESW tokens that earn you profit." />
              </span>
              <span>{crowdSaleAlreadyMinted + crowdSaleReferralRewardAlreadyMinted}</span>
            </div>
            {/* <div>
              <span>Available for minting</span>
              <span>{crowdSaleAvailableForMinting + crowdSaleReferralRewardAvailableForMinting}</span>
            </div> */}
          </AccountSectionTable>
        </AccountSectionBodyPart>
      </AccountSectionBody>
    </>
  );
}
