import React from 'react';
import { ChangeEventHandler, ReactNode } from 'react';
import styled from 'styled-components';
import {
  border,
  BorderProps,
  color,
  ColorProps,
  layout,
  LayoutProps,
  shadow,
  ShadowProps,
  space,
  SpaceProps,
} from 'styled-system';
import { Input, Label } from 'ui-kit/components';

type CheckedType = 'radio' | 'checkbox';

interface CheckBoxInterface {
  children?: ReactNode;
  checked?: boolean;
  disabled?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  type: CheckedType;
  name?: string;
}

interface BoxInterface extends ColorProps, LayoutProps, BorderProps, SpaceProps, ShadowProps {}
const Box = styled.div<BoxInterface>`
  box-sizing: border-box;
  ${color}
  ${layout}
  ${border}
  ${space}
  ${shadow}

  :focus {
    box-shadow: 0 0 0 2px rgba(13, 223, 209, 0.516);
  }
`;

interface CheckInterface extends ColorProps, LayoutProps, BorderProps, SpaceProps {}
const Check = styled.div<CheckInterface>`
  ${color}
  ${layout}
  ${border}
  ${space}
`;

const CheckBox = ({
  children,
  checked = false,
  disabled,
  onChange,
  type,
  name,
}: CheckBoxInterface) => {
  const boxShadow = disabled ? '0 0 0 1px rgba(255, 255, 255, 0.15)' : '0 0 0 1px white';
  const bgColor = disabled ? 'rgba(255, 255, 255, 0.15)' : 'white';
  const boxRadius = type === 'checkbox' ? '5px' : '50%';
  const checkRadius = type === 'checkbox' ? '3px' : '50%';

  return (
    <Label alignItems="center" color="white">
      <Box role={type} boxShadow={boxShadow} borderRadius={boxRadius} size="15px" mr="8px">
        {checked && (
          <Check
            role={type}
            size={9}
            margin="3px"
            borderRadius={checkRadius}
            backgroundColor={bgColor}
          />
        )}
      </Box>
      <Input
        type={type}
        checked={checked}
        disabled={disabled}
        variant="hiddenInput"
        onChange={onChange}
        name={name}
      />
      {children}
    </Label>
  );
};

export default CheckBox;
