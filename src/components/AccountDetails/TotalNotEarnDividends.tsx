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

const AccountSectionHeader = styled(AccountGroupingRow)`
  margin-bottom: 0.5rem;
  justify-content: center;
`;

const AccountButtonSecondary = styled(ButtonSecondary)`
  width: fit-content;
  font-size: 0.825rem;
  padding: 4px 6px;
  :hover {
    cursor: pointer;
    text-decoration: none;
  }
`;

export default function TotalNotEarnDividends() {
  return (
    <>
      <AccountSectionHeader>
        <TYPE.mediumHeader>Total ESW that not earn dividends</TYPE.mediumHeader>
      </AccountSectionHeader>
      <AccountGroupingInfoRow>
        <span>ESW available for minting</span>
        <span>80</span>
        <AccountButtonSecondary>Mint</AccountButtonSecondary>
      </AccountGroupingInfoRow>
    </>
  );
}
