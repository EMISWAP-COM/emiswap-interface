import { Token } from '@uniswap/sdk';
import CurrencyFormat from 'react-currency-format';
import React, { useCallback, useState } from 'react';
import { ChevronDown, ChevronUp } from 'react-feather';

import isLpToken from '../isLpToken';
import TokenInput from '../TokenInput';
import TokenCollect from '../TokenCollect';
import LpTokenSymbol from '../LpTokenSymbol';
import CurrencyLogo from '../../../components/CurrencyLogo';
import { TruncatedTextWithTooltip, TruncatedText } from '../../../base/ui';

import * as Styled from './styled';

export interface ExtendableRowProps {
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
}

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
    <Styled.Row>
      <Styled.Header>
        <Styled.BlocksWrapper>
          <Styled.Block width={200}>
            <Styled.BlockTitle>Coin</Styled.BlockTitle>
            <Styled.BlockValue>
              <Styled.CurrencyLogo>
                {isLpToken(tokenMode) ? (
                  <LpTokenSymbol />
                ) : (
                  <CurrencyLogo currency={stakeToken} size="24px" />
                )}
              </Styled.CurrencyLogo>
              <TruncatedText>
                {isLpToken(tokenMode) ? stakeToken?.name : stakeToken?.symbol}
              </TruncatedText>
            </Styled.BlockValue>
          </Styled.Block>

          <Styled.Block width={250}>
            <Styled.BlockTitle>Your reward</Styled.BlockTitle>
            <Styled.BlockValue>
              <Styled.CurrencyLogo>
                <CurrencyLogo currency={rewardToken} size="24px" />
              </Styled.CurrencyLogo>
              <TruncatedTextWithTooltip title={projectedReward}>
                {projectedReward === '0' ? '0' : parseFloat(projectedReward).toFixed(6)}...
              </TruncatedTextWithTooltip>
            </Styled.BlockValue>
          </Styled.Block>

          <Styled.Block width={100}>
            <Styled.BlockTitle>APR</Styled.BlockTitle>
            <Styled.BlockValue>
              <TruncatedTextWithTooltip title={`${apr.toFixed(2)}%`}>
                {apr.toFixed(2)}%
              </TruncatedTextWithTooltip>
            </Styled.BlockValue>
          </Styled.Block>

          <Styled.Block width={250}>
            <Styled.BlockTitle>Block reward</Styled.BlockTitle>
            <Styled.BlockValue>
              <Styled.CurrencyLogo>
                <CurrencyLogo currency={rewardToken} size="24px" />
              </Styled.CurrencyLogo>

              <TruncatedTextWithTooltip title={blockReward}>
                {parseFloat(blockReward).toFixed(6)}...
              </TruncatedTextWithTooltip>
            </Styled.BlockValue>
          </Styled.Block>

          <Styled.Block width={200}>
            <Styled.BlockTitle>Liquidity</Styled.BlockTitle>
            <Styled.BlockValue>
              <TruncatedText>
                <CurrencyFormat
                  value={liquidity}
                  displayType="text"
                  thousandSeparator=" "
                  prefix="$ "
                  decimalScale={2}
                />
              </TruncatedText>
            </Styled.BlockValue>
          </Styled.Block>

          <Styled.Block width={300}>
            <Styled.BlockTitle>End time</Styled.BlockTitle>
            <Styled.BlockValue>{endDate}</Styled.BlockValue>
          </Styled.Block>

          <Styled.Block>
            <Styled.BlockTitle>Type</Styled.BlockTitle>
            <Styled.BlockValue>
              <Styled.BlueText>{type}</Styled.BlueText>
            </Styled.BlockValue>
          </Styled.Block>
        </Styled.BlocksWrapper>
        <Styled.ExtendButtonDesktop onClick={handleExtendClick} isRowExtended={isRowExtended}>
          {isRowExtended ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
        </Styled.ExtendButtonDesktop>
      </Styled.Header>

      <Styled.ExtendableContent isVisible={isRowExtended}>
        <Styled.BlocksWrapper>
          <Styled.Block width={150}>
            <Styled.BlockTitle>Deposit</Styled.BlockTitle>
            <Styled.BlockValue>
              <Styled.CurrencyLogo>
                {isLpToken(tokenMode) ? (
                  <LpTokenSymbol />
                ) : (
                  <CurrencyLogo currency={stakeToken} size="24px" />
                )}
              </Styled.CurrencyLogo>
              <TruncatedText>{deposit}</TruncatedText>
            </Styled.BlockValue>
          </Styled.Block>

          <Styled.Block>
            <Styled.BlockTitle>Your reward</Styled.BlockTitle>
            <Styled.BlockValue>
              <Styled.CurrencyLogo>
                <CurrencyLogo currency={rewardToken} size={'24px'} />
              </Styled.CurrencyLogo>
              <TruncatedText>{projectedReward}</TruncatedText>
            </Styled.BlockValue>
          </Styled.Block>
        </Styled.BlocksWrapper>

        <Styled.Hr />

        <Styled.InputsWrapper>
          <Styled.TokenInputWrapper>
            {stakeToken && (
              <TokenInput
                token={stakeToken}
                contractAddress={contractAddress}
                onStake={onStake}
                tokenMode={tokenMode}
              />
            )}
          </Styled.TokenInputWrapper>

          <Styled.TokenInputWrapper>
            <TokenCollect
              deposit={deposit}
              projectedReward={projectedReward}
              stakeToken={stakeToken}
              rewardToken={rewardToken}
              onCollect={onCollect}
              tokenMode={tokenMode}
            />
          </Styled.TokenInputWrapper>
        </Styled.InputsWrapper>
      </Styled.ExtendableContent>

      <Styled.ExtendButtonMobile onClick={handleExtendClick} isRowExtended={isRowExtended}>
        <Styled.MobileChevron>
          {isRowExtended ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
        </Styled.MobileChevron>
        Show all
      </Styled.ExtendButtonMobile>
    </Styled.Row>
  );
};

export default ExtendableRow;
