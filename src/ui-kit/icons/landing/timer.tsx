import React, { FC, ReactElement } from 'react';
import IconWrapper, { IconWrapperInterface } from '../iconWrapper';

export const TimerLogo: FC<IconWrapperInterface> = ({
  width = '80',
  height = '80',
  color = 'statusGreen',
  ...props
}): ReactElement => (
  <IconWrapper {...props} width={width} height={height} viewBoxSize="80" color={color}>
    <rect width="80" height="80" rx="20" fill="white" fill-opacity="0.05" />
    <rect
      x="0.5"
      y="0.5"
      width="79"
      height="79"
      rx="19.5"
      stroke="url(#paint0_radial_1_413)"
      stroke-opacity="0.4"
    />
    <path d="M29.5 28L26.5 31" stroke="white" stroke-width="2" stroke-linecap="round" />
    <path d="M50.5 28L53.5 31" stroke="white" stroke-width="2" stroke-linecap="round" />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M40 52C46.6274 52 52 46.6274 52 40C52 33.3726 46.6274 28 40 28C33.3726 28 28 33.3726 28 40C28 46.6274 33.3726 52 40 52ZM43.7809 36.8747C44.1259 36.4434 44.056 35.8141 43.6247 35.4691C43.1934 35.1241 42.5641 35.194 42.2191 35.6253L39.7919 38.6594L36.0547 36.1679C35.5952 35.8616 34.9743 35.9858 34.6679 36.4453C34.3616 36.9048 34.4858 37.5257 34.9453 37.8321L39.2546 40.7049C39.7941 41.0646 40.519 40.952 40.9241 40.4457L43.7809 36.8747Z"
      fill="white"
    />
    <defs>
      <radialGradient
        id="paint0_radial_1_413"
        cx="0"
        cy="0"
        r="1"
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(-48.75 -37.5) rotate(42.4664) scale(199.953)"
      >
        <stop stop-color="white" />
        <stop offset="0.609995" stop-color="white" stop-opacity="0" />
      </radialGradient>
    </defs>
  </IconWrapper>
);
