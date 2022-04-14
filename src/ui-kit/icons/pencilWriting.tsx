import React, { FC, ReactElement } from 'react';
import IconWrapper, { IconWrapperInterface } from './iconWrapper';

export const PencilWritingIcon: FC<IconWrapperInterface> = ({
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
      stroke="url(#paint0_radial_177_6306)"
      stroke-opacity="0.2"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M20.4587 14.8745L21.8331 13.5002C22.0676 13.2657 22.1849 13.1484 22.2693 13.0362C22.8054 12.324 22.8054 11.343 22.2693 10.6308C22.1849 10.5186 22.0676 10.4014 21.8331 10.1669C21.5986 9.93235 21.4814 9.8151 21.3691 9.73065C20.6569 9.1946 19.6759 9.1946 18.9637 9.73065C18.8515 9.8151 18.7343 9.93234 18.4998 10.1668L18.4998 10.1669L17.1062 11.5605C17.9031 12.9407 19.0598 14.0885 20.4587 14.8745ZM15.6516 13.0151L10.1895 18.4771C9.76442 18.9022 9.55189 19.1147 9.41216 19.3758C9.27242 19.6369 9.21348 19.9317 9.09559 20.5211L8.64686 22.7647C8.58034 23.0974 8.54708 23.2637 8.64168 23.3583C8.73629 23.4529 8.9026 23.4196 9.23521 23.3531L11.4789 22.9044C12.0683 22.7865 12.363 22.7275 12.6241 22.5878C12.8852 22.4481 13.0978 22.2355 13.5228 21.8105L19.0004 16.3329C17.6525 15.4822 16.5104 14.3477 15.6516 13.0151Z"
      fill="white"
    />
    <defs>
      <radialGradient
        id="paint0_radial_177_6306"
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
