import React, { FC, ReactElement } from 'react';
import IconWrapper, { IconWrapperInterface } from './iconWrapper';

export const ErrorStatusIcon: FC<IconWrapperInterface> = ({
  width = '32',
  height = '32',
  color = 'statusRed',
  ...props
}): ReactElement => (
  <IconWrapper {...props} width={width} height={height} viewBoxSize="32" color={color}>
    <circle cx="16" cy="16" r="14" stroke="white" stroke-opacity="0.2" stroke-width="4" />
    <circle cx="16" cy="16" r="16" fill="currentColor" />
    <path
      d="M11.1162 21.8835L20.9998 12"
      stroke="#1B1B1F"
      stroke-width="2"
      stroke-linecap="round"
    />
    <path
      d="M20.8838 21.8835L11.0002 12"
      stroke="#1B1B1F"
      stroke-width="2"
      stroke-linecap="round"
    />
  </IconWrapper>
);
