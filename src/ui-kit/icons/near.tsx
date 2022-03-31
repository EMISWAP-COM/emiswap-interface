import React, { FC, ReactElement } from 'react';
import IconWrapper, { IconWrapperInterface } from './iconWrapper';

export const NEARIcon: FC<IconWrapperInterface> = ({
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
      stroke="url(#paint0_radial_24_866)"
      stroke-opacity="0.2"
    />
    <mask
      id="mask0_24_866"
      //   style="mask-type:alpha"
      maskUnits="userSpaceOnUse"
      x="6"
      y="6"
      width="20"
      height="20"
    >
      <circle cx="16" cy="16" r="10" fill="#C4C4C4" />
    </mask>
    <g mask="url(#mask0_24_866)">
      <circle cx="16" cy="16" r="10" fill="white" />
    </g>
    <g clip-path="url(#clip0_24_866)">
      <path
        d="M18.6367 12.0722L16.8109 14.7847C16.6847 14.9694 16.9274 15.1931 17.1022 15.0375L18.8989 13.4722C18.9474 13.4333 19.0154 13.4625 19.0154 13.5306V18.4208C19.0154 18.4889 18.928 18.5181 18.8892 18.4694L13.4507 11.9556C13.2759 11.7417 13.0234 11.625 12.7418 11.625H12.5476C12.0426 11.625 11.625 12.0431 11.625 12.5583V19.4417C11.625 19.9569 12.0426 20.375 12.5573 20.375C12.8778 20.375 13.1788 20.2097 13.3536 19.9278L15.1794 17.2153C15.3056 17.0306 15.0628 16.8069 14.888 16.9625L13.0914 18.5181C13.0429 18.5569 12.9749 18.5278 12.9749 18.4597V13.5792C12.9749 13.5111 13.0623 13.4819 13.1011 13.5306L18.5395 20.0444C18.7143 20.2583 18.9766 20.375 19.2485 20.375H19.4427C19.9574 20.375 20.375 19.9569 20.375 19.4417V12.5583C20.375 12.0431 19.9574 11.625 19.4427 11.625C19.1125 11.625 18.8115 11.7903 18.6367 12.0722Z"
        fill="black"
      />
    </g>
    <defs>
      <radialGradient
        id="paint0_radial_24_866"
        cx="0"
        cy="0"
        r="1"
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(-19.5 -15) rotate(42.4664) scale(79.9812)"
      >
        <stop stop-color="white" />
        <stop offset="0.609995" stop-color="white" stop-opacity="0" />
      </radialGradient>
      <clipPath id="clip0_24_866">
        <rect width="8.75" height="8.75" fill="white" transform="translate(11.625 11.625)" />
      </clipPath>
    </defs>
  </IconWrapper>
);
