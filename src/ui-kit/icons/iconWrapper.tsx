import React, { ReactElement } from 'react';
import styled from 'styled-components';
import { color } from 'styled-system';

export interface IconWrapperInterface {
  onClick?: () => void;
  ariaLabel?: string;
  color?: string;
  width?: string | number;
  height?: string | number;
  dot?: string;
}

interface IconWrapper extends IconWrapperInterface {
  children: React.ReactNode;
  viewBoxSize: string;
}

const Wrapper = styled.div`
  ${color}
`;

const SVG = styled.svg``;

const IconWrapper = (props): ReactElement => {
  const { children, onClick, ariaLabel, viewBoxSize = '24', color = '#FFFFFF' } = props;
  return (
    <Wrapper {...props} color={color}>
      <SVG
        {...props}
        aria-label={ariaLabel}
        onClick={onClick}
        viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
        fill="none"
      >
        {children}
      </SVG>
    </Wrapper>
  );
};

export default IconWrapper;
