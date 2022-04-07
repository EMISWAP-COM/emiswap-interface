import React from 'react';
import { ChangeEventHandler, ReactElement } from 'react';
import styled from 'styled-components';
import {
  layout,
  LayoutProps,
  space,
  color,
  ColorProps,
  border,
  BorderProps,
  SpaceProps,
  FlexboxProps,
  flexbox,
} from 'styled-system';
import { Input, Label } from 'ui-kit/components';

interface ToggleProps extends LayoutProps, SpaceProps, ColorProps, BorderProps, FlexboxProps {}
const ToggleTrack = styled.div<ToggleProps>`
  display: flex;
  ${space}
  ${color}
  ${layout}
  ${border}
  ${flexbox}

  &[aria-checked="true"] {
    background-color: rgba(55, 255, 159, 0.3);
  }
`;

const Toggle = styled.div<ToggleProps>`
  transition-duration: 0.3s;
  ${color}
  ${layout}
  ${border}
  ${space}

  &[aria-checked="true"] {
    transition-duration: 0.3s;
    transform: translateX(100%);
  }
`;

interface SwitchInterface {
  checked?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  disabled?: boolean;
}
const SmallSwitcher = ({ checked, onChange, disabled }: SwitchInterface): ReactElement => {
  const disabledBC = disabled ? 'rgba(255, 255, 255, 0.5)' : 'paper';

  return (
    <Label>
      <ToggleTrack
        role="checkbox"
        aria-checked={checked}
        alignItems="center"
        width={48}
        height={24}
        bg="empty"
        my="2px"
        border="1px solid paper"
        borderRadius="12px"
        borderColor={disabledBC}
      >
        <Toggle
          role="checkbox"
          aria-checked={checked}
          size={21}
          m="2px"
          bg={disabledBC}
          borderRadius="50%"
        />
      </ToggleTrack>
      <Input
        type="checkbox"
        checked={checked}
        onChange={!disabled ? onChange : undefined}
        aria-checked={checked}
        variant="hiddenInput"
      />
    </Label>
  );
};

export default SmallSwitcher;
