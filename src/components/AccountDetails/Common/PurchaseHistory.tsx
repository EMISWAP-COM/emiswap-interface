import React, { useMemo } from 'react';
import styled from 'styled-components/macro';
import { Header } from '../styleds';
import { useSelector } from 'react-redux';
import { AppState } from '../../../state';
import { convertBigDecimal, convertDate, DateFormat, shortenHash } from '../uitls';
import { Level } from '../styleds';
import { ExternalLink } from '../../../theme';
import { useActiveWeb3React } from '../../../hooks';

const Table = styled.div<{ amount?: number }>`
  color: ${({ theme }) => theme.grey6};
  max-height: 138px;
  align-items: center;
  overflow-y: auto;

  @media screen and (max-width: 1200px) {
    max-height: 310px;
    background: none;
    margin-top: 20px;
  }
  //
  //&::-webkit-scrollbar {
  //  background: transparent;
  //  width: 10px;
  //}
`;

const TableCompensation = styled(Table)`
  @media screen and (max-width: 1200px) {
    max-height: 414px;
  }
`;

const TableSwapping = styled(Table)`
  @media screen and (max-width: 1200px) {
    max-height: 474px;
  }
`;

const TableRow = styled.div`
  height: 46px;
  display: flex;
  border-radius: 3px;
  font-size: 12px;
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
  flex: 1;
  width: auto;

  @media screen and (max-width: 1200px) {
    position: relative;
    left: -1rem;
    font-weight: 600;
    color: ${({ theme }) => theme.text1};
  }
`;

const LevelWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  flex: 1;
  width: auto;

  @media screen and (max-width: 1200px) {
    justify-content: flex-end;
  }
`;

const LevelWrapperLabeled = styled.div`
  display: flex;
  justify-content: flex-start;
  flex: 1;
  width: auto;

  @media screen and (max-width: 1200px) {
    justify-content: flex-end;
  }
`;

const Cost = styled.div`
  font-size: 0.8rem;

  @media screen and (max-width: 1200px) {
    min-width: auto;
  }

  > span {
    font-weight: 600;
    color: #000000;
  }
`;

const Wallet = styled.div<{ marginLeft?: number }>`
  flex: 1;
  width: auto;
  text-align: left;
  color: ${({ theme }) => theme.text1};
  // margin-left: ${({ marginLeft }) => marginLeft + 'px'};
  // background: pink;

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
  flex: 1;
  // padding-left: 1rem;
  
  &:last-child {
    // padding-right: 1rem;
  }
  
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
  padding: 0 1rem;
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
const BonusName = styled.span`
  // width: 7rem;
  text-overflow: ellipsis;
`;

