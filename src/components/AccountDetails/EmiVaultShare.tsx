import React from 'react';
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

const TABLE_DATA = [
  {
    id: 1,
    name: 'Token A',
    cellected: true,
    collect_token: 10,
    collect_dai: 100,
    slected: true,
  },
  {
    id: 2,
    name: 'Token B',
    cellected: true,
    collect_token: 5,
    collect_dai: 0.5,
    slected: true,
  },
  {
    id: 3,
    name: 'Token C',
    cellected: true,
    collect_token: 12.567,
    collect_dai: 33.45,
    slected: true,
  },
  {
    id: 4,
    name: 'Token D',
    cellected: true,
    collect_token: 0.133,
    collect_dai: 0.2666,
    slected: true,
  },
  {
    id: 5,
    name: 'Token E',
    cellected: true,
    collect_token: 120,
    collect_dai: 0.000001,
    slected: true,
  },
];

export const EmiVaultShare = () => {
  const getTotalSum = (data, key) => data.reduce((sum, elem) => sum + elem[key], 0);
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
        {TABLE_DATA.map((token, index) => (
          <AccountSectionBodyPart key={token.name + index}>
            <AccountGroupingInfoTitleRow>
              <span></span>
              <span>{token.name}</span>
            </AccountGroupingInfoTitleRow>
            <AccountSectionTable>
              <div>
                <span>Collected</span>
                <span>{token.cellected}</span>
              </div>
              <div>
                <span>Available to collect in tokens</span>
                <span>{token.collect_token}</span>
              </div>
              <div>
                <span>Available to collect in DAI</span>
                <span>{token.collect_dai}</span>
              </div>
              <div>
                <span>Slected</span>
                <span>
                  <input type={'checkbox'} />
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
              <span></span>
            </div>
            <div>
              <span>Available to collect in tokens</span>
              <span></span>
            </div>
            <div>
              <span>Available to collect in DAI</span>
              <span>{getTotalSum(TABLE_DATA, 'collect_dai')}</span>
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
}
