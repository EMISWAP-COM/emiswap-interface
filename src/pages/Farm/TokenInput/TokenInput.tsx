import React, { useCallback, useMemo, useState } from 'react';
import styled from 'styled-components/macro';
import NumericalInput from './NumericalInput';
import { lighten } from 'polished';
import Button from '../../../base/ui/Button';
import CurrencyLogo from '../../../components/CurrencyLogo';
import { JSBI, Token } from '@uniswap/sdk';
import { useTokenBalance } from '../../../state/wallet/hooks';
import { useActiveWeb3React } from '../../../hooks';
import { tokenAmountToString } from '../../../utils/formats';
import { maxAmountSpend } from '../../../utils/maxAmountSpend';
import { tryParseAmount } from '../../../state/swap/hooks';

const StyledTokenInputWrapper = styled.div`
  border: 1px solid ${({theme}) => theme.lightGrey};
  border-radius: 16px;
  padding: 16px;
`;

const StyledInputWrapper = styled.div`
  background-color: ${({theme}) => theme.dark1};
  border: 1px solid ${({theme}) => theme.border2};
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
`;

const StyledInputHeader = styled.div`
  color: ${({theme}) => theme.darkText};
  font-size: 12px;
  margin-bottom: 8px;
  text-transform: uppercase;
  display: flex;
  justify-content: space-between;
`;

const StyledInputContentWrapper = styled.div`
  display: flex;
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
    background-color: ${({ theme }) => lighten(0.1, theme.red)}
  }
`;

const StyledCurrencySelect = styled.button`
  outline: none;
  display: flex;
  align-items: center;
  height: 32px;
  font-size: 18px;
  background-color: ${({ theme }) => theme.darkGrey};
  color: ${({ theme }) => theme.white};
  border-radius: 6px;
  outline: none;
  user-select: none;
  border: 0;
  margin-left: 8px;
`;

const StyledTokenName = styled.div`
  margin-left: 8px;
`;

const StyledBalance = styled.div`
  color: ${({ theme }) => theme.white};
`;

type TokenInputProps = {
  token: Token | undefined;
  onStake: (amount: string) => void;
}

const TokenInput: React.FC<TokenInputProps> = (
  {
    token,
    onStake,
  }
) => {
  const { account } = useActiveWeb3React();
  const [inputValue, setInputValue] = useState<string>('');

  const handleButtonClick = useCallback(() => {
    onStake(inputValue);
  }, [onStake, inputValue]);

  const balance = useTokenBalance(account, token);

  const handleMaxButtonClick = useCallback(() => {
    setInputValue(maxAmountSpend(balance).toExact());
  }, [balance]);



  const isInsufficientBalance = useMemo(() => {
    const parsedAmount = tryParseAmount(inputValue, token);
    const maxAmount = maxAmountSpend(balance);

    return maxAmount && parsedAmount && JSBI.lessThan(maxAmount.raw, parsedAmount.raw);
  }, [balance, inputValue, token]);

  return (<StyledTokenInputWrapper>
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
        />
        <StyledBalanceMax onClick={handleMaxButtonClick}>MAX</StyledBalanceMax>
        <StyledCurrencySelect>
          <CurrencyLogo currency={token} size={'24px'} />
          <StyledTokenName>{token?.symbol}</StyledTokenName>
        </StyledCurrencySelect>
      </StyledInputContentWrapper>
    </StyledInputWrapper>
    <Button onClick={handleButtonClick} isDisabled={isInsufficientBalance}>{isInsufficientBalance ? 'Insufficient balance' : 'Stake'}</Button>
  </StyledTokenInputWrapper>);
}

export default TokenInput;
