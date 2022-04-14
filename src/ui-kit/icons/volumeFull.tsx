import React, { FC, ReactElement } from 'react';
import IconWrapper, { IconWrapperInterface } from './iconWrapper';

export const VolumeFull: FC<IconWrapperInterface> = ({
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
      stroke="url(#paint0_radial_177_6393)"
      stroke-opacity="0.2"
    />
    <path
      d="M9.46532 17.6089C8.87114 16.6186 8.87114 15.3814 9.46532 14.3911C9.64663 14.0889 9.94701 13.8773 10.2926 13.8082L11.7034 13.526C11.7875 13.5092 11.8633 13.4641 11.9181 13.3982L13.1708 11.895C14.3534 10.4759 14.9447 9.76638 15.4723 9.95742C16 10.1485 16 11.0721 16 12.9193L16 19.0807C16 20.9279 16 21.8515 15.4723 22.0426C14.9447 22.2336 14.3534 21.5241 13.1708 20.105L11.9181 18.6018C11.8633 18.5359 11.7875 18.4908 11.7034 18.474L10.2926 18.1918C9.94701 18.1227 9.64663 17.9111 9.46532 17.6089Z"
      fill="white"
    />
    <path
      d="M18.1129 13.0539C18.8903 13.8313 19.329 14.8844 19.3333 15.9837C19.3376 17.0831 18.9073 18.1397 18.1361 18.9231"
      stroke="white"
      stroke-width="1.8"
      stroke-linecap="round"
    />
    <path
      d="M21.5472 11.2861C22.791 12.5299 23.4929 14.2149 23.4998 15.9739C23.5067 17.7329 22.8182 19.4234 21.5842 20.6769"
      stroke="white"
      stroke-width="1.8"
      stroke-linecap="round"
    />
    <defs>
      <radialGradient
        id="paint0_radial_177_6393"
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
