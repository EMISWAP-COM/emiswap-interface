import React, { FC, ReactElement } from 'react';
import IconWrapper, { IconWrapperInterface } from '../iconWrapper';

export const SolanaICON: FC<IconWrapperInterface> = ({
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
      stroke="url(#paint0_radial_177_6348)"
      stroke-opacity="0.2"
    />
    <path
      d="M16 26C21.5228 26 26 21.5228 26 16C26 10.4772 21.5228 6 16 6C10.4772 6 6 10.4772 6 16C6 21.5228 10.4772 26 16 26Z"
      fill="white"
    />
    <g clip-path="url(#clip0_177_6348)">
      <path
        d="M11.9493 18.1053C12.0217 18.0437 12.1213 18.0078 12.2269 18.0078H21.804C21.979 18.0078 22.0665 18.1875 21.9428 18.2927L20.0509 19.9019C19.9785 19.9635 19.8789 19.9995 19.7733 19.9995H10.1962C10.0212 19.9995 9.93374 19.8198 10.0574 19.7146L11.9493 18.1053Z"
        fill="url(#paint1_linear_177_6348)"
      />
      <path
        d="M11.9493 12.0975C12.0248 12.0359 12.1243 12 12.2269 12H21.804C21.979 12 22.0665 12.1797 21.9428 12.2849L20.0509 13.8941C19.9785 13.9557 19.8789 13.9917 19.7733 13.9917H10.1962C10.0212 13.9917 9.93374 13.812 10.0574 13.7068L11.9493 12.0975Z"
        fill="url(#paint2_linear_177_6348)"
      />
      <path
        d="M20.0509 15.0819C19.9785 15.0203 19.8789 14.9844 19.7733 14.9844H10.1962C10.0212 14.9844 9.93374 15.164 10.0574 15.2693L11.9493 16.8785C12.0217 16.9401 12.1213 16.976 12.2269 16.976H21.804C21.979 16.976 22.0665 16.7964 21.9428 16.6911L20.0509 15.0819Z"
        fill="url(#paint3_linear_177_6348)"
      />
    </g>
    <defs>
      <radialGradient
        id="paint0_radial_177_6348"
        cx="0"
        cy="0"
        r="1"
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(-19.5 -15) rotate(42.4664) scale(79.9812)"
      >
        <stop stop-color="white" />
        <stop offset="0.609995" stop-color="white" stop-opacity="0" />
      </radialGradient>
      <linearGradient
        id="paint1_linear_177_6348"
        x1="20.8891"
        y1="11.0382"
        x2="15.7916"
        y2="22.5167"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#00FFA3" />
        <stop offset="1" stop-color="#DC1FFF" />
      </linearGradient>
      <linearGradient
        id="paint2_linear_177_6348"
        x1="17.9909"
        y1="9.75165"
        x2="12.8935"
        y2="21.2302"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#00FFA3" />
        <stop offset="1" stop-color="#DC1FFF" />
      </linearGradient>
      <linearGradient
        id="paint3_linear_177_6348"
        x1="19.4308"
        y1="10.3905"
        x2="14.3333"
        y2="21.8691"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#00FFA3" />
        <stop offset="1" stop-color="#DC1FFF" />
      </linearGradient>
      <clipPath id="clip0_177_6348">
        <rect width="12" height="8" fill="white" transform="translate(10 12)" />
      </clipPath>
    </defs>
  </IconWrapper>
);
