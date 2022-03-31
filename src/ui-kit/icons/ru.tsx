import React, { FC, ReactElement } from 'react';
import IconWrapper, { IconWrapperInterface } from './iconWrapper';

export const RuIcon: FC<IconWrapperInterface> = ({
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
      stroke="url(#paint0_radial_1_539)"
      stroke-opacity="0.2"
    />
    <mask
      id="mask0_1_539"
      //   style="mask-type:alpha"
      maskUnits="userSpaceOnUse"
      x="6"
      y="6"
      width="20"
      height="20"
    >
      <circle cx="16" cy="16" r="10" fill="#C4C4C4" />
    </mask>
    <g mask="url(#mask0_1_539)">
      <path
        d="M15.9999 26C21.5221 26 25.9999 21.5223 25.9999 16C25.9999 10.4777 21.5221 6 15.9999 6C10.4776 6 5.99988 10.4777 5.99988 16C5.99988 21.5223 10.4776 26 15.9999 26Z"
        fill="white"
      />
      <path
        d="M25.3776 19.4766C26.2073 17.2323 26.2073 14.7654 25.3776 12.5211H6.62215C5.79245 14.7654 5.79245 17.2323 6.62215 19.4766L15.9999 20.3504L25.3776 19.4766Z"
        fill="#0052B4"
      />
      <path
        d="M15.9999 26C20.2999 26 23.9663 23.2891 25.3776 19.4766H6.62214C8.03503 23.2891 11.6999 26 15.9999 26Z"
        fill="#D80027"
      />
      <circle cx="16" cy="16" r="9.5" stroke="white" />
    </g>
    <defs>
      <radialGradient
        id="paint0_radial_1_539"
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
