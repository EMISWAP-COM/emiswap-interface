import React, { FC, ReactElement } from 'react';
import IconWrapper, { IconWrapperInterface } from './iconWrapper';

export const ArrowRightIcon: FC<IconWrapperInterface> = ({
  width = '10',
  height = '10',
  ...props
}): ReactElement => (
  <IconWrapper {...props} width={width} height={height} viewBoxSize="10">
    <path
      d="M8.07814 5.76822L4.64018 8.63318C3.98886 9.17595 3 8.7128 3 7.86496L3 2.13504C3 1.2872 3.98886 0.824046 4.64018 1.36682L8.07813 4.23178C8.55789 4.63157 8.55789 5.36843 8.07814 5.76822Z"
      fill="currentColor"
    />
  </IconWrapper>
);
