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
    max-height: 310px;
    background: none;
    margin-top: 20px;
  }

  //&::-webkit-scrollbar {
  //  display: none;
  //}
`;

const TableLong = styled(Table)`
  max-height: 200px;
`;

const TableFeeCompensation = styled(Table)`
  @media screen and (max-width: 1200px) {
    max-height: 414px;
  }
`;

const TableRow = styled.div`
  height: 46px;
  display: flex;
  border-radius: 3px;
  font-size: 0.8rem;
  align-items: center;
  padding: 0 1rem;
  border-bottom: ${({ theme }) => `1px solid ${theme.grey1}`};

  @media screen and (max-width: 1200px) {
    flex-direction: column;
    height: auto;
    padding: 0;
  }
`;

const DateField = styled.div`
  min-width: 11rem;
  @media screen and (max-width: 1200px) {
    position: relative;
    left: -1rem;
    font-weight: 600;
    color: ${({ theme }) => theme.text1};
  }
`;

const LevelWrapper = styled.div`
  display: flex;
  min-width: 8rem;

  @media screen and (max-width: 1200px) {
    justify-content: flex-end;
  }
`;

const Cost = styled.div`
  min-width: 8rem;

  @media screen and (max-width: 1200px) {
    min-width: auto;
  }

  > span {
    font-weight: 600;
    color: #000000;
  }
`;

const Wallet = styled.div`
  color: ${({ theme }) => theme.text1};

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

const Cell = styled.div`
  @media screen and (max-width: 1200px) {
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: space-between;
    height: 34px;
    padding: 0 1rem;

    &:nth-child(2n) {
      background: ${({ theme }) => theme.bg2};
    }
  }
`;

const TableTitles = styled(TableRow)`
  background: ${({ theme }) => theme.bg2};
  height: 30px;
  border-bottom: none;

  @media screen and (max-width: 1200px) {
    display: none;
  }
`;

const Label = styled.span`
  display: none;

  @media screen and (max-width: 1200px) {
    display: flex;
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
      {/*<Header>Your Purchase History</Header>*/}
      {/*<TableTitles>*/}
      {/*    <DateField>Timestamp</DateField>*/}
      {/*    <Cost>Purchased tokens</Cost>*/}
      {/*    <Wallet>Txhash</Wallet>*/}
      {/*</TableTitles>*/}
      {/*<Table amount={deposit.length}>*/}
      {/*  {deposit &&*/}
      {/*    deposit.map(({ amount, token, created_at, transaction_hash }, index) => (*/}
      {/*      <TableRow key={transaction_hash + created_at}>*/}
      {/*        <Cell>*/}
      {/*          <DateField>{convertDate(created_at, DateFormat.full)}</DateField>*/}
      {/*        </Cell>*/}
      {/*        <Cell>*/}
      {/*          <Label>Purchased tokens</Label>*/}
      {/*          <LevelWrapper>*/}
      {/*            <Cost>*/}
      {/*              <span>{convertBigDecimal(amount)}</span>&nbsp; {token}*/}
      {/*            </Cost>*/}
      {/*          </LevelWrapper>*/}
      {/*        </Cell>*/}
      {/*        <Cell>*/}
      {/*          <Label>Txhash</Label>*/}
      {/*          <Wallet>{shortenHash(transaction_hash, 7)}</Wallet>*/}
      {/*        </Cell>*/}
      {/*      </TableRow>*/}
      {/*    ))}*/}
      {/*  {!deposit.length && (*/}
      {/*    <TableRow>*/}
      {/*      <NoContent>No content</NoContent>*/}
      {/*    </TableRow>*/}
      {/*  )}*/}
      {/*</Table>*/}

      {/*<Header>Referral Purchase History</Header>*/}
      {/*<TableTitles>*/}
      {/*  <DateField>Timestamp</DateField>*/}
      {/*  <Cost>Purchased tokens</Cost>*/}
      {/*  <Wallet>Txhash</Wallet>*/}
      {/*</TableTitles>*/}
      {/*<TableLong amount={referrals.length}>*/}
      {/*  {referrals &&*/}
      {/*    referrals.map(({ deposits, level }) => {*/}
      {/*      return deposits.map(({ transaction_hash, amount, token, created_at }) => (*/}
      {/*        <TableRow key={transaction_hash + created_at}>*/}
      {/*          <Cell>*/}
      {/*            <DateField>{convertDate(created_at, DateFormat.full)}</DateField>*/}
      {/*          </Cell>*/}
      {/*          <Cell>*/}
      {/*            <Label>Purchased tokens</Label>*/}
      {/*            <LevelWrapper>*/}
      {/*              <Level>{level}lvl</Level>*/}
      {/*              <Cost>*/}
      {/*                <span>{convertBigDecimal(amount)}</span>&nbsp; {token}*/}
      {/*              </Cost>*/}
      {/*            </LevelWrapper>*/}
      {/*          </Cell>*/}
      {/*          <Cell>*/}
      {/*            <Label>Txhash</Label>*/}
      {/*            <Wallet>{shortenHash(transaction_hash, 7)}</Wallet>*/}
      {/*          </Cell>*/}
      {/*        </TableRow>*/}
      {/*      ));*/}
      {/*    })}*/}
      {/*  {!referrals.length && (*/}
      {/*    <TableRow>*/}
      {/*      <NoContent>No content</NoContent>*/}
      {/*    </TableRow>*/}
      {/*  )}*/}
      {/*</TableLong>*/}

      <Header>Your Fee Compensation History</Header>
      <TableTitles>
        <DateField>Timestamp</DateField>
        <Cost>Transaction fee</Cost>
        <Cost>Received tokens</Cost>
        <Wallet>Txhash</Wallet>
      </TableTitles>
      <TableFeeCompensation amount={deposit.length}>
        {compensation.map(({ amount, token, created_at, transaction_hash }) => (
          <TableRow key={transaction_hash + created_at}>
            <Cell>
              <DateField>{convertDate(created_at, DateFormat.full)}</DateField>
            </Cell>
            <Cell>
              <Label>Transaction fee</Label>

              <LevelWrapper>
                <Cost>
                  <span>-</span>&nbsp; USD
                </Cost>
              </LevelWrapper>
            </Cell>
            <Cell>
              <Label>Received tokens</Label>

              <LevelWrapper>
                <Cost>
                  <span>{convertBigDecimal(amount)}</span>&nbsp; {token}
                </Cost>
              </LevelWrapper>
            </Cell>
            <Cell>
              <Label>Txhash</Label>
              <Wallet>{shortenHash(transaction_hash, 7)}</Wallet>
            </Cell>
          </TableRow>
        ))}
        {!deposit.length && (
          <TableRow>
            <NoContent>No content</NoContent>
          </TableRow>
        )}
      </TableFeeCompensation>

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
