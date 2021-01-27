import React from 'react';
import styled from 'styled-components';
import { TYPE } from '../../../theme';
import { Level } from '../styleds';
import './styles.css';
import { useSelector } from 'react-redux'
import { AppState } from '../../../state'
import { convertBigDecimal, shortenHash } from '../uitls'

const TableWrapper = styled.div`
  border: 1px solid #707070;
  border-radius: 20px;
  overflow-y: hidden;
  margin-bottom: 20px;
  
  width: 100%;
  
  @media screen and (max-width: 1200px) {
    border: none;
      border-radius: 5px;
        background: #F7F8FA;

  }
`;

const Table = styled.div`
  height: 105px;

  overflow-y: scroll;
  align-items: center;
  
    @media screen and (max-width: 1200px) {
    height: 210px;
}

  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
    background: none;
  }

  &::-webkit-scrollbar-track {
    width: 2px;
    background: #707070;
    border: 2px solid white;
  }
  &::-webkit-scrollbar-thumb {
    width: 3px;
    max-height: 5px;
    background: #707070;
    border-radius: 20px;
  }

`;

const TableRow = styled.div`
  height: 35px;
  display: flex;
  align-items: center;
  font-size: 0.8rem;
  padding: 0 1rem;

  &:nth-child(2n - 1) {
    background: #E4E5E7;
  }
  
  @media screen and (max-width: 1200px) {
    height: 70px;
    flex-wrap: wrap;
    justify-content: space-between;
  }
  
`

const Date = styled.div`
    min-width: 8.5rem;
`

const LevelWrapper = styled.div`
  min-width: 1.5rem;
  align-self: center;
`

const Cost = styled.div`
  min-width: 8rem;
  text-align: right;
  margin-right: 1rem;
  
  @media screen and (max-width: 1200px) {
    margin-right: 0;

  }

  > span {
    font-weight: 600;
    color: #000000;
  }
`;

const Wallet = styled.div`
  font-weight: 600;
  color: #000000;
  @media screen and (max-width: 1200px) {
    font-weight: 500;
    font-size: .75rem;
  }

`;

export const PurchaseHistory = () => {
  const purchases = useSelector((state: AppState) => state.cabinets.purchaseHistory)
  const referralPurchases = useSelector((state: AppState) => state.cabinets.referralHistory)

  return (
    <>
      <TYPE.mediumHeader>Your Purchase History</TYPE.mediumHeader>
      <TableWrapper>
        <Table id={'test'} className="mostly-customized-scrollbar">
          {purchases.map(({ amount, date, transaction_hash }) => (
            <TableRow key={transaction_hash}>
              <Date>{date.slice(0, 19)}</Date>
              <LevelWrapper />
              <Cost>
                <span>{convertBigDecimal(amount)}</span>&nbsp; ESW
              </Cost>
              <Wallet>{shortenHash(transaction_hash, 10)}</Wallet>
            </TableRow>
          ))}
        </Table>
      </TableWrapper>

      <TYPE.mediumHeader>Referal Purchase History</TYPE.mediumHeader>
      <TableWrapper>
        <Table>
          {referralPurchases.map(({ amount, date, transaction_hash }) => (
            <TableRow key={transaction_hash}>
              <Date>{date.slice(0, 19)}</Date>
              <LevelWrapper>
                <Level>1lvl</Level>
              </LevelWrapper>
              <Cost>
                <span>{convertBigDecimal(amount)}</span>&nbsp; ESW
              </Cost>
              <Wallet>{shortenHash(transaction_hash, 10)}</Wallet>
            </TableRow>
          ))}
        </Table>
      </TableWrapper>
    </>
  );
};
