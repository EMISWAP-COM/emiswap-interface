import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components/macro';
import NumericalInput from './NumericalInput';
import { lighten } from 'polished';
import Button from '../../../base/ui/Button';
import CurrencyLogo from '../../../components/CurrencyLogo';
import { JSBI, Rounding, Token, TokenAmount } from '@uniswap/sdk';
import { useTokenBalance } from '../../../state/wallet/hooks';
import { useActiveWeb3React } from '../../../hooks';
import { tokenAmountToString } from '../../../utils/formats';
import { maxAmountSpend } from '../../../utils/maxAmountSpend';
import { tryParseAmount } from '../../../state/swap/hooks';
import { ApprovalState, useApproveCallback } from '../../../hooks/useApproveCallback';
import { useCompletedTransactionsCount } from '../../../state/transactions/hooks';
import { useWalletModalToggle } from '../../../state/application/hooks';
import LpTokenSymbol from '../LpTokenSymbol';
import isLpToken from '../isLpToken';

const StyledTokenInputWrapper = styled.div`
  border: 1px solid ${({ theme }) => theme.lightGrey};
  border-radius: 16px;
  padding: 16px;
`;

const StyledInputWrapper = styled.div`
  background-color: ${({ theme }) => theme.dark1};
  border: 1px solid ${({ theme }) => theme.border2};
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
`;

const StyledInputHeader = styled.div`
  color: ${({ theme }) => theme.darkText};
  font-size: 12px;
  margin-bottom: 8px;
  text-transform: uppercase;
  display: flex;
  justify-content: space-between;
`;

const StyledInputContentWrapper = styled.div`
  display: flex;

  ${({ theme }) => theme.mediaWidth.upToLarge`
    flex-direction: column;
  `};
`;

const StyledBalanceMax = styled.button`
  outline: none;
  height: 32px;
  background-color: ${({ theme }) => theme.red};
  border-radius: 6px;
  font-size: 14px;
  transition: background-color 0.3s;
  border: 0;
  cursor: pointer;
  user-select: none;
  color: ${({ theme }) => theme.white};

  :hover,
  :focus {
    background-color: ${({ theme }) => lighten(0.1, theme.red)};
  }
`;

const StyledInputButtons = styled.div`
  display: flex;

  ${({ theme }) => theme.mediaWidth.upToLarge`
    margin-top: 10px;
  `};
`;

const StyledCurrency = styled.div`
  display: flex;
  align-items: center;
  height: 32px;
  font-size: 18px;
  background-color: ${({ theme }) => theme.darkGrey};
  color: ${({ theme }) => theme.white};
  border-radius: 6px;
  margin-left: 8px;
  padding: 0 6px;
  white-space: nowrap;
`;

const StyledTokenName = styled.div`
  margin-left: 8px;
`;

const StyledBalance = styled.div`
  color: ${({ theme }) => theme.white};
`;

type TokenInputProps = {
  contractAddress: string;
  token: Token;
  onStake: (amount: string) => Promise<unknown>;
  tokenMode: number;
  totalSupply: string;
  totalStakeLimit: string;
};

