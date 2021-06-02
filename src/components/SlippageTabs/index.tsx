import React, { useState, useRef, useContext, ChangeEvent } from 'react';
import styled, { ThemeContext } from 'styled-components';

import QuestionHelper from '../QuestionHelper';
import { TYPE } from '../../theme';
import { AutoColumn } from '../Column';
import { RowBetween, RowFixed } from '../Row';

import { darken } from 'polished';

enum SlippageError {
  InvalidInput = 'InvalidInput',
  RiskyLow = 'RiskyLow',
  RiskyHigh = 'RiskyHigh',
}

const FancyButton = styled.button`
  color: ${({ theme }) => theme.white};
  align-items: center;
  height: 2rem;
  border-radius: 36px;
  font-size: 12px;
  width: auto;
  min-width: 3rem;
  border: 1px solid ${({ theme }) => theme.lightGrey};
  outline: none;
  background: transparent;
  :hover,
  :focus {
    border: 1px solid ${({ theme }) => theme.purple};
  }
`;

const Option = styled(FancyButton)<{ active: boolean }>`
  margin-right: 8px;
  :hover {
    cursor: pointer;
  }
  background-color: ${({ active, theme }) => (active ? theme.purple : 'transparent')};
  color: ${({ theme }) => theme.white};
`;

const Input = styled.input`
  background: transparent;
  font-size: 16px;
  width: auto;
  outline: none;
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
  &::placeholder {
    color: ${({ theme, color }) => (color === 'red' ? theme.red1 : theme.white)};
  }
  color: ${({ theme, color }) => (color === 'red' ? theme.red1 : theme.white)};
  text-align: right;
`;

const OptionCustom = styled(FancyButton)<{ active?: boolean; warning?: boolean }>`
  height: 2rem;
  position: relative;
  padding: 0 0.75rem;
  flex: 1;
  border: ${({ theme, active, warning }) =>
    active && `1px solid ${warning ? theme.red : theme.lightGrey}`};
  :hover {
    border: ${({ theme, active, warning }) =>
      active && `1px solid ${warning ? darken(0.1, theme.red1) : darken(0.1, theme.purple)}`};
  }

  input {
    width: 100%;
    height: 100%;
    border: 0;
    border-radius: 2rem;
  }
`;

const SlippageEmojiContainer = styled.span`
  color: #f3841e;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    display: none;
  `}
`;

export interface SlippageTabsProps {
  rawSlippage: number;
  setRawSlippage: (rawSlippage: number) => void;
  deadline: number;
  setDeadline: (deadline: number) => void;
}

export default function SlippageTabs({ rawSlippage, setRawSlippage }: SlippageTabsProps) {
  const theme = useContext(ThemeContext);

  const inputRef = useRef<HTMLInputElement>();

  const [slippageInput, setSlippageInput] = useState('');

  const slippageInputIsValid =
    slippageInput === '' ||
    (rawSlippage / 100).toFixed(2) === Number.parseFloat(slippageInput).toFixed(2);

  let slippageError: SlippageError | undefined = undefined;
  if (slippageInput !== '' && !slippageInputIsValid) {
    slippageError = SlippageError.InvalidInput;
  } else if (slippageInputIsValid && rawSlippage < 50) {
    slippageError = SlippageError.RiskyLow;
  } else if (slippageInputIsValid && rawSlippage > 500) {
    slippageError = SlippageError.RiskyHigh;
  }

  function parseCustomSlippage(event: ChangeEvent<HTMLInputElement>) {
    setSlippageInput(event.target.value);

    let valueAsIntFromRoundedFloat: number | undefined = undefined;

    try {
      valueAsIntFromRoundedFloat = Number.parseInt(
        (Number.parseFloat(event.target.value) * 100).toString(),
      );
    } catch {}

    if (
      typeof valueAsIntFromRoundedFloat === 'number' &&
      !Number.isNaN(valueAsIntFromRoundedFloat) &&
      valueAsIntFromRoundedFloat < 5000
    ) {
      setRawSlippage(valueAsIntFromRoundedFloat);
    }
  }

  return (
    <AutoColumn gap="md">
      <AutoColumn gap="sm">
        <RowFixed>
          <TYPE.black fontWeight={400} fontSize={14} color={theme.darkWhite}>
            Slippage tolerance
          </TYPE.black>
          <QuestionHelper text="Your transaction will revert if the price changes unfavorably by more than this percentage." />
        </RowFixed>
        <RowBetween>
          <Option
            onClick={() => {
              setSlippageInput('');
              setRawSlippage(10);
            }}
            active={rawSlippage === 10}
          >
            0.1%
          </Option>
          <Option
            onClick={() => {
              setSlippageInput('');
              setRawSlippage(50);
            }}
            active={rawSlippage === 50}
          >
            0.5%
          </Option>
          <Option
            onClick={() => {
              setSlippageInput('');
              setRawSlippage(100);
            }}
            active={rawSlippage === 100}
          >
            1%
          </Option>
          <OptionCustom
            active={![10, 50, 100].includes(rawSlippage)}
            warning={!slippageInputIsValid}
            tabIndex={-1}
          >
            <RowBetween>
              {!!slippageInput &&
              (slippageError === SlippageError.RiskyLow ||
                slippageError === SlippageError.RiskyHigh) ? (
                <SlippageEmojiContainer>
                  <span role="img" aria-label="warning">
                    ⚠️
                  </span>
                </SlippageEmojiContainer>
              ) : null}
              <Input
                as={Input}
                ref={inputRef}
                placeholder={(rawSlippage / 100).toFixed(2)}
                value={slippageInput}
                onBlur={() => {
                  parseCustomSlippage({ target: { value: (rawSlippage / 100).toFixed(2) } } as any);
                }}
                onChange={parseCustomSlippage}
                color={!slippageInputIsValid ? 'red' : ''}
              />
              %
            </RowBetween>
          </OptionCustom>
        </RowBetween>
        {!!slippageError && (
          <RowBetween
            style={{
              fontSize: '14px',
              paddingTop: '7px',
              color: slippageError === SlippageError.InvalidInput ? 'red' : '#F3841E',
            }}
          >
            {slippageError === SlippageError.InvalidInput
              ? 'Enter a valid slippage percentage'
              : slippageError === SlippageError.RiskyLow
              ? 'Your transaction may fail'
              : 'Your transaction may be frontrun'}
          </RowBetween>
        )}
      </AutoColumn>
    </AutoColumn>
  );
}
