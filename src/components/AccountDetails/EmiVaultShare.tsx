import React, { useState } from 'react';
import styled from 'styled-components';
import { TYPE } from '../../theme';
import { ButtonSecondary } from '../Button';

const AccountSectionHeader = styled.div`
  ${({ theme }) => theme.flexRowNoWrap};
  margin-bottom: 0.5rem;
  justify-content: center;
  font-weight: 400;
  color: ${({ theme }) => theme.text1};
  div {
    ${({ theme }) => theme.flexRowNoWrap}
    align-items: center;
  }
`;

const AccountSectionBody = styled.div`
  display: grid;
  margin-bottom: 1.5rem;
  border: 1px solid ${({ theme }) => theme.bg3};
  border-radius: 20px;
  font-size: 0.825rem;
  overflow: hidden;
  color: ${({ theme }) => theme.text3};
  > div:first-of-type {
    display: flex;
    > div > div > span:first-of-type {
      display: inline;
    }
  }
  ${({ theme }) => theme.mediaWidth.upToMedium`
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
  flex-direction: wrap;
  overflow: hidden;
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

const AccountGroupingInfoTitleRow = styled.div`
  flex: 1;
  justify-content: center;
  font-weight: 600;
  border-right: 1px solid #edeef2;
  padding: 0.5rem 0.5rem 0.5rem 1rem;
`;

const AccountSectionFooter = styled.div`
  display: flex;
  flex: 5;
  flex-wrap: wrap;
  position: relative;
  flex-direction: row;
  }
`;

export const EmiVaultShare = ({ tokenList }) => {
  const [selectedTokenList, setSelectedTokenList] = useState([]);

  const getTotalSum = (data, key) => {
    return Object.values(data).reduce((sum, token) => (sum += token[key]), 0);
  };

  const handleSelectedEmiToken = e => {
    let selectedList = [...selectedTokenList, e.target.id];
    if (selectedTokenList.includes(e.target.id)) {
      selectedList = selectedList.filter(key => key !== e.target.id);
    }
    setSelectedTokenList(selectedList);
  };

  return (
    <>
      <AccountSectionHeader>
        <TYPE.mediumHeader>EmiVaultShare</TYPE.mediumHeader>
      </AccountSectionHeader>
      <AccountSectionBody>
        <AccountSectionBodyPart>
          <AccountGroupingInfoTitleRow>
            <span></span>
          </AccountGroupingInfoTitleRow>
          <AccountSectionTable>
            <div>
              <span>Collected</span>
            </div>
            <div>
              <span>Available to collect in tokens</span>
            </div>
            <div>
              <span>Available to collect in DAI</span>
            </div>
            <div>
              <span>Slected</span>
            </div>
          </AccountSectionTable>
        </AccountSectionBodyPart>
        {Object.keys(tokenList).map((token, index) => (
          <AccountSectionBodyPart key={token}>
            <AccountGroupingInfoTitleRow>
              <span></span>
              <span>{tokenList[token].symbol}</span>
            </AccountGroupingInfoTitleRow>
            <AccountSectionTable>
              <div>
                <span>Collected</span>
                <span>{(index += 1)}</span>
              </div>
              <div>
                <span>Available to collect in tokens</span>
                <span>{tokenList[token].decimals}</span>
              </div>
              <div>
                <span>Available to collect in DAI</span>
                <span>{tokenList[token].decimals}</span>
              </div>
              <div>
                <span>Slected</span>
                <span>
                  <input
                    type={'checkbox'}
                    id={tokenList[token].address}
                    onChange={handleSelectedEmiToken}
                  />
                </span>
              </div>
            </AccountSectionTable>
          </AccountSectionBodyPart>
        ))}
        <AccountSectionBodyPart>
          <AccountGroupingInfoTitleRow>Total amount</AccountGroupingInfoTitleRow>
          <AccountSectionTable>
            <div>
              <span>Collected</span>
              <span>-</span>
            </div>
            <div>
              <span>Available to collect in tokens</span>
              <span>-</span>
            </div>
            <div>
              <span>Available to collect in DAI</span>
              <span>{getTotalSum(tokenList, 'decimals')}</span>
            </div>
            <div></div>
          </AccountSectionTable>
        </AccountSectionBodyPart>
      </AccountSectionBody>
      <AccountSectionFooter>
        <ButtonSecondary padding="4px" width="auto" margin="0px 10px 10px 0px">
          Collect Profit in Tokens
        </ButtonSecondary>
        <ButtonSecondary padding="4px" width="auto" margin="0px 10px 10px 0px">
          Collect Profit in DAI
        </ButtonSecondary>
      </AccountSectionFooter>
    </>
  );
};
