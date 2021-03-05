import React from 'react';
import { ReactComponent as ReactLoader } from '../../assets/svg/lightcircle.svg';
import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const StyledSVG = styled(ReactLoader)<{ size: string; stroke?: string }>`
  animation: 2s ${rotate} linear infinite;
  height: ${({ size }) => size};
  width: ${({ size }) => size};
  path {
    stroke: ${({ stroke, theme }) => stroke ?? theme.green5};
  }
`;

/**
 * Takes in custom size and stroke for circle color, default to primary color as fill,
 * need ...rest for layered styles on top
 */
export default function SingleLoader({
  size = '16px',
  stroke = null,
  ...rest
}: {
  size?: string;
  stroke?: string;
}) {
  return <StyledSVG size={size} stroke={stroke} {...rest} />;
}
