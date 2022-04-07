import styled from 'styled-components';
import {
  color,
  layout,
  grid,
  variant,
  space,
  flexbox,
  shadow,
  border,
  position,
  background,
  ColorProps,
  LayoutProps,
  GridProps,
  SpaceProps,
  BackgroundProps,
  FlexboxProps,
  PositionProps,
  ShadowProps,
  BorderProps,
  typography,
} from 'styled-system';
import { HeaderStyleTypes, TextStyleTypes } from './fonts';

export interface Props
  extends ColorProps,
    LayoutProps,
    GridProps,
    BackgroundProps,
    SpaceProps,
    PositionProps,
    ShadowProps,
    BorderProps,
    FlexboxProps {
  children?: React.ReactNode;
}

interface VariantProps {
  variant?: string;
}

interface TextProps extends ColorProps, VariantProps, LayoutProps, SpaceProps {
  children?: React.ReactNode;
}

// Typography
interface TextStyleInterface extends ColorProps, LayoutProps, SpaceProps {
  variant: TextStyleTypes;
}
interface HeadStyleInterface extends ColorProps, LayoutProps, SpaceProps {
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

export const Head = styled.header<HeadStyleInterface>`
  ${color}
  ${layout}
  ${space}
  ${variant({
    scale: 'headerStyles',
  })}
`;

export const StyledHead = styled.div`
  font-weight: bold;
  font-size: 40px;
  font-family: 'Sora';
  line-height: 50px;
  background-color: #f3ec78;
  background-image: linear-gradient(45deg, #b7e1ff, #8128cc);
  background-size: 100%;
  -webkit-background-clip: text;
  -moz-background-clip: text;
  -webkit-text-fill-color: transparent;
  -moz-text-fill-color: transparent;
`;

export const StyledText = styled.div`
  font-weight: 600;
  font-size: 24px;
  font-family: 'Rubik';
  line-height: 34px;
  background-color: #f3ec78;
  background-image: linear-gradient(45deg, #b7e1ff, #8128cc);
  background-size: 100%;
  -webkit-background-clip: text;
  -moz-background-clip: text;
  -webkit-text-fill-color: transparent;
  -moz-text-fill-color: transparent;
`;

// Layout
export const Grid = styled.div<Props>`
  display: grid;
  ${space};
  ${grid};
  ${layout};
  ${color};
  ${position};
  ${border};
`;
export const Flex = styled.div<Props>`
  display: flex;
  ${color};
  ${space};
  ${layout};
  ${flexbox};
  ${layout};
  ${border};
  ${position}
`;

export const Box = styled.div<Props>`
  ${space};
  ${layout};
  ${color};
  ${background};
  ${border};
  ${position};
  ${shadow};
`;

export const Image = styled.div<Props>`
  ${background};
  ${layout};
`;

export const SVG = styled.div<Props>`
  ${background};
  ${space};
  ${layout};
`;

// Buttons

export const Button = styled.button<Props>`
  ${space};
  ${border};
  ${typography};
  ${color};
  ${background};
`;
