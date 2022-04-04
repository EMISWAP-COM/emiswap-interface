import React, { FC, ReactElement } from 'react';
import IconWrapper, { IconWrapperInterface } from './iconWrapper';

export const BNBIcon: FC<IconWrapperInterface> = ({
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
      stroke="url(#paint0_radial_24_862)"
      stroke-opacity="0.2"
    />
    <path
      d="M16 26C21.5228 26 26 21.5228 26 16C26 10.4772 21.5228 6 16 6C10.4772 6 6 10.4772 6 16C6 21.5228 10.4772 26 16 26Z"
      fill="#F3BA2F"
    />
    <path
      d="M12.93 11.8381L16 10L19.07 11.8381L17.9413 12.5171L16 11.358L14.0587 12.5171L12.93 11.8381ZM19.07 14.1561L17.9413 13.4771L16 14.6361L14.0587 13.4771L12.93 14.1561V15.5142L14.8713 16.6732V18.9912L16 19.6702L17.1287 18.9912V16.6732L19.07 15.5142V14.1561ZM19.07 17.8322V16.4742L17.9413 17.1532V18.5112L19.07 17.8322ZM19.8713 18.3122L17.93 19.4712V20.8293L21 18.9912V15.3151L19.8713 15.9942V18.3122ZM18.7427 12.9971L19.8713 13.6761V15.0342L21 14.3551V12.9971L19.8713 12.318L18.7427 12.9971ZM14.8713 19.9629V21.321L16 22L17.1287 21.321V19.9629L16 20.6419L14.8713 19.9629ZM12.93 17.8322L14.0587 18.5112V17.1532L12.93 16.4742V17.8322ZM14.8713 12.9971L16 13.6761L17.1287 12.9971L16 12.318L14.8713 12.9971ZM12.1287 13.6761L13.2573 12.9971L12.1287 12.318L11 12.9971V14.3551L12.1287 15.0342V13.6761ZM12.1287 15.9942L11 15.3151V18.9912L14.07 20.8293V19.4712L12.1287 18.3122V15.9942Z"
      fill="white"
    />
    <defs>
      <radialGradient
        id="paint0_radial_24_862"
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
