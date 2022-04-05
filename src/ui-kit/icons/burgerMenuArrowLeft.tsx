import React, { FC, ReactElement } from 'react';
import IconWrapper, { IconWrapperInterface } from './iconWrapper';

export const BurgerMenuArrowLeftIcon: FC<IconWrapperInterface> = ({
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
      stroke="url(#paint0_radial_24_730)"
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
      d="M20.0667 15.2L21.4 14.2C22.0592 13.7056 23 14.176 23 15L23 17C23 17.824 22.0592 18.2944 21.4 17.8L20.0667 16.8C19.5333 16.4 19.5333 15.6 20.0667 15.2Z"
      fill="currentColor"
    />
    <defs>
      <radialGradient
        id="paint0_radial_24_730"
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
