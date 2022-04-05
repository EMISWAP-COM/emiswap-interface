import React, { FC, ReactElement } from 'react';
import IconWrapper, { IconWrapperInterface } from './iconWrapper';

export const EspIcon: FC<IconWrapperInterface> = ({
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
      stroke="url(#paint0_radial_1_548)"
      stroke-opacity="0.2"
    />
    <mask
      id="mask0_1_548"
      //   style="mask-type:alpha"
      maskUnits="userSpaceOnUse"
      x="6"
      y="6"
      width="20"
      height="20"
    >
      <circle cx="16" cy="16" r="10" fill="#C4C4C4" />
    </mask>
    <g mask="url(#mask0_1_548)">
      <path
        d="M6 16C6 17.2232 6.22004 18.395 6.62199 19.4783L16 20.3478L25.378 19.4783C25.78 18.395 26 17.2232 26 16C26 14.7768 25.78 13.6051 25.378 12.5218L16 11.6522L6.62199 12.5218C6.22004 13.6051 6 14.7768 6 16V16Z"
        fill="#FFDA44"
      />
      <path
        d="M25.378 12.5218C23.9651 8.71379 20.2996 6 16 6C11.7003 6 8.03491 8.71379 6.62198 12.5218H25.378Z"
        fill="#D80027"
      />
      <path
        d="M6.62201 19.4783C8.03494 23.2862 11.7004 26 16 26C20.2997 26 23.9651 23.2862 25.378 19.4783H6.62201Z"
        fill="#D80027"
      />
      <circle cx="16" cy="16" r="9.5" stroke="white" />
    </g>
    <defs>
      <radialGradient
        id="paint0_radial_1_548"
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
