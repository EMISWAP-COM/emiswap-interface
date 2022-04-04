import React, { FC, ReactElement } from 'react';
import IconWrapper, { IconWrapperInterface } from './iconWrapper';

export const InfoIcon: FC<IconWrapperInterface> = ({
  width = '20',
  height = '20',
  ...props
}): ReactElement => (
  <IconWrapper {...props} width={width} height={height} viewBoxSize="20">
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M17.5 10C17.5 14.1421 14.1421 17.5 10 17.5C5.85786 17.5 2.5 14.1421 2.5 10C2.5 5.85786 5.85786 2.5 10 2.5C14.1421 2.5 17.5 5.85786 17.5 10ZM10.8333 6.66667C10.8333 7.1269 10.4602 7.5 10 7.5C9.53976 7.5 9.16667 7.1269 9.16667 6.66667C9.16667 6.20643 9.53976 5.83333 10 5.83333C10.4602 5.83333 10.8333 6.20643 10.8333 6.66667ZM11 14.1667V9.16667H9V14.1667H11Z"
      fill="currentColor"
      fill-opacity="0.7"
    />
  </IconWrapper>
);
