import React from 'react';
import { ThemeProvider as BaseThemeProvider } from 'styled-components';
import { ColorProps, LayoutProps, GridProps } from 'styled-system';
import theme from './theme';

export interface Props extends ColorProps, LayoutProps, GridProps {
  children: React.ReactNode;
}

const ThemeProvider = ({ children }) => (
  <BaseThemeProvider theme={theme}>{children}</BaseThemeProvider>
);

export default ThemeProvider;
export * from './components';
