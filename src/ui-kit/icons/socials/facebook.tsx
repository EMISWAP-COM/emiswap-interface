import React, { FC, ReactElement } from 'react';
import IconWrapper, { IconWrapperInterface } from '../iconWrapper';

export const FacebookIcon: FC<IconWrapperInterface> = ({
  width = '32',
  height = '32',
  ...props
}): ReactElement => (
  <IconWrapper {...props} width={width} height={height} viewBoxSize={'32'}>
    <rect width="32" height="32" rx="10" fill="white" fill-opacity="0.15" />
    <rect
      x="0.5"
      y="0.5"
      width="31"
      height="31"
      rx="9.5"
      stroke="url(#paint0_radial_177_6880)"
      stroke-opacity="0.2"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M26 16.0604C26 10.5047 21.5223 6 16 6C10.4777 6 6 10.5047 6 16.0604C6 21.0816 9.65625 25.2437 14.4375 25.9991V18.9694H11.8978V16.0604H14.4375V13.844C14.4375 11.323 15.9308 9.9294 18.2147 9.9294C19.3089 9.9294 20.4536 10.1261 20.4536 10.1261V12.6021H19.192C17.9504 12.6021 17.5621 13.3773 17.5621 14.1741V16.0604H20.3353L19.8924 18.9694H17.5625V26C22.3438 25.245 26 21.083 26 16.0604Z"
      fill="white"
    />
    <defs>
      <radialGradient
        id="paint0_radial_177_6880"
        cx="0"
        cy="0"
        r="1"
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(-19.5 -15) rotate(42.4664) scale(79.9812)"
      >
        <stop stop-color="white" />
        <stop offset="0.609995" stop-color="white" stop-opacity="0" />
      </radialGradient>
    </defs>
  </IconWrapper>
);
