import React, { useCallback, useState } from 'react';
import styled from 'styled-components/macro';
import { ChevronDown, ChevronUp } from 'react-feather';
import TokenInput from '../TokenInput';
import TokenCollect from '../TokenCollect';
import { Token } from '@uniswap/sdk';
import CurrencyLogo from '../../../components/CurrencyLogo';

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
  padding-right: 15px;

  ${({ theme }) => theme.mediaWidth.upToMedium`
    flex-direction: row;
    justify-content: space-between;
    flex-basis: 0;
    margin-bottom: 16px;
    padding-right: 0;
  `};
`;

const StyledBlockTitle = styled.div`
  color: ${({theme}) => theme.darkWhite};
  font-weight: 400;
  margin-bottom: 16px;
`;

const StyledBlockValue = styled.div`
  display: flex;
  align-items: center;
  overflow: hidden;
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

const StyledInputsWrapper = styled.div`
  display: flex;
  justify-content: space-between;

  ${({ theme }) => theme.mediaWidth.upToMedium`
    display: block;
  `};
`;

const StyledTokenInputWrapper = styled.div`
  width: 49%;

  ${({ theme }) => theme.mediaWidth.upToMedium`
    width: 100%;
    margin-bottom: 16px;
  `};
`;

const StyledHr = styled.div`
  height: 1px;
  background-color: ${({theme}) => theme.dark1};
  width: calc(100% + 48px);
  margin-left: -24px;
  margin-top: 24px;
  margin-bottom: 24px;
`;

const StyledBlueText = styled.div`
  color: ${({theme}) => theme.blue};
`;

const StyledCurrencyLogo = styled.div`
  margin-right: 12px;

  > img {
    display: block;
  }
`;

const StyledTruncatedText = styled.span`
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

type ExtendableRowProps = {
  contractAddress: string;
  stakeToken: Token | undefined;
  rewardToken: Token | undefined;
  projectedReward: string;
  apr: string;
  blockReward: string;
  liquidity: string;
  deposit: string;
  type: string;
  onStake: (amount: string) => Promise<unknown>;
  onCollect: () => Promise<unknown>;
}

const ExtendableRow: React.FC<ExtendableRowProps> = (
  {
    contractAddress,
    stakeToken,
    rewardToken,
    projectedReward,
    apr,
    blockReward,
    liquidity,
    deposit,
    type,
    onStake,
    onCollect,
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
          <StyledBlockValue>
            <StyledCurrencyLogo><CurrencyLogo currency={stakeToken} size={'24px'} /></StyledCurrencyLogo>
            <StyledTruncatedText>{stakeToken?.symbol}</StyledTruncatedText>
          </StyledBlockValue>
        </StyledBlock>
        <StyledBlock width={250}>
          <StyledBlockTitle>Projected reward</StyledBlockTitle>
          <StyledBlockValue>
            <StyledCurrencyLogo><CurrencyLogo currency={rewardToken} size={'24px'} /></StyledCurrencyLogo>
            <StyledTruncatedText>{projectedReward}</StyledTruncatedText>
          </StyledBlockValue>
        </StyledBlock>
        <StyledBlock width={100}>
          <StyledBlockTitle>APR</StyledBlockTitle>
          <StyledBlockValue>
            <StyledTruncatedText>{apr}</StyledTruncatedText>
          </StyledBlockValue>
        </StyledBlock>
        <StyledBlock width={250}>
          <StyledBlockTitle>Block reward</StyledBlockTitle>
          <StyledBlockValue>
            <StyledCurrencyLogo><CurrencyLogo currency={rewardToken} size={'24px'} /></StyledCurrencyLogo>
            <StyledTruncatedText>
              <StyledTruncatedText>{blockReward}</StyledTruncatedText>
            </StyledTruncatedText>
          </StyledBlockValue>
        </StyledBlock>
        <StyledBlock width={200}>
          <StyledBlockTitle>Liquidity</StyledBlockTitle>
          <StyledBlockValue>
            <StyledTruncatedText>{liquidity}</StyledTruncatedText>
          </StyledBlockValue>
        </StyledBlock>
        <StyledBlock width={200}>
          <StyledBlockTitle>End time</StyledBlockTitle>
          <StyledBlockValue>---</StyledBlockValue>
        </StyledBlock>
        <StyledBlock>
          <StyledBlockTitle>Type</StyledBlockTitle>
          <StyledBlockValue>
            <StyledBlueText>{type}</StyledBlueText>
          </StyledBlockValue>
        </StyledBlock>
      </StyledBlocksWrapper>
      <StyledExtendButtonDesktop onClick={handleExtendClick} isRowExtended={isRowExtended}>
        {isRowExtended ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
      </StyledExtendButtonDesktop>
    </StyledHeader>
    <StyledExtendableContent isVisible={isRowExtended}>
      <StyledBlocksWrapper>
        <StyledBlock width={150}>
          <StyledBlockTitle>Deposit</StyledBlockTitle>
          <StyledBlockValue>
            <StyledCurrencyLogo><CurrencyLogo currency={stakeToken} size={'24px'} /></StyledCurrencyLogo>
            <StyledTruncatedText>{deposit}</StyledTruncatedText>
          </StyledBlockValue>
        </StyledBlock>
        <StyledBlock>
          <StyledBlockTitle>Projected reward</StyledBlockTitle>
          <StyledBlockValue>
            <StyledCurrencyLogo><CurrencyLogo currency={rewardToken} size={'24px'} /></StyledCurrencyLogo>
            <StyledTruncatedText>{projectedReward}</StyledTruncatedText>
          </StyledBlockValue>
        </StyledBlock>
      </StyledBlocksWrapper>
      <StyledHr />
      <StyledInputsWrapper>
        <StyledTokenInputWrapper>
          {stakeToken && <TokenInput token={stakeToken} contractAddress={contractAddress} onStake={onStake} />}
        </StyledTokenInputWrapper>
        <StyledTokenInputWrapper>
          <TokenCollect
            deposit={deposit}
            projectedReward={projectedReward}
            stakeToken={stakeToken}
            rewardToken={rewardToken}
            onCollect={onCollect}
          />
        </StyledTokenInputWrapper>
      </StyledInputsWrapper>
    </StyledExtendableContent>
    <StyledExtendButtonMobile onClick={handleExtendClick} isRowExtended={isRowExtended}>
      <StyledMobileChevron>{isRowExtended ? <ChevronUp size={24} /> : <ChevronDown size={24} />}</StyledMobileChevron>
      Show all
    </StyledExtendButtonMobile>
  </StyledRow>);
}

export default ExtendableRow;
