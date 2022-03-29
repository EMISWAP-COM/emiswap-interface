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
        lineHeigh: 75,
      },
      mediumSora: {
        fontSize: 14,
      },
      defaultSora: {
        fontSize: 16,
      },
      largeSora: {
        fontSize: 18,
      },
      smallRubik: {
        fontSize: 12,
      },
      mediumRubik: {
        fontSize: 14,
      },
      defaultRubik: {
        fontSize: 16,
      },
      largeRubik: {
        fontSize: 18,
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
      },
      mediumSora: {
        fontSize: 32,
      },
      defaultSora: {
        fontSize: 40,
      },
      largeSora: {
        fontSize: 60,
      },
      smallRubik: {
        fontSize: 24,
      },
      mediumRubik: {
        fontSize: 32,
      },
      defaultRubik: {
        fontSize: 40,
      },
      largeRubik: {
        fontSize: 60,
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
