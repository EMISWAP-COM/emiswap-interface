import React, { useState } from 'react';
import styled from 'styled-components/macro';
import RadioButton from './RadioButton';

const StyledRadioGroup = styled.div`
  display: flex;
`;

type ListValue = {
  identifier: string,
  value: string,
}

type RadioGroupProps = {
  buttonsList: ListValue[],
  groupName: string,
  value: string,
  onChange: (value: string) => void,
}

const RadioGroup: React.FC<RadioGroupProps> = (
  {
    buttonsList,
    groupName,
    value,
    onChange,
  }
) => {
  const [checkedIdentifier, setCheckedIdentifier] = useState(value || '');

  const handleRadioChange = (identifier: string) => {
    setCheckedIdentifier(identifier);
    onChange(identifier);
  };

  return (
    <StyledRadioGroup>
      {buttonsList.map(({identifier, value}) =>
        <RadioButton
          name={groupName}
          key={identifier}
          identifier={identifier}
          value={value}
          isChecked={checkedIdentifier === identifier}
          onChange={handleRadioChange}
        />
      )}
    </StyledRadioGroup>
  )
}

export default RadioGroup;
