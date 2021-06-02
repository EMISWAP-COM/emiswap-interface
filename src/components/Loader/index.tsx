import React from 'react';
import { ReactComponent as ReactLoader } from '../../assets/svg/loader.svg';
import styled from 'styled-components';

const StyledSVG = styled(ReactLoader)<{ size: string; stroke?: string }>`
  height: ${({ size }) => size};
  width: ${({ size }) => size};
`;

/**
 * Takes in custom size and stroke for circle color, default to primary color as fill,
 * need ...rest for layered styles on top
 */
export default function Loader({
  size = '16px',
  stroke = undefined,
  ...rest
}: {
  size?: string;
  stroke?: string;
}) {
  return <StyledSVG size={size} stroke={stroke} {...rest} />;
}
