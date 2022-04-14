import React, { FC, ReactElement } from 'react';
import IconWrapper, { IconWrapperInterface } from '../iconWrapper';

export const TronIcon: FC<IconWrapperInterface> = ({
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
      stroke="url(#paint0_radial_177_6358)"
      stroke-opacity="0.2"
    />
    <path
      d="M16 26C21.5228 26 26 21.5228 26 16C26 10.4772 21.5228 6 16 6C10.4772 6 6 10.4772 6 16C6 21.5228 10.4772 26 16 26Z"
      fill="white"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M11 11L15.1784 22L21 14.5787L18.9389 12.5286L11 11ZM12.4813 11.875L18.2037 12.977L15.9825 14.9134L12.4813 11.875ZM12.0845 12.2843L15.7333 15.451L15.1628 20.3889L12.0845 12.2843ZM18.8112 13.2021L20.0256 14.4101L16.7042 15.0395L18.8112 13.2021ZM16.2615 15.7129L19.9394 15.0162L15.7208 20.3941L16.2615 15.7129Z"
      fill="#C63127"
    />
    <defs>
      <radialGradient
        id="paint0_radial_177_6358"
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
