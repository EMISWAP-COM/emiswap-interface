import React, { FC, ReactElement } from 'react';
import IconWrapper, { IconWrapperInterface } from '../iconWrapper';

export const TelegramIcon: FC<IconWrapperInterface> = ({
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
      stroke="url(#paint0_radial_177_6867)"
      stroke-opacity="0.2"
    />
    <path
      d="M16 6C10.5 6 6 10.5 6 16C6 21.5 10.5 26 16 26C21.5 26 26 21.5 26 16C26 10.5 21.5 6 16 6ZM19.2 21.2C19.1 21.6 18.6 21.7 18.3 21.6H18.2L15.5 19.5L13.7 21C13.6 21.1 13.5 21.1 13.4 21L13.7 18V17.9C13.7 17.9 18.6 13.5 18.8 13.3C19.1 13.2 19 13.1 19 13.1C19 12.9 18.6 13.1 18.6 13.1L12.1 17.3L9.4 16.4C9.4 16.4 9 16.3 8.9 15.9C8.9 15.6 9.4 15.4 9.4 15.4L20.1 11.1C20.1 11.1 21 10.7 21 11.4L19.2 21.2Z"
      fill="white"
    />
    <defs>
      <radialGradient
        id="paint0_radial_177_6867"
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
