import React, { useMemo, useState } from 'react';
import styled from 'styled-components/macro';
import { Header, Level } from '../styleds';
import { useSelector } from 'react-redux';
import { AppState } from '../../../state';
import { convertBigDecimal, convertDate, DateFormat, shortenHash } from '../uitls';
import { ExternalLink } from '../../../theme';
import { useActiveWeb3React } from '../../../hooks';

export const TableHeader = styled(Header)<{ marginTop?: number; marginBottom?: number }>`
  margin-top: ${({ marginTop }) => (marginTop || 36) + 'px'};
  margin-bottom: ${({ marginBottom }) => (marginBottom || 12) + 'px'};

  @media screen and (max-width: 1200px) {
    margin-bottom: 0;
  }
`;

const Table = styled.div<{ amount?: number }>`
  color: ${({ theme }) => theme.grey6};
  max-height: 138px;
  align-items: center;
  overflow-y: auto;

  @media screen and (max-width: 1200px) {
    max-height: 310px;
    background: none;
    margin-top: 10px;
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
    margin-bottom: 8px;
    padding: 0 0 8px 0;
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

const LevelWrapper = styled.div<{ flex?: number }>`
  display: flex;
  justify-content: flex-start;
  flex: ${({ flex }) => flex || 1};
  width: auto;

  @media screen and (max-width: 1200px) {
    justify-content: flex-end;
  }
`;

const PoolCostWrapper = styled(LevelWrapper)<{tabActive: string}>`
  justify-content: ${({ tabActive }) =>  tabActive === '10x' ? 'center' : 'flex-start'};

  @media screen and (max-width: 1200px) {
    justify-content: flex-end;
  }
`;

const LevelWrapperLabeled = styled.div<{ flex?: number }>`
  display: flex;
  justify-content: flex-start;
  flex: ${({ flex }) => flex || 1};
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

  span {
    font-weight: 600;
    color: #000000;
  }
`;

const Wallet = styled.div`
  flex: 1;
  width: auto;
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

const Cell = styled.div<{ flex?: number }>`
  flex: ${({ flex }) => flex || 1};
  // padding-left: 1rem;

  &:last-child {
    // text-align: right;
    // padding-right: 1rem;
  }

  @media screen and (max-width: 1200px) {
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: space-between;
    height: 34px;
    padding: 0.5rem 1rem;

    &:nth-child(2n) {
      background: ${({ theme }) => theme.bg2};
    }
  }
`;

const TableTitles = styled(TableRow)`
  position: sticky;
  top: 0;
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

const Tabs = styled.div`
  display: inline-flex;
  position: absolute;
  top: -4px;
  right: 0;
  margin-left: auto;
  border-radius: 6px;
  background: #e6e7e8;

  @media screen and (max-width: 1200px) {
    position: relative;
    top: 0;
    right: initial;
    margin-top: 8px;
  }
`;

const TabItem = styled.div<{ active?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 120px;
  padding: 7px 12px;
  border-radius: 6px;
  border: 1px solid ${({ active }) => (active ? '#E8AF59' : '#E6E7E8')};
  font-size: 12px;
  font-weight: 500;
  background: ${({ active }) => (active ? '#FFD541' : '#E6E7E8')};
  color: ${({ active }) => (active ? '#24272C' : '#555959')} !important;
  box-shadow: ${({ active }) => (active ? '0px 2px 6px rgba(0, 0, 0, 0.07)' : 'none')};
  cursor: pointer;
`;

