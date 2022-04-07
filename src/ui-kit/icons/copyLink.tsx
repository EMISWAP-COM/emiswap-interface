import React from 'react';
import { FC, ReactElement } from 'react';
import IconWrapper, { IconWrapperInterface } from './iconWrapper';

export const CopyLink: FC<IconWrapperInterface> = ({
  width = '20',
  height = '20',
  ...props
}): ReactElement => (
  <IconWrapper {...props} width={width} height={height} viewBoxSize="20">
    <path
      d="M11.6666 5.83325V5.83325C11.6666 5.3686 11.6666 5.13627 11.6282 4.94307C11.4703 4.14969 10.8501 3.52949 10.0568 3.37168C9.86357 3.33325 9.63124 3.33325 9.16658 3.33325H7.33325C5.44763 3.33325 4.50482 3.33325 3.91904 3.91904C3.33325 4.50482 3.33325 5.44763 3.33325 7.33325V9.16658C3.33325 9.63124 3.33325 9.86357 3.37168 10.0568C3.52949 10.8501 4.14969 11.4703 4.94307 11.6282C5.13627 11.6666 5.3686 11.6666 5.83325 11.6666V11.6666"
      stroke="currentColor"
      stroke-width="2"
    />
    <rect
      x="8.33325"
      y="8.33325"
      width="8.33333"
      height="8.33333"
      rx="2"
      stroke="currentColor"
      stroke-width="2"
    />
  </IconWrapper>
);
