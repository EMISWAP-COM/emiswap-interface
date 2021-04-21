import React, { useMemo } from 'react';
import styled from 'styled-components/macro';
import { Header } from '../styleds';
import { useSelector } from 'react-redux';
import { AppState } from '../../../state';
import { convertBigDecimal, convertDate, DateFormat, shortenHash } from '../uitls';
import { Level } from '../styleds';

const Table = styled.div<{ amount?: number }>`
  color: ${({ theme }) => theme.grey6};
  max-height: 120px;
  align-items: center;
  overflow-y: auto;

  @media screen and (max-width: 1200px) {
    max-height: 210px;
    background: none;
  }

  //&::-webkit-scrollbar {
  //  display: none;
  //}
`;

const TableLong = styled(Table)`
  max-height: 200px;
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

const DateField = styled.div`
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
  const { referrals } = useSelector((state: AppState) => state.cabinets.performance);
  const { histories, details } = useSelector((state: AppState) => state.cabinets.balance);
  const deposit = histories?.deposits;
  const {
    compensation = [],
    pool_bonus = [],
    pool_bonus_10x = [],
    pool_swap_bonus = [],
    pool_referral_bonus = [],
  } = details;

  const bonuses = { pool_bonus, pool_bonus_10x, pool_swap_bonus, pool_referral_bonus };

  const swapping = useMemo(
    () =>
      Object.entries(bonuses)
        .flatMap(([bonusName, bonuses]) => {
          return bonuses.map(bonus => ({ ...bonus, bonusName }));
        })
        .sort((transactionA, transactionB) => {
          const dateA = new Date(transactionA.created_at).getTime();
          const dateB = new Date(transactionB.created_at).getTime();

          if (dateA && dateB) {
            return dateA - dateB;
          }

          return 0;
        }),
    [pool_bonus, pool_bonus_10x, pool_swap_bonus, pool_referral_bonus],
  );

  console.log('------', swapping);

  return (
    <>
      <Header>Your Purchase History</Header>
      <Table amount={deposit.length}>
        {deposit &&
          deposit.map(({ amount, token, created_at, transaction_hash }) => (
            <TableRow key={transaction_hash + created_at}>
              <DateField>{convertDate(created_at, DateFormat.full)}</DateField>
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
          referrals.map(({ deposits, level }) => {
            return deposits.map(({ transaction_hash, amount, token, created_at }) => (
              <TableRow key={transaction_hash + created_at}>
                <DateField>{convertDate(created_at, DateFormat.full)}</DateField>
                <LevelWrapper>
                  <Level>{level}lvl</Level>
                  <Cost>
                    <span>{convertBigDecimal(amount)}</span>&nbsp; {token}
                  </Cost>
                </LevelWrapper>

                <Wallet>{shortenHash(transaction_hash, 7)}</Wallet>
              </TableRow>
            ));
          })}
        {!referrals.length && (
          <TableRow>
            <NoContent>No content</NoContent>
          </TableRow>
        )}
      </TableLong>

      <Header>Your Fee Compensation History</Header>
      <Table amount={deposit.length}>
        {compensation.map(({ amount, token, created_at, transaction_hash }) => (
          <TableRow key={transaction_hash + created_at}>
            <DateField>{convertDate(created_at, DateFormat.full)}</DateField>
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

      <Header>Your Swapping History</Header>
      <Table amount={deposit.length}>
        {swapping &&
          swapping.map(({ amount, token, created_at, transaction_hash }) => (
            <TableRow key={transaction_hash + created_at}>
              <DateField>{convertDate(created_at, DateFormat.full)}</DateField>
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
    </>
  );
};
