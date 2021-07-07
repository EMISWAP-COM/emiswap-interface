import React, { useCallback } from 'react';
import styled from 'styled-components/macro';
import { escapeRegExp } from '../../../utils';

type NumericalInputProps = {
  value: string;
  onChange: (value: string) => void;
}

const StyledInput = styled.input`
  background: none;
  border: 0;
  outline: 0;
  padding: 0;
  width: 100%;
  font-size: 18px;
  color: ${({theme}) => theme.white};

  ::placeholder {
    color: ${({theme}) => theme.white};
  }
`;

const inputRegex = RegExp(`^[0-9]*(?:\\\\[.])?[0-9]{0,18}$`);

const NumericalInput: React.FC<NumericalInputProps> = (
  {
    value,
    onChange,
  }
) => {
  const inputChangeHandler = useCallback((value: string) => {
    const resultValue = value.replace(/,/g, '.');
    if (resultValue === '' || inputRegex.test(escapeRegExp(resultValue))) {
      onChange(resultValue);
    }
  }, [onChange]);

  return (
    <StyledInput
      value={value}
      onChange={event => {
        inputChangeHandler(event.target.value);
      }}
      inputMode="decimal"
      title="Token Amount"
      autoComplete="off"
      autoCorrect="off"
      type="text"
      pattern="^[0-9]*[.,]?[0-9]*$"
      placeholder={'0.0'}
      minLength={1}
      maxLength={79}
      spellCheck="false"
    />
  );
}

export default NumericalInput;
