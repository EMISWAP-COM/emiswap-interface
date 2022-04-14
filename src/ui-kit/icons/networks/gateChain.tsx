import React, { FC, ReactElement } from 'react';
import IconWrapper, { IconWrapperInterface } from '../iconWrapper';

export const GateChainIcon: FC<IconWrapperInterface> = ({
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
      stroke="url(#paint0_radial_177_6285)"
      stroke-opacity="0.2"
    />
    <path
      d="M16 26C21.5228 26 26 21.5228 26 16C26 10.4772 21.5228 6 16 6C10.4772 6 6 10.4772 6 16C6 21.5228 10.4772 26 16 26Z"
      fill="white"
    />
    <g clip-path="url(#clip0_177_6285)">
      <path
        d="M22 13.1802L18.436 15.0854V17.2944L19.6618 16.6307V17.9118L16.2078 19.9405L13.432 18.3097C13.2257 18.1885 13.0545 18.0143 12.9354 17.8044C12.8163 17.5946 12.7537 17.3565 12.7537 17.1142V13.854L15.6185 12.1715C15.7976 12.0663 16.0008 12.0109 16.2076 12.0109C16.4145 12.0109 16.6177 12.0663 16.7968 12.1715L19.6616 13.854L21.4153 12.824L16.9523 10.2028C16.7257 10.0699 16.4688 10 16.2073 10C15.9457 10 15.6888 10.0699 15.4622 10.2028L11 12.8243V18.1421C11 18.3851 11.0629 18.6239 11.1824 18.8344C11.3018 19.0449 11.4736 19.2197 11.6805 19.3413L16.208 22.0001L20.729 19.3452C20.9379 19.2226 21.1113 19.0462 21.2318 18.8338C21.3524 18.6213 21.4158 18.3804 21.4158 18.1351V15.6817L21.9997 15.366V13.1802H22Z"
        fill="#D35756"
      />
    </g>
    <defs>
      <radialGradient
        id="paint0_radial_177_6285"
        cx="0"
        cy="0"
        r="1"
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(-19.5 -15) rotate(42.4664) scale(79.9812)"
      >
        <stop stop-color="white" />
        <stop offset="0.609995" stop-color="white" stop-opacity="0" />
      </radialGradient>
      <clipPath id="clip0_177_6285">
        <rect width="11" height="12" fill="white" transform="translate(11 10)" />
      </clipPath>
    </defs>
  </IconWrapper>
);
