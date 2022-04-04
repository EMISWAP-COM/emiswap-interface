import React, { FC, ReactElement } from 'react';
import IconWrapper, { IconWrapperInterface } from './iconWrapper';

export const LETHIcon: FC<IconWrapperInterface> = ({
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
      stroke="url(#paint0_radial_24_847)"
      stroke-opacity="0.2"
    />
    <path
      d="M16 26C21.5228 26 26 21.5228 26 16C26 10.4772 21.5228 6 16 6C10.4772 6 6 10.4772 6 16C6 21.5228 10.4772 26 16 26Z"
      fill="#627EEA"
    />
    <path
      d="M16.0867 9.75L16.0029 10.0348V18.3002L16.0867 18.3839L19.9234 16.116L16.0867 9.75Z"
      fill="white"
      fill-opacity="0.602"
    />
    <path d="M16.0867 9.75L12.25 16.116L16.0867 18.3839V14.3721V9.75Z" fill="white" />
    <path
      d="M16.0863 19.1085L16.0391 19.1661V22.1104L16.0863 22.2483L19.9253 16.8418L16.0863 19.1085Z"
      fill="white"
      fill-opacity="0.602"
    />
    <path d="M16.0867 22.2483V19.1085L12.25 16.8418L16.0867 22.2483Z" fill="white" />
    <path d="M16.0879 18.3838L19.9245 16.1159L16.0879 14.3721V18.3838Z" fill="#8198EE" />
    <path d="M12.25 16.1159L16.0866 18.3838V14.3721L12.25 16.1159Z" fill="#C0CBF7" />
    <defs>
      <radialGradient
        id="paint0_radial_24_847"
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