export const PurchaseHistory = () => {
  const { chainId } = useActiveWeb3React();
  const { referrals } = useSelector((state: AppState) => state.cabinets.performance);
  const { histories, details } = useSelector((state: AppState) => state.cabinets.balance);
  const { pool_block_bonuses, pool_bonuses } = useSelector(
    (state: AppState) => state.cabinets.bonusDetails,
  );

  const [liquidityTabActive, setLiquidityTabActive] = useState<string>('10x');

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

  const poolBonusDisplayData = useMemo(() => {
    if (liquidityTabActive === 'airdrops') {
      return pool_block_bonuses;
    } else {
      return pool_bonuses;
    }
  }, [liquidityTabActive, pool_block_bonuses, pool_bonuses]);

  return (
    <>
      <div style={{ position: 'relative' }}>
        <TableHeader marginBottom={24}>Your Liquidity Reward History</TableHeader>
        <Tabs>
          <TabItem
            active={liquidityTabActive === 'airdrops'}
            onClick={() => setLiquidityTabActive('airdrops')}
          >
            LP Airdrops
          </TabItem>
          <TabItem
            active={liquidityTabActive === '10x'}
            onClick={() => setLiquidityTabActive('10x')}
          >
            10X Early Bird Refund
          </TabItem>
        </Tabs>

        <Table amount={poolBonusDisplayData.length}>
          <TableTitles>
            <DateField>Date</DateField>
            {liquidityTabActive === '10x' && <LevelWrapper flex={1.5}>Swapped tokens</LevelWrapper>}
            {liquidityTabActive === '10x' ? (
              <LevelWrapper flex={2} style={{ justifyContent: 'center' }}>
                Pool
              </LevelWrapper>
            ) : (
              <LevelWrapper flex={1.5}>Pool</LevelWrapper>
            )}
            <LevelWrapper>Part in Pool</LevelWrapper>
            {liquidityTabActive === '10x' && <LevelWrapper>ESW Price</LevelWrapper>}
            <LevelWrapper>Reward, ESW</LevelWrapper>
          </TableTitles>
          {poolBonusDisplayData &&
            poolBonusDisplayData.map(
              ({ date, name, ews_reward, esw_price, pool_part, swap_turnover }, index) => (
                <TableRow key={date + name + index}>
                  <Cell>
                    <DateField>{convertDate(date, DateFormat.short_day)}</DateField>
                  </Cell>
                  {liquidityTabActive === '10x' && (
                    <Cell flex={liquidityTabActive === '10x' ? 1.5 : 1}>
                      <Label>Swapped tokens</Label>
                      <LevelWrapper>
                        <Cost>
                          <span>{convertBigDecimal(swap_turnover)}</span>&nbsp; DAI
                        </Cost>
                      </LevelWrapper>
                    </Cell>
                  )}
                  <Cell flex={liquidityTabActive === '10x' ? 2 : 1.5}>
                    <Label>Pool</Label>
                    <PoolCostWrapper tabActive={liquidityTabActive}>
                      <Cost>
                        <div style={{ maxWidth: liquidityTabActive === '10x' ? 140 : 200 }}>
                          <span>{name}</span>
                        </div>
                      </Cost>
                    </PoolCostWrapper>
                  </Cell>
                  <Cell>
                    <Label>Part in Pool</Label>
                    <LevelWrapper>
                      <Cost>
                        <span>{convertBigDecimal(pool_part)}</span>
                      </Cost>
                    </LevelWrapper>
                  </Cell>
                  {liquidityTabActive === '10x' && (
                    <Cell>
                      <Label>ESW Price</Label>
                      <LevelWrapper>
                        <Cost>
                          <span>{convertBigDecimal(esw_price)}</span>&nbsp; DAI
                        </Cost>
                      </LevelWrapper>
                    </Cell>
                  )}
                  <Cell>
                    <Label>Reward, ESW</Label>
                    <LevelWrapper>
                      <Cost>
                        <span>{convertBigDecimal(ews_reward)}</span>&nbsp; ESW
                      </Cost>
                    </LevelWrapper>
                  </Cell>
                </TableRow>
              ),
            )}
          {!poolBonusDisplayData.length && (
            <TableRow>
              <NoContent>No content</NoContent>
            </TableRow>
          )}
        </Table>
      </div>

      <TableHeader>Your Purchase History</TableHeader>

      <Table amount={deposit.length}>
        <TableTitles>
          <DateField>Timestamp</DateField>
          <LevelWrapper>Purchased tokens</LevelWrapper>
          <Wallet>Txhash</Wallet>
        </TableTitles>
        {deposit &&
          deposit.map(({ amount, token, created_at, transaction_hash }, index) => (
            <TableRow key={transaction_hash + created_at + index}>
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
                  <Wallet>{shortenHash(transaction_hash, 12)}</Wallet>
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

      <TableHeader>Referral Purchase History</TableHeader>
      <Table amount={referrals.length}>
        <TableTitles>
          <DateField>Timestamp</DateField>
          <LevelWrapperLabeled>Purchased tokens</LevelWrapperLabeled>
          <Wallet>Txhash</Wallet>
        </TableTitles>
        {referrals &&
          referrals.map(({ deposits, level }) => {
            return deposits.map(({ transaction_hash, amount, token, created_at }, index) => (
              <TableRow key={transaction_hash + created_at + index}>
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
                    <Wallet>{shortenHash(transaction_hash, 12)}</Wallet>
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

      <TableHeader>Your Fee Compensation History</TableHeader>

      <TableCompensation amount={deposit.length}>
        <TableTitles>
          <DateField>Timestamp</DateField>
          <LevelWrapper>Transaction fee</LevelWrapper>
          <LevelWrapper>Received tokens</LevelWrapper>
          <Wallet>Txhash</Wallet>
        </TableTitles>
        {compensation.map(({ amount, token, created_at, transaction_hash }, index) => (
          <TableRow key={transaction_hash + created_at + index}>
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
                <Wallet>{shortenHash(transaction_hash, 8)}</Wallet>
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

      <TableHeader>Your Swapping Reward History</TableHeader>

      <TableSwapping amount={deposit.length}>
        <TableTitles>
          <DateField>Timestamp</DateField>
          <LevelWrapper>Swapped tokens</LevelWrapper>
          <LevelWrapper>DAI Equivalent</LevelWrapper>
          <LevelWrapper>Reward</LevelWrapper>
          <LevelWrapper>Bonus Program</LevelWrapper>
          <Wallet>Txhash</Wallet>
        </TableTitles>
        {swapping &&
          swapping.map(
            ({ amount, token, created_at, transaction_hash, amount_dai, bonusName }, index) => (
              <TableRow key={transaction_hash + created_at + index}>
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
            ),
          )}
        {!swapping.length && (
          <TableRow>
            <NoContent>No content</NoContent>
          </TableRow>
        )}
      </TableSwapping>
    </>
  );
};
