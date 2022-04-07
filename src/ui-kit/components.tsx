import { ChangeEventHandler } from 'react';
import styled, { css } from 'styled-components';
import {
  color,
  ColorProps,
  flexbox,
  FlexboxProps,
  layout,
  LayoutProps,
  space,
  SpaceProps,
  variant,
} from 'styled-system';
import { HeaderStyleTypes, TextStyleTypes } from 'ThemeProvider/fonts';
import { InputStylesType } from '../ThemeProvider/theme';

interface TextStyleInterface extends ColorProps, LayoutProps, SpaceProps {
  variant: TextStyleTypes;
}
interface HeaderStyleInterface extends ColorProps, LayoutProps, SpaceProps {
  variant: HeaderStyleTypes;
}

export const Text = styled.span<TextStyleInterface>`
    ${color}
    ${layout}
    ${space}
    ${variant({
      scale: 'textStyles',
    })}
  `;

export const Header = styled.header<HeaderStyleInterface>`
  ${color}
  ${layout}
  ${space}
  ${variant({
    scale: 'headerStyles',
  })}
`;

interface LabelInterface extends ColorProps, FlexboxProps {}
export const Label = styled.label<LabelInterface>`
  display: flex;
  ${css({
    cursor: 'pointer',
    userSelect: 'none',
  })}
  ${flexbox}
  ${color}
`;

interface InputInterface {
  variant: InputStylesType;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}

export const Input = styled.input<InputInterface>`
  ${variant({
    scale: 'InputStyles',
  })}
`;