const TokenInput: React.FC<TokenInputProps> = (
  {
    contractAddress,
    token,
    onStake,
    tokenMode,
    totalSupply,
    totalStakeLimit,
  }
) => {
  const { account } = useActiveWeb3React();
  const [inputValue, setInputValue] = useState<string>('');
  const [isStakeInProgress, setIsStakeInProgress] = useState<boolean>(false);
  const [, setIsApprovalInProgress] = useState<boolean>(false);

  const veryLargeAmount = new TokenAmount(token, JSBI.BigInt('99999999999999999999999999999'));
  const [approvalState, doApprove] = useApproveCallback(veryLargeAmount, contractAddress, true);

  // This counter is used to update isStakeInProgress whenever transaction finishes
  const completedTransactionsCount = useCompletedTransactionsCount();

  const handleButtonClick = useCallback(() => {
    setIsStakeInProgress(true);
    onStake(inputValue).catch(() => {
      setIsStakeInProgress(false);
    });
  }, [onStake, inputValue]);

  const handleApprove = useCallback(() => {
    setIsApprovalInProgress(true);
    doApprove();
  }, [doApprove])

  useEffect(() => {
    setIsStakeInProgress(false);

    setIsApprovalInProgress((prevVal) => {
      if (!prevVal) {
        setInputValue('');
      }

      return false;
    });
  }, [completedTransactionsCount]);

  const balance = useTokenBalance(account, token);
  const maxAmount = maxAmountSpend(balance);

  const handleMaxButtonClick = useCallback(() => {
    if (!maxAmount) return;
    // Artificially limit max number of decimals, cause values greater than 12 could be problematic
    const maxDecimalsForAmount = 12;
    setInputValue(maxAmount.toFixed(token.decimals < maxDecimalsForAmount ? token.decimals : maxDecimalsForAmount, undefined, Rounding.ROUND_DOWN));
  }, [maxAmount, token.decimals]);

  const isInsufficientBalance = useMemo(() => {
    const parsedAmount = tryParseAmount(inputValue, token);

    return maxAmount && parsedAmount && JSBI.lessThan(maxAmount.raw, parsedAmount.raw);
  }, [inputValue, token, maxAmount]);

  const isStakeButtonDisabled = isInsufficientBalance || !Number(inputValue) || isStakeInProgress;

  let stakeButtonText = 'Stake';
  if (isInsufficientBalance) {
    stakeButtonText = 'Insufficient balance';
  }
  if (isStakeInProgress) {
    stakeButtonText = 'Staking...';
  }

  const toggleWalletModal = useWalletModalToggle();

  const [isLimitReached, setIsLimitReached] = useState<boolean>(false);
  useEffect(() => {
    console.debug(totalSupply);
    console.debug(totalStakeLimit);
    setIsLimitReached((parseFloat(totalSupply) + parseFloat(inputValue)) > parseFloat(totalStakeLimit));
  }, [inputValue, totalStakeLimit, totalSupply]);

  const renderStakeButton = () => {
    if (!account) {
      return <Button onClick={toggleWalletModal}>Connect to a wallet</Button>;
    } else {
      if (isLimitReached) {
        return <Button isDisabled={true}>Total stake limit reached</Button>
      } else {
        if (approvalState === ApprovalState.UNKNOWN) {
          return <Button isDisabled={true}>Checking approval...</Button>;
        }

        if (approvalState === ApprovalState.NOT_APPROVED) {
          return <Button onClick={handleApprove}>Approve {token?.symbol}</Button>;
        }

        if (approvalState === ApprovalState.PENDING) {
          return <Button isDisabled={true}>Approval in progress...</Button>;
        }

        if (approvalState === ApprovalState.APPROVED) {
          return <Button onClick={handleButtonClick} isDisabled={isStakeButtonDisabled}>
            {stakeButtonText}
          </Button>;
        }
      }
    }

    return null;
  };

  return (
    <StyledTokenInputWrapper>
      <StyledInputWrapper>
        <StyledInputHeader>
          {token?.symbol} to stake
          <StyledBalance>Balance: {tokenAmountToString(balance)}</StyledBalance>
        </StyledInputHeader>
        <StyledInputContentWrapper>
          <NumericalInput
            value={inputValue}
            onChange={value => {
              setInputValue(value);
            }}
            numberOfDecimals={token.decimals}
          />
          <StyledInputButtons>
            <StyledBalanceMax onClick={handleMaxButtonClick}>MAX</StyledBalanceMax>
            <StyledCurrency>
              {isLpToken(tokenMode) ? (
                <LpTokenSymbol />
              ) : (
                <CurrencyLogo currency={token} size={'24px'} />
              )}
              <StyledTokenName>{token?.symbol}</StyledTokenName>
            </StyledCurrency>
          </StyledInputButtons>
        </StyledInputContentWrapper>
      </StyledInputWrapper>
      {renderStakeButton()}
    </StyledTokenInputWrapper>
  );
};

export default TokenInput;
