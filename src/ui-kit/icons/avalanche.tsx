import React, { FC, ReactElement } from 'react';
import IconWrapper, { IconWrapperInterface } from './iconWrapper';

export const AvalancheIcon: FC<IconWrapperInterface> = ({
  width = '32',
  height = '32',
  ...props
}): ReactElement => (
  <IconWrapper {...props} width={width} height={height} viewBoxSize="32">
    <rect width="32" height="32" rx="10" fill="white" fill-opacity="0.15" />
    <rect
      x="0.5"
      y="0.5"
      width="31"
      height="31"
      rx="9.5"
      stroke="url(#paint0_radial_24_857)"
      stroke-opacity="0.2"
    />
    <path
      d="M16 26C21.5228 26 26 21.5228 26 16C26 10.4772 21.5228 6 16 6C10.4772 6 6 10.4772 6 16C6 21.5228 10.4772 26 16 26Z"
      fill="#E84142"
    />
    <path
      d="M19.528 16.2598C19.8744 15.6614 20.4335 15.6614 20.7799 16.2598L22.9374 20.0472C23.2839 20.6456 23.0004 21.1338 22.3075 21.1338H17.961C17.276 21.1338 16.9925 20.6456 17.3311 20.0472L19.528 16.2598ZM15.3547 8.96847C15.7012 8.37005 16.2524 8.37005 16.5988 8.96847L17.0791 9.83461L18.213 11.8267C18.4886 12.3937 18.4886 13.063 18.213 13.6299L14.4098 20.2204C14.0634 20.7559 13.4886 21.0945 12.8508 21.1338H9.69331C9.0004 21.1338 8.71694 20.6535 9.06339 20.0472L15.3547 8.96847Z"
      fill="white"
    />
    <defs>
      <radialGradient
        id="paint0_radial_24_857"
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
