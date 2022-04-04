import React, { FC, ReactElement } from 'react';
import IconWrapper, { IconWrapperInterface } from './iconWrapper';

export const ArrowDownIcon: FC<IconWrapperInterface> = ({
  width = '10',
  height = '10',
  ...props
}): ReactElement => (
  <IconWrapper {...props} width={width} height={height} viewBoxSize="10">
    <path
      d="M4.23178 8.07814L1.36682 4.64018C0.824048 3.98886 1.2872 3 2.13504 3H7.86496C8.7128 3 9.17595 3.98886 8.63318 4.64018L5.76822 8.07813C5.36843 8.55789 4.63157 8.55789 4.23178 8.07814Z"
      fill="currentColor"
    />
  </IconWrapper>
);
