import React, { useCallback, useState } from 'react';
import { FarmingTimeType } from '../types';
import styled from 'styled-components/macro';
import { ChevronDown, ChevronUp } from 'react-feather';

type ExtendableRowProps = {
  coinName: string;
  projectedReward: number;
  apr: number;
  lockPeriodDays: number;
  blockReward: number;
  liquidity: number;
  type: FarmingTimeType;
}

const StyledRow = styled.div`
  background-color: ${({theme}) => theme.border1Transparency};
  border-radius: 8px;
  margin-bottom: 8px;
`;

const StyledHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 16px 26px;
`;

const StyledTable = styled.table`
  color: ${({theme}) => theme.white};
  font-weight: 600;
  font-size: 16px;
  text-align: left;
  flex-grow: 1;
`;

const StyledTh = styled.th`
  color: ${({theme}) => theme.darkWhite};
  font-weight: 400;
`;

const StyledExtendButton = styled.div<{ isRowExtended: boolean }>`
  color: ${({theme}) => theme.darkWhite};
  font-weight: 400;
  border-radius: 100%;
  background-color: ${({theme, isRowExtended}) => isRowExtended ? theme.dark2 : theme.border1};
  width: 48px;
  height: 48px;
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin-left: 80px;
  transition: background-color 0.3s;

  :hover {
    background-color: ${({theme}) => theme.dark2};
  }
`;

const StyledExtendableContent = styled.div<{ isVisible: boolean }>`
  display: ${({isVisible}) => isVisible ? 'block' : 'none'};
  color: ${({theme}) => theme.darkWhite};
  background-color: ${({theme}) => theme.darkGrey};
  padding: 16px 26px;
  text-align: left;
  border-radius: 8px;
`;

const ExtendableRow: React.FC<ExtendableRowProps> = (
  {
    coinName,
    projectedReward,
    apr,
    lockPeriodDays,
    blockReward,
    liquidity,
    type,
  }
) => {
  const [isRowExtended, setIsRowExtended] = useState(false);

  const handleExtendClick = useCallback(() => {
    setIsRowExtended(!isRowExtended);
  }, [isRowExtended]);

  return (<StyledRow>
    <StyledHeader>
      <StyledTable>
        <thead>
        <StyledTh>Coin</StyledTh>
        <StyledTh>Projected reward</StyledTh>
        <StyledTh>APR</StyledTh>
        <StyledTh>Lock period</StyledTh>
        <StyledTh>Block reward</StyledTh>
        <StyledTh>Liquidity</StyledTh>
        <StyledTh>Type</StyledTh>
        </thead>
        <tbody>
        <tr>
          <td width={120}>{coinName}</td>
          <td width={200}>{projectedReward}</td>
          <td width={150}>{apr}</td>
          <td width={150}>{lockPeriodDays}</td>
          <td width={200}>{blockReward}</td>
          <td width={200}>{liquidity}</td>
          <td>{type}</td>
        </tr>
        </tbody>
      </StyledTable>
      <StyledExtendButton onClick={handleExtendClick} isRowExtended={isRowExtended}>
        {isRowExtended ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
      </StyledExtendButton>
    </StyledHeader>
    <StyledExtendableContent isVisible={isRowExtended}>
      Test
    </StyledExtendableContent>
  </StyledRow>);
}

export default ExtendableRow;
