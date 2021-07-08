import React, { useCallback, useState } from 'react';
import styled from 'styled-components/macro';
import { ChevronDown, ChevronUp } from 'react-feather';
import CurrencyFormat from 'react-currency-format';
import TokenInput from '../TokenInput';
import TokenCollect from '../TokenCollect';
import { Token } from '@uniswap/sdk';
import CurrencyLogo from '../../../components/CurrencyLogo';
import Tooltip from '../Tooltip';
import LpTokenSymbol from '../LpTokenSymbol';
import isLpToken from '../isLpToken';

const StyledRow = styled.div`
  background-color: ${({ theme }) => theme.border1Transparency};
  border-radius: 8px;
  margin-bottom: 8px;
`;

const StyledHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 16px 26px;

  ${({ theme }) => theme.mediaWidth.upToLarge`
    display: block;
  `};
`;

const StyledBlocksWrapper = styled.div`
  color: ${({ theme }) => theme.white};
  font-weight: 600;
  font-size: 16px;
  text-align: left;
  flex-grow: 1;
  display: flex;

  ${({ theme }) => theme.mediaWidth.upToLarge`
    flex-direction: column;
  `};
`;

const StyledBlock = styled.div<{ width?: number }>`
  display: flex;
  flex-direction: column;
  flex-basis: ${({ width }) => (width ? width + 'px' : 'auto')};
  padding-right: 15px;
  flex-grow: 0;
  flex-shrink: 1;
  overflow: hidden;

  ${({ theme }) => theme.mediaWidth.upToLarge`
    flex-direction: row;
    justify-content: space-between;
    flex-basis: 0;
    margin-bottom: 16px;
    padding-right: 0;
    align-items: center;
    overflow: visible;
  `};
`;

const StyledBlockTitle = styled.div`
  color: ${({ theme }) => theme.darkWhite};
  font-weight: 400;
  margin-bottom: 16px;

  ${({ theme }) => theme.mediaWidth.upToLarge`
    margin-bottom: 0;
  `};
`;

const StyledBlockValue = styled.div`
  display: flex;
  align-items: center;
  overflow: hidden;
`;

const StyledExtendButtonDesktop = styled.div<{ isRowExtended: boolean }>`
  color: ${({ theme }) => theme.darkWhite};
  font-weight: 400;
  border-radius: 100%;
  background-color: ${({ theme, isRowExtended }) => (isRowExtended ? theme.dark2 : theme.border1)};
  width: 48px;
  height: 48px;
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin-left: 20px;
  transition: background-color 0.3s;

  :hover {
    background-color: ${({ theme }) => theme.dark2};
  }

  ${({ theme }) => theme.mediaWidth.upToLarge`
    display: none;
    border-radius: 8px;
    width: 100%;
    margin-left: 0;
  `};
