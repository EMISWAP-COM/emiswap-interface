import React, { useCallback, useState } from 'react';
import styled from 'styled-components/macro';
import NumericalInput from './NumericalInput';
import { lighten } from 'polished';
import Button from '../../../base/ui/Button';
import CurrencyLogo from '../../../components/CurrencyLogo';
import { ESW } from '../../../constants';
import { TokenInputType } from '../types';

type TokenInputProps = {
  type: TokenInputType;
  isButtonDisabled?: boolean;
}

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

const TokenInput: React.FC<TokenInputProps> = (
  {
    type,
    isButtonDisabled,
  }
) => {
  const [inputValue, setInputValue] = useState<string>('');
  let buttonText;
  let inputHeaderText;
  switch (type) {
    case TokenInputType.Stake:
      buttonText = 'Stake';
      inputHeaderText = 'ESW to stake';
      break;
    case TokenInputType.Collect:
      buttonText = 'Collect to wallet';
      inputHeaderText = 'tokens to collect';
      break;
  }

  const handleButtonClick = useCallback(() => {}, []);

  return (<StyledTokenInputWrapper>
    <StyledInputWrapper>
      <StyledInputHeader>{inputHeaderText}</StyledInputHeader>
      <StyledInputContentWrapper>
        <NumericalInput
          value={inputValue}
          onChange={value => {
            setInputValue(value);
          }}
        />
        <StyledBalanceMax>MAX</StyledBalanceMax>
        <StyledCurrencySelect>
          <CurrencyLogo currency={ESW[42][0]} size={'24px'} />
          <StyledTokenName>ESW</StyledTokenName>
        </StyledCurrencySelect>
      </StyledInputContentWrapper>
    </StyledInputWrapper>
    <Button onClick={handleButtonClick} isDisabled={isButtonDisabled}>{buttonText}</Button>
  </StyledTokenInputWrapper>);
}

export default TokenInput;
