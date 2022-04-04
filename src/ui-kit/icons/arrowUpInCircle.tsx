import React, { FC, ReactElement } from 'react';
import IconWrapper, { IconWrapperInterface } from './iconWrapper';

export const ArrowUpInCircleIcon: FC<IconWrapperInterface> = ({
  width = '20',
  height = '20',
  ...props
}): ReactElement => (
  <IconWrapper {...props} width={width} height={height} viewBoxSize="20">
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M10 2.5C5.85787 2.5 2.5 5.85786 2.5 10C2.5 14.1421 5.85786 17.5 10 17.5C14.1421 17.5 17.5 14.1421 17.5 10C17.5 5.85786 14.1421 2.5 10 2.5ZM12.7998 10.0265L10.7682 7.58853C10.3684 7.10878 9.63158 7.10878 9.23178 7.58853L7.20015 10.0265C6.65738 10.6778 7.12054 11.6667 7.96838 11.6667L12.0316 11.6667C12.8795 11.6667 13.3426 10.6778 12.7998 10.0265Z"
      fill="currentColor"
    />
  </IconWrapper>
);
