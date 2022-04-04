import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { color, variant } from 'styled-system';
import { HeaderStyleTypes } from 'ThemeProvider/fonts';

interface HeaderStyleInterface {
  variant: HeaderStyleTypes;
}

interface FontInterface {
  headerStyle: HeaderStyleTypes;
  children: ReactNode;
  color?: string;
}
const Font = styled.div<HeaderStyleInterface>`
  ${color}
  ${variant({
    scale: 'headerStyles',
  })}
`;

const HeadeFontStyle = ({ headerStyle, children, color = 'white' }: FontInterface) => (
  <Font variant={headerStyle} color={color}>
    {children}
  </Font>
);

export default HeadeFontStyle;
