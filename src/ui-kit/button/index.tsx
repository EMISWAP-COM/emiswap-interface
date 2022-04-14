import React, { ReactElement, ReactNode } from 'react';
import styled from 'styled-components';
import { variant, border, color, system, BordersProps } from 'styled-system';
import { ButtonThemeType, ButtonSizeType, ButtonGradientType, Flex, Box } from 'ThemeProvider';
import { SpinnerIcon } from '../icons';

interface ButtonInterface {
  buttonType?: ButtonThemeType;
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
  buttonType = 'simple',
  ariaLabel,
  color = 'paper',
  onClick,
  disabled,
  icon,
  processing,
}: ButtonInterface): ReactElement => {
  return (
    <ButtonStyle
      aria-label={ariaLabel}
      variant={buttonType}
      size={buttonType === 'small' || buttonType === 'empty' ? 'small' : 'default'}
      color={disabled ? 'disabled' : color}
      background={processing ? 'empty' : ''}
      border={processing ? 'processing' : 'none'}
      onClick={disabled || processing ? undefined : onClick}
      disabled={disabled}
    >
      <Flex alignItems="center" justifyContent="center">
        {processing && (
          <Box pr="0.75rem">
            <SpinnerIcon width="17" height="17" color="white" />
          </Box>
        )}
        {icon && <Box pr={children ? '0.75rem' : '0rem'}>{icon}</Box>}
        {children}
      </Flex>
    </ButtonStyle>
  );
};

export default Button;
