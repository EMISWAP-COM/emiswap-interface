import React, { FC, ReactElement } from 'react';
import IconWrapper, { IconWrapperInterface } from './iconWrapper';

export const MinusIcon: FC<IconWrapperInterface> = ({
  width = '20',
  height = '20',
  color = 'statusRed',
  ...props
}): ReactElement => (
  <IconWrapper {...props} width={width} height={height} color={color} viewBoxSize="20">
    <g clip-path="url(#clip0_24_918)">
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M4.6967 15.3033C7.62563 18.2323 12.3744 18.2323 15.3033 15.3033C18.2322 12.3744 18.2322 7.62567 15.3033 4.69673C12.3744 1.7678 7.62563 1.7678 4.6967 4.69673C1.76777 7.62567 1.76777 12.3744 4.6967 15.3033ZM5.28595 11H14.714L14.714 9.00003H5.28595L5.28595 11Z"
        fill="currentColor"
      />
    </g>
    <defs>
      <clipPath id="clip0_24_918">
        <rect width="20" height="20" fill="white" />
      </clipPath>
    </defs>
  </IconWrapper>
);
