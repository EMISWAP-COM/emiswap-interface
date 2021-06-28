import React from 'react';
import styled from 'styled-components/macro';

const StyledButton = styled.button<{ isDisabled: boolean }>`
  display: block;
  background-color: ${({theme, isDisabled}) => isDisabled ? 'transparent' : theme.purple};
  border: 1px solid ${({theme, isDisabled}) => isDisabled ? theme.white : theme.purple};
  border-radius: 8px;
  font-size: 16px;
  height: 54px;
  color: ${({theme}) => theme.white};
  width: 100%;
  cursor: ${({isDisabled}) => isDisabled ? 'default' : 'pointer'};
  transition: box-shadow 0.3s;

  &:hover,
  &:focus {
    ${({theme, isDisabled}) => !isDisabled && `box-shadow: ${theme.purpleBoxShadow};`}

  }
`;

type ButtonProps = {
  onClick?: () => void;
  isDisabled?: boolean;
}

const Button: React.FC<ButtonProps> = (
  {
    children,
    onClick,
    isDisabled,
  }
) => {
  return <StyledButton onClick={isDisabled ? undefined : onClick} isDisabled={isDisabled}>{children}</StyledButton>;
};

export default Button;
