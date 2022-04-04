import React from 'react';
import { createGlobalStyle, ThemeProvider as BaseThemeProvider } from 'styled-components';
import theme from './theme';
import RubikRegular from './fonts/Rubik-Regular.ttf';
import RubikMedium from './fonts/Rubik-Medium.ttf';
import RubikBold from './fonts/Rubik-Bold.ttf';
import SoraSemiBold from './fonts/Sora-SemiBold.ttf';
import SoraBold from './fonts/Sora-Bold.ttf';

const FontFace = createGlobalStyle`
  @font-face {
   font-family: 'RubikRegular';
   src: url(${RubikRegular}) format('truetype');
   font-style: normal;
   }

   @font-face {
   font-family: 'RubikMedium';
   src: url(${RubikMedium}) format('truetype');
   font-style: normal;
   }

   @font-face {
   font-family: 'RubikBold';
   src: url(${RubikBold}) format('truetype');
   font-style: normal;
   }
  
   @font-face {
   font-family: 'SoraSemiBold';
   src: url(${SoraSemiBold}) format('truetype');
   font-style: normal;
   }

   @font-face {
   font-family: 'SoraBold';
   src: url(${SoraBold}) format('truetype');
   font-style: normal;
   }
`;
const ThemeProvider = ({ children }) => (
  <BaseThemeProvider theme={theme}>
    <FontFace />
    {children}
  </BaseThemeProvider>
);

export default ThemeProvider;
export * from './components';
export * from './theme';
