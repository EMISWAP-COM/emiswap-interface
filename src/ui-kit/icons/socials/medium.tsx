import React, { FC, ReactElement } from 'react';
import IconWrapper, { IconWrapperInterface } from '../iconWrapper';

export const MediumIcon: FC<IconWrapperInterface> = ({
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
      stroke="url(#paint0_radial_177_6875)"
      stroke-opacity="0.2"
    />
    <path
      d="M11.6407 10C14.756 10 17.2812 12.5266 17.2812 15.6431C17.2812 18.7596 14.7558 21.286 11.6407 21.286C8.52561 21.286 6 18.7596 6 15.6431C6 12.5266 8.52542 10 11.6407 10ZM20.6485 10.3306C22.2061 10.3306 23.4688 12.7088 23.4688 15.6431H23.469C23.469 18.5766 22.2063 20.9556 20.6487 20.9556C19.091 20.9556 17.8283 18.5766 17.8283 15.6431C17.8283 12.7096 19.0908 10.3306 20.6485 10.3306ZM25.0081 10.8839C25.5558 10.8839 26 13.0146 26 15.6431C26 18.2708 25.556 20.4023 25.0081 20.4023C24.4602 20.4023 24.0163 18.2714 24.0163 15.6431C24.0163 13.0148 24.4604 10.8839 25.0081 10.8839Z"
      fill="white"
    />
    <defs>
      <radialGradient
        id="paint0_radial_177_6875"
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
