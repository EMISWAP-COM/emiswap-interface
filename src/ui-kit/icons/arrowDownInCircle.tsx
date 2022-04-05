import React, { FC, ReactElement } from 'react';
import IconWrapper, { IconWrapperInterface } from './iconWrapper';

export const ArrowDownInCircleIcon: FC<IconWrapperInterface> = ({
  width = '20',
  height = '20',
  color = '#FFFFFF',
  ...props
}): ReactElement => (
  <IconWrapper {...props} width={width} height={height} viewBoxSize="20">
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M10 17.5C14.1421 17.5 17.5 14.1421 17.5 10C17.5 5.85786 14.1421 2.5 10 2.5C5.85786 2.5 2.5 5.85786 2.5 10C2.5 14.1421 5.85786 17.5 10 17.5ZM7.20015 9.97352L9.23178 12.4115C9.63157 12.8912 10.3684 12.8912 10.7682 12.4115L12.7998 9.97352C13.3426 9.32219 12.8795 8.33333 12.0316 8.33333H7.96837C7.12054 8.33333 6.65738 9.32219 7.20015 9.97352Z"
      fill="currentColor"
    />
  </IconWrapper>
);
