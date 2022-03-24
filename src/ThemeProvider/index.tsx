import React from 'react';
import { ThemeProvider as BaseThemeProvider } from 'styled-components';
import { ColorProps, LayoutProps, WidthProps } from 'styled-system';
import theme from './theme';

export interface Props extends ColorProps, LayoutProps, WidthProps {
  children: React.ReactNode;
}

const ThemeProvider = ({ children }) => (
  <BaseThemeProvider theme={theme}>{children}</BaseThemeProvider>
);

export default ThemeProvider;