export const PurchaseHistory = () => {
  const { chainId } = useActiveWeb3React();
  const { referrals } = useSelector((state: AppState) => state.cabinets.performance);
  const { histories, details } = useSelector((state: AppState) => state.cabinets.balance);
  const deposit = histories?.deposits;
  const { compensation = [], swap_bonus_10x = [], swap_bonus = [] } = details;

  const ETHERSCAN_BASE_URL =
    chainId === 42 ? 'https://kovan.etherscan.io/' : 'https://etherscan.io/';

  const swapping = useMemo(() => {
    const bonuses = { swap_bonus_10x, swap_bonus };
    return Object.entries(bonuses)
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
      });
  }, [swap_bonus_10x, swap_bonus]);

  return (
    <>
      <Header>Your Purchase History</Header>
      <TableTitles>
        <DateField>Timestamp</DateField>
        <LevelWrapper>Purchased tokens</LevelWrapper>
        <Wallet marginLeft={312}>Txhash</Wallet>
      </TableTitles>
      <Table amount={deposit.length}>
        {deposit &&
          deposit.map(({ amount, token, created_at, transaction_hash }, index) => (
            <TableRow key={transaction_hash + created_at}>
              <Cell>
                <DateField>{convertDate(created_at, DateFormat.full)}</DateField>
              </Cell>
              <Cell>
                <Label>Purchased tokens</Label>
                <LevelWrapper>
                  <Cost>
                    <span>{convertBigDecimal(amount)}</span>&nbsp; {token}
                  </Cost>
                </LevelWrapper>
              </Cell>
              <Cell>
                <Label>Txhash</Label>
                <ExternalLink href={`${ETHERSCAN_BASE_URL}/tx/${transaction_hash}`}>
                  <Wallet marginLeft={312}>{shortenHash(transaction_hash)}</Wallet>
                </ExternalLink>
              </Cell>
            </TableRow>
          ))}
        {!deposit.length && (
          <TableRow>
            <NoContent>No content</NoContent>
          </TableRow>
        )}
      </Table>

      <Header>Referral Purchase History</Header>
      <TableTitles>
        <DateField>Timestamp</DateField>
        <LevelWrapperLabeled>Purchased tokens</LevelWrapperLabeled>
        <Wallet marginLeft={288}>Txhash</Wallet>
      </TableTitles>
      <Table amount={referrals.length}>
        {referrals &&
          referrals.map(({ deposits, level }) => {
            return deposits.map(({ transaction_hash, amount, token, created_at }) => (
              <TableRow key={transaction_hash + created_at}>
                <Cell>
                  <DateField>{convertDate(created_at, DateFormat.full)}</DateField>
                </Cell>
                <Cell>
                  <Label>Purchased tokens</Label>
                  <LevelWrapperLabeled>
                    <Level>{level}lvl</Level>
                    <Cost>
                      <span>{convertBigDecimal(amount)}</span>&nbsp; {token}
                    </Cost>
                  </LevelWrapperLabeled>
                </Cell>
                <Cell>
                  <Label>Txhash</Label>
                  <ExternalLink href={`${ETHERSCAN_BASE_URL}/tx/${transaction_hash}`}>
                    <Wallet marginLeft={288}>{shortenHash(transaction_hash)}</Wallet>
                  </ExternalLink>
                </Cell>
              </TableRow>
            ));
          })}
        {!referrals.length && (
          <TableRow>
            <NoContent>No content</NoContent>
          </TableRow>
        )}
      </Table>

      <Header>Your Fee Compensation History</Header>
      <TableTitles>
        <DateField>Timestamp</DateField>
        <LevelWrapper>Transaction fee</LevelWrapper>
        <LevelWrapper>Received tokens</LevelWrapper>
        <Wallet marginLeft={208}>Txhash</Wallet>
      </TableTitles>
      <TableCompensation amount={deposit.length}>
        {compensation.map(({ amount, token, created_at, transaction_hash }) => (
          <TableRow key={transaction_hash + created_at}>
            <Cell>
              <DateField>{convertDate(created_at, DateFormat.full)}</DateField>
            </Cell>
            <Cell>
              <Label>Transaction fee</Label>

              <LevelWrapper>
                <Cost>
                  <span>-</span>&nbsp; DAI
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
              <ExternalLink href={`${ETHERSCAN_BASE_URL}/tx/${transaction_hash}`}>
                <Wallet marginLeft={208}>{shortenHash(transaction_hash)}</Wallet>
              </ExternalLink>
            </Cell>
          </TableRow>
        ))}
        {!compensation.length && (
          <TableRow>
            <NoContent>No content</NoContent>
          </TableRow>
        )}
      </TableCompensation>

      <Header>Your Swapping Reward History</Header>
      <TableTitles>
        <DateField>Timestamp</DateField>
        <LevelWrapper>Swapped tokens</LevelWrapper>
        <LevelWrapper>DAI Equivalent</LevelWrapper>
        <LevelWrapper>Reward</LevelWrapper>
        <LevelWrapper>Bonus Program</LevelWrapper>
        <Wallet>Txhash</Wallet>
      </TableTitles>
      <TableSwapping amount={deposit.length}>
        {swapping &&
          swapping.map(({ amount, token, created_at, transaction_hash, amount_dai, bonusName }) => (
            <TableRow key={transaction_hash + created_at}>
              <Cell>
                <DateField>{convertDate(created_at, DateFormat.full)}</DateField>
              </Cell>
              <Cell>
                <Label>Swapped tokens</Label>
                <LevelWrapper>
                  <Cost>
                    <span>-</span>&nbsp;
                  </Cost>
                </LevelWrapper>
              </Cell>
              <Cell>
                <Label>DAI Equivalent</Label>
                <LevelWrapper>
                  <Cost>
                    <span>{convertBigDecimal(amount_dai)}</span>&nbsp; DAI
                  </Cost>
                </LevelWrapper>
              </Cell>
              <Cell>
                <Label>Reward</Label>
                <LevelWrapper>
                  <Cost>
                    <span>{convertBigDecimal(amount)}</span>&nbsp; {token}
                  </Cost>
                </LevelWrapper>
              </Cell>
              <Cell>
                <Label>Bonus program</Label>
                <LevelWrapper>
                  <BonusName>{bonusName}</BonusName>&nbsp;
                </LevelWrapper>
              </Cell>
              <Cell>
                <Label>Txhash</Label>
                <ExternalLink href={`${ETHERSCAN_BASE_URL}/tx/${transaction_hash}`}>
                  <Wallet>{shortenHash(transaction_hash)}</Wallet>
                </ExternalLink>
              </Cell>
            </TableRow>
          ))}
        {!swapping.length && (
          <TableRow>
            <NoContent>No content</NoContent>
          </TableRow>
        )}
      </TableSwapping>
    </>
  );
};
