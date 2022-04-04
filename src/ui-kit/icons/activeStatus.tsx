import React, { FC, ReactElement } from 'react';
import IconWrapper, { IconWrapperInterface } from './iconWrapper';

export const ActiveStatusIcon: FC<IconWrapperInterface> = ({
  width = '32',
  height = '32',
  color = 'statusGreen',
  ...props
}): ReactElement => (
  <IconWrapper {...props} width={width} height={height} viewBoxSize="32" color={color}>
    <circle cx="16" cy="16" r="14" stroke="white" stroke-opacity="0.2" stroke-width="4" />
    <circle cx="16" cy="16" r="16" fill="#37FF9F" />
    <path
      d="M10 16.1628L14.1959 20.3062C14.5854 20.6908 15.2117 20.6908 15.6012 20.3062L23 13"
      stroke="#1B1B1F"
      stroke-width="2"
      stroke-linecap="round"
    />
  </IconWrapper>
);
