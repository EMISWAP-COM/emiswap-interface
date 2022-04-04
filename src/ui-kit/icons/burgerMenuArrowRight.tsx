import React, { FC, ReactElement } from 'react';
import IconWrapper, { IconWrapperInterface } from './iconWrapper';

export const BurgerMenuArrowRightIcon: FC<IconWrapperInterface> = ({
  width = '32',
  height = '32',
  ...props
}): ReactElement => (
  <IconWrapper {...props} width={width} height={height} viewBoxSize="32">
    <rect width="32" height="32" rx="10" fill="currentColor" fill-opacity="0.15" />
    <rect
      x="0.5"
      y="0.5"
      width="31"
      height="31"
      rx="9.5"
      stroke="url(#paint0_radial_1_499)"
      stroke-opacity="0.2"
    />
    <path
      d="M9.58398 10.5H22.4173M9.69093 16H16.7391M9.58398 21.5H22.4173"
      stroke="currentColor"
      stroke-width="2"
      stroke-miterlimit="10"
      stroke-linecap="round"
    />
    <path
      d="M21.9333 16.8L20.6 17.8C19.9408 18.2944 19 17.824 19 17L19 15C19 14.176 19.9408 13.7056 20.6 14.2L21.9333 15.2C22.4667 15.6 22.4667 16.4 21.9333 16.8Z"
      fill="currentColor"
    />
    <defs>
      <radialGradient
        id="paint0_radial_1_499"
        cx="0"
        cy="0"
        r="1"
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(-19.5 -15) rotate(42.4664) scale(79.9812)"
      >
        <stop stop-color="currentColor" />
        <stop offset="0.609995" stop-color="currentColor" stop-opacity="0" />
      </radialGradient>
    </defs>
  </IconWrapper>
);
