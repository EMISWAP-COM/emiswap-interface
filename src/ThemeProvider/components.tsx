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
  TypographyProps,
  system,
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

// Typography
interface TextStyleInterface extends ColorProps, LayoutProps, SpaceProps, FlexboxProps {
  variant: TextStyleTypes;
}
interface HeadStyleInterface extends ColorProps, LayoutProps, SpaceProps, TypographyProps {
  variant: HeaderStyleTypes;
}

export const Text = styled.span<TextStyleInterface>`
    ${color}
    ${layout}
    ${space}
    ${flexbox}
    ${variant({
      scale: 'textStyles',
    })}
  `;

export const Head = styled.header<HeadStyleInterface>`
  ${color}
  ${layout}
  ${space}
  ${typography}
  ${variant({
    scale: 'headerStyles',
  })}
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
  ${flexbox};
  ::-webkit-scrollbar {
    display: none;
  }
`;
export const Flex = styled.div<Props>`
  display: flex;
  ${system({
    background: {
      property: 'background',
      scale: 'backgrounds',
    },
  })}
  ${color};
  ${space};
  ${layout};
  ${flexbox};
  ${layout};
  ${border};
  ${position};
  ${background};
  ${shadow};
  ::-webkit-scrollbar {
    display: none;
  }
`;

export const Box = styled.div<Props>`
  ${system({
    background: {
      property: 'background',
      scale: 'backgrounds',
    },
  })}
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
  ${grid}
  ${space}
`;

export const Img = styled.img``;

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
