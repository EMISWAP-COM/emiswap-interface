import React from 'react';
import styled from 'styled-components/macro';
import { Contract } from '@ethersproject/contracts';
import { LevelWrapper, TableRow } from './FarmingRewards';
import useFarming2 from '../../../../hooks/useFarming2';
import dayjs from 'dayjs';

const Cell = styled.div<{ flex?: number }>`
  flex: ${({ flex }) => flex || 1};

  @media screen and (max-width: 1200px) {
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: space-between;
    height: 34px;
    padding: 0.5rem 1rem;

    &:nth-child(2n) {
      background: ${({ theme }) => theme.darkGrey};
    }
  }
`;

const Label = styled.span`
  display: none;

  @media screen and (max-width: 1200px) {
    display: flex;
  }
`;

const StyledTruncatedText = styled.span`
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

type FarmingTableRowProps = {
  contract: Contract
  stakeData: {
    id: string,
    stakedAmount: string,
    contractAddress: string,
    percentageRate: number,
    reward: string,
    endDate: string,
  }
};

const FarmingTableRow: React.FC<FarmingTableRowProps> = (
  {
    contract,
    stakeData,
  }
) => {
  const farming2 = useFarming2(contract);
  const dateNow = dayjs();
  const endDate = dayjs(stakeData.endDate);

  return (
    <TableRow>
      <Cell>
        <Label>Farm</Label>
        <LevelWrapper>{farming2.stakeToken?.symbol}</LevelWrapper>
      </Cell>
      <Cell>
        <Label>Lock period</Label>
        <LevelWrapper>
          <StyledTruncatedText>{farming2.lockPeriod}</StyledTruncatedText>
        </LevelWrapper>
      </Cell>
      <Cell flex={2}>
        <Label>Staked amount</Label>
        <LevelWrapper>
          <StyledTruncatedText>{stakeData.stakedAmount}</StyledTruncatedText>
        </LevelWrapper>
      </Cell>
      <Cell>
        <Label>Fixed APR</Label>
        <LevelWrapper>
          <StyledTruncatedText>{stakeData.percentageRate}%</StyledTruncatedText>
        </LevelWrapper>
      </Cell>
      <Cell flex={2}>
        <Label>Reward in ESW</Label>
        <LevelWrapper>
          <StyledTruncatedText>{stakeData.reward}</StyledTruncatedText>
        </LevelWrapper>
      </Cell>
      <Cell>
        <Label>Days until reward</Label>
        <LevelWrapper>
          <StyledTruncatedText>{endDate.diff(dateNow, 'day')}</StyledTruncatedText>
        </LevelWrapper>
      </Cell>
    </TableRow>
  );
}

export default FarmingTableRow;
