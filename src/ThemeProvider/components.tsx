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
  BorderProps, typography,
} from 'styled-system';

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
export const Text = styled.div<TextProps>`
  color: #333;
  ${color};
  ${space};
  ${layout};
  ${typography};
  ${variant({
    variants: {
      smallSora: {
        fontSize: 12,
        lineHeight: '18px',
        fontFamily: 'Sora',
      },
      mediumSora: {
        fontSize: 14,
        lineHeight: '20px',
        fontFamily: 'Sora',
      },
      defaultSora: {
        fontSize: 16,
        lineHeight: '24px',
        fontFamily: 'Sora',
      },
      largeSora: {
        fontSize: 18,
        lineHeight: '24px',
        fontFamily: 'Sora',
      },
      smallRubik: {
        fontSize: 12,
        lineHeight: '18px',
        fontFamily: 'Rubik',
      },
      mediumRubik: {
        fontSize: 14,
        lineHeight: '20px',
        fontFamily: 'Rubik',
      },
      defaultRubik: {
        fontSize: 16,
        lineHeight: '24px',
        fontFamily: 'Rubik',
      },
      largeRubik: {
        fontSize: 18,
        lineHeight: '24px',
        fontFamily: 'Rubik',
      },
    },
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

export const Head = styled.div<TextProps>`
  color: #333;
  font-weight: 700;
  ${color};
  ${variant({
    variants: {
      smallSora: {
        fontSize: 24,
        lineHeight: '30px',
        fontFamily: 'Sora',
      },
      mediumSora: {
        fontSize: 32,
        lineHeight: '32px',
        fontFamily: 'Sora',
      },
      defaultSora: {
        fontSize: 40,
        lineHeight: '55px',
        fontFamily: 'Sora',
      },
      largeSora: {
        fontSize: 60,
        lineHeight: '75x',
        fontFamily: 'Sora',
      },
      smallRubik: {
        fontSize: 24,
        lineHeight: '30px',
        fontFamily: 'Rubik',
      },
      mediumRubik: {
        fontSize: 32,
        lineHeight: '32px',
        fontFamily: 'Rubik',
      },
      defaultRubik: {
        fontSize: 40,
        lineHeight: '55px',
        fontFamily: 'Rubik',
      },
      largeRubik: {
        fontSize: 60,
        lineHeight: '75px',
        fontFamily: 'Rubik',
      },
    },
  })}
`;
// Layout
export const Grid = styled.div<Props>`
  display: grid;
  ${space};
  ${grid};
  ${layout};
  ${color};
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
