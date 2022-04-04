import React, { FC, ReactElement } from 'react';
import IconWrapper, { IconWrapperInterface } from './iconWrapper';

export const ArrowUpIcon: FC<IconWrapperInterface> = ({
  width = '10',
  height = '10',
  ...props
}): ReactElement => (
  <IconWrapper {...props} width={width} height={height} viewBoxSize="10">
    <path
      d="M5.76822 1.92186L8.63318 5.35982C9.17595 6.01114 8.7128 7 7.86496 7L2.13504 7C1.2872 7 0.824046 6.01114 1.36682 5.35982L4.23178 1.92186C4.63157 1.44211 5.36843 1.44211 5.76822 1.92186Z"
      fill="currentColor"
    />
  </IconWrapper>
);
