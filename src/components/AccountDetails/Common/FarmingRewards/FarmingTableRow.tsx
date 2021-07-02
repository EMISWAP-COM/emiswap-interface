import React from 'react';
import styled from 'styled-components/macro';
import { Contract } from '@ethersproject/contracts';
import CurrencyFormat from 'react-currency-format';
import useFarming from '../../../../hooks/useFarming';
import { LevelWrapper, TableRow } from './FarmingRewards';

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
};

const FarmingTableRow: React.FC<FarmingTableRowProps> = (
  {
    contract,
  }
) => {
  const farming = useFarming(contract);

  return (
    <TableRow>
      <Cell>
        <Label>Farm</Label>
        <LevelWrapper>{farming.stakeToken?.symbol}</LevelWrapper>
      </Cell>
      <Cell flex={2}>
        <Label>Reward in ESW</Label>
        <LevelWrapper>
          <StyledTruncatedText>{farming.reward}</StyledTruncatedText>
        </LevelWrapper>
      </Cell>
      <Cell flex={2}>
        <Label>Block reward in ESW</Label>
        <LevelWrapper>
          <StyledTruncatedText>{farming.blockReward}</StyledTruncatedText>
        </LevelWrapper>
      </Cell>
      <Cell flex={2}>
        <Label>Farm TVL in DAI</Label>
        <LevelWrapper>
          <CurrencyFormat value={farming.liquidity} displayType={'text'} thousandSeparator={' '} />
        </LevelWrapper>
      </Cell>
      <Cell>
        <Label>Your share</Label>
        <LevelWrapper>{Math.floor(((Number(farming.balance) / Number(farming.totalSupply)) * 100) * 100) / 100}%</LevelWrapper>
      </Cell>
    </TableRow>
  );
}

export default FarmingTableRow;