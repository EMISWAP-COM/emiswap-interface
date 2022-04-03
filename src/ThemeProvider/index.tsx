import React from 'react';
import { ThemeProvider as BaseThemeProvider } from 'styled-components';
import theme from './theme';

const ThemeProvider = ({ children }) => (
  <BaseThemeProvider theme={theme}>{children}</BaseThemeProvider>
);

export default ThemeProvider;
export * from './components';
