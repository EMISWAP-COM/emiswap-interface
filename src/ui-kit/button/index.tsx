import React, { ReactElement, ReactNode } from 'react';
import styled from 'styled-components';
import { variant, border, color, system, BordersProps } from 'styled-system';
import { ButtonThemeType, ButtonSizeType, ButtonGradientType, Flex, Box } from 'ThemeProvider';
import { SpinnerIcon } from '../icons';

export const enum ButtonType {
  simple = 'simple',
  gradient = 'gradient',
  small = 'small',
  alert = 'alert',
  cancel = 'cancel',
}

interface ButtonInterface {
  buttonType?: ButtonType;
  children?: ReactNode;
  ariaLabel?: string;
  color?: string;
  onClick?: () => void;
  disabled?: boolean;
  icon?: ReactElement;
  processing?: boolean;
}

interface ButtonStyle extends BordersProps {
  variant: ButtonThemeType;
  size: ButtonSizeType;
  background: ButtonGradientType | '';
}

const ButtonStyle = styled.button<ButtonStyle>`
  ${color}
  ${border}
  ${variant({
    scale: 'buttons',
  })};
  ${system({
    size: {
      property: 'height',
      scale: 'buttonSize',
    },
    background: {
      property: 'background',
      scale: 'gradients',
    },
  })}
`;

const Button = ({
  children,
  buttonType = ButtonType.simple,
  ariaLabel,
  color = 'text',
  onClick,
  disabled,
  icon,
  processing,
}: ButtonInterface): ReactElement => {
  return (
    <ButtonStyle
      aria-label={ariaLabel}
      variant={icon ? 'icon' : buttonType}
      size={buttonType === ButtonType.small ? 'small' : 'default'}
      color={disabled ? 'disabled' : color}
      background={processing ? 'empty' : ''}
      border={processing ? 'processing' : 'none'}
      onClick={disabled || processing ? undefined : onClick}
      disabled={disabled}
    >
      <Flex alignItems="center" justifyContent="center" width="max-content">
        {processing && (
          <Box pr="12px">
            <SpinnerIcon width="17" height="17" color="white" />
          </Box>
        )}
        {icon && <Box pr="12px">{icon}</Box>}
        {children}
      </Flex>
    </ButtonStyle>
  );
};

export default Button;