`;

const StyledExtendButtonMobile = styled.div<{ isRowExtended: boolean }>`
  display: none;
  color: ${({ theme }) => theme.darkWhite};
  background-color: ${({ theme, isRowExtended }) => (isRowExtended ? theme.dark2 : theme.border1)};
  border-radius: 0 0 8px 8px;
  width: 100%;
  height: 48px;
  margin-left: 0;
  position: relative;

  :active {
    background-color: ${({ theme }) => theme.dark2};
  }

  ${({ theme }) => theme.mediaWidth.upToLarge`
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
  display: ${({ isVisible }) => (isVisible ? 'block' : 'none')};
  color: ${({ theme }) => theme.darkWhite};
  background-color: ${({ theme }) => theme.darkGrey};
  padding: 16px 26px;
  text-align: left;
  border-radius: 8px;

  ${({ theme }) => theme.mediaWidth.upToLarge`
    border-radius: 8px 8px 0 0;
  `};
`;

const StyledInputsWrapper = styled.div`
  display: flex;
  justify-content: space-between;

  ${({ theme }) => theme.mediaWidth.upToLarge`
    display: block;
  `};
`;

const StyledTokenInputWrapper = styled.div`
  width: 49%;

  ${({ theme }) => theme.mediaWidth.upToLarge`
    width: 100%;
    margin-bottom: 16px;
  `};
`;

const StyledHr = styled.div`
  height: 1px;
  background-color: ${({ theme }) => theme.dark1};
  width: calc(100% + 48px);
  margin-left: -24px;
  margin-top: 24px;
  margin-bottom: 24px;
`;

const StyledBlueText = styled.div`
  color: ${({ theme }) => theme.blue};
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
  apr: number;
  blockReward: string;
  liquidity: string;
  endDate: string;
  deposit: string;
  type: string;
  onStake: (amount: string) => Promise<unknown>;
  onCollect: () => Promise<unknown>;
  tokenMode: number;
};

const ExtendableRow: React.FC<ExtendableRowProps> = ({
  contractAddress,
  stakeToken,
  rewardToken,
  projectedReward,
  apr,
  blockReward,
  liquidity,
  endDate,
  deposit,
  type,
  onStake,
  onCollect,
  tokenMode,
}) => {
  const [isRowExtended, setIsRowExtended] = useState(false);

  const handleExtendClick = useCallback(() => {
    setIsRowExtended(!isRowExtended);
  }, [isRowExtended]);

  return (
    <StyledRow>
      <StyledHeader>
        <StyledBlocksWrapper>
          <StyledBlock width={150}>
            <StyledBlockTitle>Coin</StyledBlockTitle>
            <StyledBlockValue>
              <StyledCurrencyLogo>
                {isLpToken(tokenMode) ? (
                  <LpTokenSymbol />
                ) : (
                  <CurrencyLogo currency={stakeToken} size={'24px'} />
                )}
              </StyledCurrencyLogo>
              <StyledTruncatedText>
                {isLpToken(tokenMode) ? stakeToken?.name : stakeToken?.symbol}
              </StyledTruncatedText>
            </StyledBlockValue>
          </StyledBlock>
          <StyledBlock width={150}>
            <StyledBlockTitle>Your reward</StyledBlockTitle>
            <StyledBlockValue>
              <StyledCurrencyLogo>
                <CurrencyLogo currency={rewardToken} size={'24px'} />
              </StyledCurrencyLogo>
              <Tooltip title={projectedReward}>
                <StyledTruncatedText>
                  {projectedReward}
                </StyledTruncatedText>
              </Tooltip>
            </StyledBlockValue>
          </StyledBlock>
          <StyledBlock width={100}>
            <StyledBlockTitle>APR</StyledBlockTitle>
            <StyledBlockValue>
              <Tooltip title={String(apr.toFixed(2)) + '%'}>
                <StyledTruncatedText>{apr.toFixed(2) + '%'}</StyledTruncatedText>
              </Tooltip>
            </StyledBlockValue>
          </StyledBlock>
          <StyledBlock width={150}>
            <StyledBlockTitle>Block reward</StyledBlockTitle>
            <StyledBlockValue>
              <StyledCurrencyLogo>
                <CurrencyLogo currency={rewardToken} size={'24px'} />
              </StyledCurrencyLogo>
              <Tooltip title={blockReward}>
                <StyledTruncatedText>
                  {blockReward}
                </StyledTruncatedText>
              </Tooltip>
            </StyledBlockValue>
          </StyledBlock>
          <StyledBlock width={150}>
            <StyledBlockTitle>Liquidity</StyledBlockTitle>
            <StyledBlockValue>
              <StyledTruncatedText>
                <CurrencyFormat
                  value={liquidity}
                  displayType={'text'}
                  thousandSeparator={' '}
                  prefix={'$ '}
                  decimalScale={2}
                />
              </StyledTruncatedText>
            </StyledBlockValue>
          </StyledBlock>
          <StyledBlock width={200}>
            <StyledBlockTitle>End time</StyledBlockTitle>
            <StyledBlockValue>{endDate}</StyledBlockValue>
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
              <StyledCurrencyLogo>
                {isLpToken(tokenMode) ? (
                  <LpTokenSymbol />
                ) : (
                  <CurrencyLogo currency={stakeToken} size={'24px'} />
                )}
              </StyledCurrencyLogo>
              <StyledTruncatedText>{deposit}</StyledTruncatedText>
            </StyledBlockValue>
          </StyledBlock>
          <StyledBlock>
            <StyledBlockTitle>Your reward</StyledBlockTitle>
            <StyledBlockValue>
              <StyledCurrencyLogo>
                <CurrencyLogo currency={rewardToken} size={'24px'} />
              </StyledCurrencyLogo>
              <StyledTruncatedText>{projectedReward}</StyledTruncatedText>
            </StyledBlockValue>
          </StyledBlock>
        </StyledBlocksWrapper>
        <StyledHr />
        <StyledInputsWrapper>
          <StyledTokenInputWrapper>
            {stakeToken && (
              <TokenInput
                token={stakeToken}
                contractAddress={contractAddress}
                onStake={onStake}
                tokenMode={tokenMode}
              />
            )}
          </StyledTokenInputWrapper>
          <StyledTokenInputWrapper>
            <TokenCollect
              deposit={deposit}
              projectedReward={projectedReward}
              stakeToken={stakeToken}
              rewardToken={rewardToken}
              onCollect={onCollect}
              tokenMode={tokenMode}
            />
          </StyledTokenInputWrapper>
        </StyledInputsWrapper>
      </StyledExtendableContent>
      <StyledExtendButtonMobile onClick={handleExtendClick} isRowExtended={isRowExtended}>
        <StyledMobileChevron>
          {isRowExtended ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
        </StyledMobileChevron>
        Show all
      </StyledExtendButtonMobile>
    </StyledRow>
  );
};

export default ExtendableRow;
