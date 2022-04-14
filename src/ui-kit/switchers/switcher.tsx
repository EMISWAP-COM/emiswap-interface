import { ChangeEventHandler } from 'react';
import styled from 'styled-components';
import {
  border,
  BorderProps,
  color,
  ColorProps,
  layout,
  LayoutProps,
  space,
  SpaceProps,
  typography,
  TypographyProps,
  variant,
} from 'styled-system';
import { ToggleStylesType } from '../../ThemeProvider/theme';
import React from 'react';
import { Input, Label } from 'ui-kit/components';
import { Box, Flex } from 'ThemeProvider/components';

interface SwitcherInterface {
  firstLabel: string;
  secondLabel: string;
  checked?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}

interface ToggleInterface
  extends SpaceProps,
    ColorProps,
    BorderProps,
    LayoutProps,
    TypographyProps {
  variant: ToggleStylesType;
}

const Toggle = styled.div<ToggleInterface>`
  ${space}
  ${color}
  ${border}
  ${layout}
  ${typography}
  ${variant({
    scale: 'ToggleStyles',
  })}
`;

const Switcher = ({ firstLabel, secondLabel, checked, onChange }: SwitcherInterface) => {
  return (
    <Label>
      <Box
        borderRadius="50px"
        bg="rgba(255, 255, 255, 0.1)"
        color="paper"
        role="checkbox"
        minWidth="228px"
      >
        <Flex justifyContent="center" alignItems="center">
          <Toggle
            role="checkbox"
            aria-checked={checked}
            variant={checked ? 'inactive' : 'active'}
            width="48%"
          >
            {firstLabel}
          </Toggle>
          <Toggle
            role="checkbox"
            aria-checked={checked}
            variant={checked ? 'active' : 'inactive'}
            width="52%"
          >
            {secondLabel}
          </Toggle>
        </Flex>
      </Box>
      <Input type="checkbox" variant="hiddenInput" onChange={onChange} checked={checked} />
    </Label>
  );
};

export default Switcher;
