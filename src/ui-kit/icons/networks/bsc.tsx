import React, { FC, ReactElement } from 'react';
import IconWrapper, { IconWrapperInterface } from '../iconWrapper';

export const BSCIcon: FC<IconWrapperInterface> = ({
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
      stroke="url(#paint0_radial_177_6365)"
      stroke-opacity="0.2"
    />
    <path
      d="M16 26C21.5228 26 26 21.5228 26 16C26 10.4772 21.5228 6 16 6C10.4772 6 6 10.4772 6 16C6 21.5228 10.4772 26 16 26Z"
      fill="white"
    />
    <path
      d="M12.9301 11.838L16 10L19.0699 11.838L17.9412 12.5164L15.9995 11.3577L14.0588 12.5164L12.9301 11.838Z"
      fill="#F0B90B"
    />
    <path
      d="M17.941 13.4772L17.9408 13.4771H17.9412L17.941 13.4772L19.0699 14.1559V15.5141L17.1286 16.6733V18.9917L16 19.6705L14.8714 18.9917V16.6733L12.9301 15.5141V14.1559L14.0588 13.4771L15.9995 14.6363L17.941 13.4772Z"
      fill="#F0B90B"
    />
    <path d="M19.0699 17.8325V16.4748L17.9412 17.1532V18.5113L19.0699 17.8325Z" fill="#F0B90B" />
    <path
      d="M19.8709 18.3124L17.9301 19.4716V20.8297L21 18.9917V15.3151L19.8709 15.9945V18.3124Z"
      fill="#F0B90B"
    />
    <path
      d="M18.7427 12.9972L19.8709 13.6761L19.8714 15.0343L21 14.3554V12.9972L19.8714 12.3179L18.7427 12.9972Z"
      fill="#F0B90B"
    />
    <path
      d="M14.8718 19.963V21.3212L16.0005 22L17.1291 21.3212V19.963L16.0005 20.6418L14.8718 19.963Z"
      fill="#F0B90B"
    />
    <path
      d="M12.9301 17.8325L14.0578 18.5108L14.0588 18.5113V17.1532L12.9301 16.4743V17.8325Z"
      fill="#F0B90B"
    />
    <path
      d="M14.8709 12.9972L15.9995 13.6756V13.6761L17.1282 12.9972L15.9995 12.3179L14.8709 12.9972Z"
      fill="#F0B90B"
    />
    <path
      d="M12.1286 13.6761L13.2573 12.9972L12.1286 12.3179L11 12.9972V14.3554L12.1286 15.0343V13.6761Z"
      fill="#F0B90B"
    />
    <path
      d="M11.0005 15.3154L11 15.3151H11.0005V15.3154L12.1286 15.9945V18.3124L14.0694 19.4716V20.8297L11.0005 18.9917V15.3154Z"
      fill="#F0B90B"
    />
    <defs>
      <radialGradient
        id="paint0_radial_177_6365"
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
