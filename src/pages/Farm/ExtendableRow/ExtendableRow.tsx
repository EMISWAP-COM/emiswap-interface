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

  ${({ theme }) => theme.mediaWidth.upToMedium`
    display: block;
  `};
`;

const StyledBlocksWrapper = styled.div`
  color: ${({theme}) => theme.white};
  font-weight: 600;
  font-size: 16px;
  text-align: left;
  flex-grow: 1;
  display: flex;

  ${({ theme }) => theme.mediaWidth.upToMedium`
    flex-direction: column;
  `};
`;

const StyledBlock = styled.div<{ width?: number }>`
  display: flex;
  flex-direction: column;
  flex-basis: ${({width}) => width ? width + 'px' : 'auto'};

  ${({ theme }) => theme.mediaWidth.upToMedium`
    flex-direction: row;
    justify-content: space-between;
    flex-basis: 0;
    margin-bottom: 16px;
  `};
`;

const StyledBlockTitle = styled.div`
  color: ${({theme}) => theme.darkWhite};
  font-weight: 400;
`;

const StyledBlockValue = styled.div`
`;

const StyledExtendButtonDesktop = styled.div<{ isRowExtended: boolean }>`
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

  ${({ theme }) => theme.mediaWidth.upToMedium`
    display: none;
    border-radius: 8px;
    width: 100%;
    margin-left: 0;
  `};
`;

const StyledExtendButtonMobile = styled.div<{ isRowExtended: boolean }>`
  display: none;
  color: ${({theme}) => theme.darkWhite};
  background-color: ${({theme, isRowExtended}) => isRowExtended ? theme.dark2 : theme.border1};
  border-radius: 0 0 8px 8px;
  width: 100%;
  height: 48px;
  margin-left: 0;
  position: relative;

  :active {
    background-color: ${({theme}) => theme.dark2};
  }

  ${({ theme }) => theme.mediaWidth.upToMedium`
    display: flex;
    justify-content: center;
    align-items: center;
  `};
`;

const StyledMobileChevron = styled.div`
  position: absolute;
  left: 24px;
  top: 13px;
`;

const StyledExtendableContent = styled.div<{ isVisible: boolean }>`
  display: ${({isVisible}) => isVisible ? 'block' : 'none'};
  color: ${({theme}) => theme.darkWhite};
  background-color: ${({theme}) => theme.darkGrey};
  padding: 16px 26px;
  text-align: left;
  border-radius: 8px;

  ${({ theme }) => theme.mediaWidth.upToMedium`
    border-radius: 8px 8px 0 0;
  `};
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
      <StyledBlocksWrapper>
        <StyledBlock width={150}>
          <StyledBlockTitle>Coin</StyledBlockTitle>
          <StyledBlockValue>{coinName}</StyledBlockValue>
        </StyledBlock>
        <StyledBlock width={200}>
          <StyledBlockTitle>Projected reward</StyledBlockTitle>
          <StyledBlockValue>{projectedReward}</StyledBlockValue>
        </StyledBlock>
        <StyledBlock width={150}>
          <StyledBlockTitle>APR</StyledBlockTitle>
          <StyledBlockValue>{apr}</StyledBlockValue>
        </StyledBlock>
        <StyledBlock width={150}>
          <StyledBlockTitle>Lock period</StyledBlockTitle>
          <StyledBlockValue>{lockPeriodDays}</StyledBlockValue>
        </StyledBlock>
        <StyledBlock width={200}>
          <StyledBlockTitle>Block reward</StyledBlockTitle>
          <StyledBlockValue>{blockReward}</StyledBlockValue>
        </StyledBlock>
        <StyledBlock width={200}>
          <StyledBlockTitle>Liquidity</StyledBlockTitle>
          <StyledBlockValue>{liquidity}</StyledBlockValue>
        </StyledBlock>
        <StyledBlock>
          <StyledBlockTitle>Type</StyledBlockTitle>
          <StyledBlockValue>{type}</StyledBlockValue>
        </StyledBlock>
      </StyledBlocksWrapper>
      <StyledExtendButtonDesktop onClick={handleExtendClick} isRowExtended={isRowExtended}>
        {isRowExtended ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
      </StyledExtendButtonDesktop>
    </StyledHeader>
    <StyledExtendableContent isVisible={isRowExtended}>
      Test
    </StyledExtendableContent>
    <StyledExtendButtonMobile onClick={handleExtendClick} isRowExtended={isRowExtended}>
      <StyledMobileChevron>{isRowExtended ? <ChevronUp size={24} /> : <ChevronDown size={24} />}</StyledMobileChevron>
      Show all
    </StyledExtendButtonMobile>
  </StyledRow>);
}

export default ExtendableRow;
