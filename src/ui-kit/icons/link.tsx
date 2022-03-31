import React, { FC, ReactElement } from 'react';
import IconWrapper, { IconWrapperInterface } from './iconWrapper';

export const LinkIcon: FC<IconWrapperInterface> = ({
  width = '24',
  height = '24',
  ...props
}): ReactElement => (
  <IconWrapper {...props} width={width} height={height} viewBoxSize="24">
    <path
      d="M10 16H7C4.79086 16 3 14.2091 3 12V12C3 9.79086 4.79086 8 7 8H10"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M16 12H8"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M14 16H17C19.2091 16 21 14.2091 21 12V12C21 9.79086 19.2091 8 17 8H14"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </IconWrapper>
);
