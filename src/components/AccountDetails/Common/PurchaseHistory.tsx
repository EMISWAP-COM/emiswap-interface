import React from 'react';
import styled from 'styled-components/macro';
import { Header } from '../styleds';
import { useSelector } from 'react-redux';
import { AppState } from '../../../state';
import { convertBigDecimal, convertDate, DateFormat, shortenHash } from '../uitls';

const Table = styled.div<{ amount?: number }>`
  color: ${({ theme }) => theme.grey6};
  height: 120px;
  align-items: center;
  overflow-y: scroll;

  background: ${({ amount }) => {
    return amount < 4
      ? 'repeating-linear-gradient(#F7F8FA, #F7F8FA 40px, transparent 40px, transparent 80px)'
      : 'transparent';
  }};

  @media screen and (max-width: 1200px) {
    height: 210px;
    background: none;
  }

  //&::-webkit-scrollbar {
  //  display: none;
  //}
`;

const TableLong = styled(Table)`
  height: 200px;
`;

const TableRow = styled.div`
  height: 40px;
  display: flex;
  border-radius: 3px;
  align-items: center;
  font-size: 0.8rem;
  padding: 0 1rem;

  &:nth-child(2n - 1) {
    background: ${({ theme }) => theme.bg2};
  }

  @media screen and (max-width: 1200px) {
    height: 70px;
    flex-wrap: wrap;
    justify-content: space-between;
  }
`;

const Date = styled.div`
  min-width: 8.5rem;
`;

const LevelWrapper = styled.div`
  display: flex;
  align-items: center;
  min-width: 1.5rem;
  align-self: center;

  @media screen and (max-width: 1200px) {
    min-width: 190px;
    justify-content: flex-end;
  }
`;

const Cost = styled.div`
  min-width: 8rem;
  text-align: right;
  margin-right: 1rem;

  @media screen and (max-width: 1200px) {
    margin-right: 0;
    min-width: auto;
    margin-left: 5px;
  }

  > span {
    font-weight: 600;
    color: #000000;
  }
`;

const Wallet = styled.div`
  color: ${({ theme }) => theme.text1};
  margin-left: auto;

  @media screen and (max-width: 1200px) {
    font-weight: 500;
    font-size: 0.75rem;
    margin-left: 0;
  }
`;

const NoContent = styled.div`
  width: 100%;
  text-align: center;
  @media screen and (max-width: 1200px) {
    font-weight: 500;
    font-size: 0.75rem;
  }
`;

export const PurchaseHistory = () => {
  // const purchases = useSelector((state: AppState) => state.cabinets.purchaseHistory);
  // const { referrals } = useSelector((state: AppState) => state.cabinets.performance);
  const { histories } = useSelector((state: AppState) => state.cabinets.balance);
  // console.log('total');
  const deposit = histories?.deposits;
  const referrals = [
    {
      deposits: histories?.referral_bonus || [],
    },
  ];

  console.log(useSelector((state: AppState) => state.cabinets.performance));
  return (
    <>
      <Header>Your Purchase History</Header>
      <Table amount={deposit.length}>
        {deposit &&
          deposit.map(({ amount, token, created_at, transaction_hash }) => (
            <TableRow key={transaction_hash}>
              <Date>{convertDate(created_at, DateFormat.full)}</Date>
              <LevelWrapper>
                <Cost>
                  <span>{convertBigDecimal(amount)}</span>&nbsp; {token}
                </Cost>
              </LevelWrapper>
              <Wallet>{shortenHash(transaction_hash, 7)}</Wallet>
            </TableRow>
          ))}
        {!deposit.length && (
          <TableRow>
            <NoContent>No content</NoContent>
          </TableRow>
        )}
      </Table>

      <Header>Referral Purchase History</Header>
      <TableLong amount={referrals.length}>
        {referrals &&
          referrals.map(({ deposits }) => {
            return deposits.map(({ transaction_hash, amount, token, created_at }) => (
              <TableRow key={transaction_hash}>
                <Date>{convertDate(created_at, DateFormat.full)}</Date>
                <LevelWrapper>
                  {/*<Level>{level}lvl</Level>*/}
                  <Cost>
                    <span>{convertBigDecimal(amount)}</span>&nbsp; {token}
                  </Cost>
                </LevelWrapper>

                <Wallet>{shortenHash(transaction_hash, 7)}</Wallet>
              </TableRow>
            ));
          })}
        {!referrals[0].deposits.length && (
          <TableRow>
            <NoContent>No content</NoContent>
          </TableRow>
        )}
      </TableLong>
    </>
  );
};
