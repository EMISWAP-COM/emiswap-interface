import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { color, variant } from 'styled-system';
import { TextStyleTypes } from 'ThemeProvider/fonts';

interface TextStyleInterface {
  variant: TextStyleTypes;
}

interface FontInterface {
  textStyle?: TextStyleTypes;
  children: ReactNode;
  color?: string;
}
const Font = styled.p<TextStyleInterface>`
  ${color}
  ${variant({
    scale: 'textStyles',
  })}
`;

const Text = ({ textStyle, children, color = 'white' }: FontInterface) => (
  <Font variant={textStyle} color={color}>
    {children}
  </Font>
);

export default Text;
