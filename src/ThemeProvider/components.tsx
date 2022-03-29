import styled from 'styled-components';
import { color, layout, grid, variant, ColorProps, LayoutProps, GridProps } from 'styled-system';

export interface Props extends ColorProps, LayoutProps, GridProps {
  children: React.ReactNode;
}

interface VariantProps {
  variant?: string;
}

interface TextProps extends ColorProps, VariantProps {
  children?: React.ReactNode;
}

// Typography
export const Text = styled.div<TextProps>`
  color: #333;
  ${color}
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

export const Head = styled.div`
  color: #333;
  font-weight: 700;
  ${color}
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
  ${grid}
  ${layout}
`;

export const Flex = styled.div`
  display: flex;
`;

// Buttons
