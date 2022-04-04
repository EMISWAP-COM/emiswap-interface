import React, { FC, ReactElement } from 'react';
import styled, { keyframes } from 'styled-components';
import { IconWrapperInterface } from './iconWrapper';

interface SpinnerInterface {
  width?: string;
  height?: string;
  color?: string;
}
const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;
const Spinner = styled.div<{ width: string; height: string; color: string }>`
  animation: ${rotate360} 1.1s cubic-bezier(0.83, 0, 0.17, 1) infinite;
  transform: translateZ(0);
  border-radius: 50%;

  border-top: 3px solid transparent;
  border-right: 3px solid transparent;
  border-bottom: 3px solid transparent;
  border-left: 3px solid ${props => props.color};
  background: transparent;
  width: ${props => props.width + 'px'};
  height: ${props => props.height + 'px'};
`;
export const SpinnerIcon: FC<SpinnerInterface> = ({
  width = '27',
  height = '27',
  color = '#37ff9f',
}): ReactElement => <Spinner color={color} width={width} height={height} />;
