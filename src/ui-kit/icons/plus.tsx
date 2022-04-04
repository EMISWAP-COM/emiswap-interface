import React, { FC, ReactElement } from 'react';
import IconWrapper, { IconWrapperInterface } from './iconWrapper';

export const PlusIcon: FC<IconWrapperInterface> = ({
  width = '20',
  height = '20',
  color = 'statusGreen',
  ...props
}): ReactElement => (
  <IconWrapper {...props} width={width} height={height} color={color} viewBoxSize="20">
    <g clip-path="url(#clip0_24_917)">
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M15.3033 15.3033C12.3744 18.2323 7.62563 18.2323 4.6967 15.3033C1.76777 12.3744 1.76777 7.62567 4.6967 4.69673C7.62563 1.7678 12.3744 1.7678 15.3033 4.69673C18.2322 7.62567 18.2322 12.3744 15.3033 15.3033ZM9 11H5.28595L5.28595 9.00003L9 9.00004L9 5.28599H11L11 9.00004L14.714 9.00003L14.714 11H11V14.7141H9V11Z"
        fill="#37FF9F"
      />
    </g>
    <defs>
      <clipPath id="clip0_24_917">
        <rect width="20" height="20" fill="white" />
      </clipPath>
    </defs>
  </IconWrapper>
);
