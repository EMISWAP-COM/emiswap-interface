import React from 'react';
import styled from 'styled-components/macro';

const StyledNativeRadio = styled.input`
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  cursor: inherit;
  margin: 0;
  padding: 0;
  opacity: 0;
  z-index: 1;
  position: absolute;
`;

const StyledRadioButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-right: 17px;
`;

const StyledRadioButton = styled.div`
  width: 24px;
  height: 24px;
  border: 1px solid ${({theme}) => theme.lightGrey};
  border-radius: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledRadioButtonBullet = styled.div<{isVisible: boolean}>`
  width: 16px;
  height: 16px;
  border-radius: 100%;
  background-color: ${({theme}) => theme.blue};

  opacity: ${props => props.isVisible ? 1 : 0}
`;

const StyledRadioButtonLabel = styled.label`
  font-size: 12px;
  padding-left: 16px;
  color: ${({theme}) => theme.white};
  text-transform: uppercase;
`;

type RadioButtonProps = {
  name: string,
  identifier: string,
  value: string,
  isChecked: boolean,
  onChange: (key: string) => void,
}

const RadioButton: React.FC<RadioButtonProps> = (
  {
    name,
    identifier,
    value,
    isChecked,
    onChange,
  }
) => {
  const handleNativeRadioChange = () => {
    onChange(identifier);
  };

  return (
    <StyledRadioButtonWrapper>
      <StyledRadioButton>
        <StyledNativeRadio
          type="radio"
          id={identifier}
          name={name}
          value={value}
          onChange={handleNativeRadioChange}
        />
        <StyledRadioButtonBullet data-test-id="bullet" isVisible={isChecked} />
      </StyledRadioButton>
      <StyledRadioButtonLabel htmlFor={identifier} data-test-id="label">{value}</StyledRadioButtonLabel>
    </StyledRadioButtonWrapper>
  )
}

export default RadioButton;
