import { FlattenSimpleInterpolation, ThemedCssFunction } from 'styled-components';

export type Color = string;
export interface Colors {
  // base
  white: Color;
  black: Color;

  // text
  text1: Color;
  text2: Color;
  text3: Color;
  text4: Color;
  text5: Color;

  // backgrounds / greys
  bg1: Color;
  bg2: Color;
  bg3: Color;
  bg4: Color;
  bg5: Color;

  modalBG: Color;
  advancedBG: Color;
  cardBG: Color;

  //blues
  primary1: Color;
  primary2: Color;
  primary3: Color;
  primary4: Color;
  primary5: Color;

  primaryText1: Color;

  // pinks
  secondary1: Color;
  secondary2: Color;
  secondary3: Color;

  // other
  grey1: Color;
  grey2: Color;
  grey3: Color;
  grey4: Color;
  grey5: Color;
  grey6: Color;
  red1: Color;
  red2: Color;
  red3: Color;
  green1: Color;
  green2: Color;
  green3: Color;
  green4: Color;
  green5: Color;
  yellow1: Color;
  yellow2: Color;
  yellow3: Color;
  yellow4: Color;
  horse: Color;
  whiteTransparent: Color;
  purple: Color;
  purpleBoxShadow: Color;
  darkWhite: Color;
  darkText: Color;
  darkGrey: Color;
  lightGrey: Color;
  red: Color;
  green: Color;
  pink: Color;
  blue: Color;
  border1: Color;
  border1Transparency: Color;
  border2: Color;
  dark1: Color;
  dark2: Color;
  dark1BoxShadow: Color;
  modalBoxShadow: Color;
}

export interface Grids {
  sm: number;
  md: number;
  lg: number;
}

