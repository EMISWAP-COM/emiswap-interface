import React, { useCallback, useState } from 'react';
import styled from 'styled-components/macro';
import NumericalInput from './NumericalInput';
import { lighten } from 'polished';
import Button from '../../../base/ui/Button';
import CurrencyLogo from '../../../components/CurrencyLogo';
import { Token } from '@uniswap/sdk';

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
  cursor: pointer;
  user-select: none;
  border: 0;
  transition: background-color 0.3s;
  margin-left: 8px;

  :focus,
  :hover {
    background-color: ${({ theme }) =>lighten(0.1, theme.darkGrey)};
  }
`;

const StyledTokenName = styled.div`
  margin-left: 8px;
`;

type TokenInputProps = {
  isButtonDisabled?: boolean;
  token: Token | undefined;
  onStake: (amount: string) => void;
}

const TokenInput: React.FC<TokenInputProps> = (
  {
    isButtonDisabled,
    token,
    onStake,
  }
) => {
  const [inputValue, setInputValue] = useState<string>('');

  const handleButtonClick = useCallback(() => {
    onStake(inputValue);
  }, [onStake, inputValue]);

  return (<StyledTokenInputWrapper>
    <StyledInputWrapper>
      <StyledInputHeader>{token?.symbol} to stake</StyledInputHeader>
      <StyledInputContentWrapper>
        <NumericalInput
          value={inputValue}
          onChange={value => {
            setInputValue(value);
          }}
        />
        <StyledBalanceMax>MAX</StyledBalanceMax>
        <StyledCurrencySelect>
          <CurrencyLogo currency={token} size={'24px'} />
          <StyledTokenName>{token?.symbol}</StyledTokenName>
        </StyledCurrencySelect>
      </StyledInputContentWrapper>
    </StyledInputWrapper>
    <Button onClick={handleButtonClick} isDisabled={isButtonDisabled}>Stake</Button>
  </StyledTokenInputWrapper>);
}

export default TokenInput;
