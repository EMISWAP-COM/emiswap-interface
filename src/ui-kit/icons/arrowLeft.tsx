import React, { FC, ReactElement } from 'react';
import IconWrapper, { IconWrapperInterface } from './iconWrapper';

export const ArrowLeftIcon: FC<IconWrapperInterface> = ({
  width = '10',
  height = '10',
  ...props
}): ReactElement => (
  <IconWrapper {...props} width={width} height={height} viewBoxSize="10">
    <path
      d="M1.92186 4.23178L5.35982 1.36682C6.01114 0.824048 7 1.2872 7 2.13504L7 7.86496C7 8.7128 6.01114 9.17595 5.35982 8.63318L1.92187 5.76822C1.44211 5.36843 1.44211 4.63157 1.92186 4.23178Z"
      fill="currentColor"
    />
  </IconWrapper>
);
