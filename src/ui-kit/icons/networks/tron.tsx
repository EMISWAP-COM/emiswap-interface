import React, { FC, ReactElement } from 'react';
import IconWrapper, { IconWrapperInterface } from '../iconWrapper';

export const TronIcon: FC<IconWrapperInterface> = ({
                                                     width = '32',
                                                     height = '32',
                                                     ...props
                                                   }): ReactElement => (
  <IconWrapper {...props} width={width} height={height} viewBoxSize={width}>
    <path d="M10 20C15.5228 20 20 15.5228 20 10C20 4.47715 15.5228 0 10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20Z" fill="white"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M5 5L9.17842 16L15 8.57869L12.9389 6.52863L5 5ZM6.48131 5.87499L12.2037 6.97702L9.98249 8.91343L6.48131 5.87499ZM6.08448 6.28426L9.73332 9.45095L9.1628 14.3889L6.08448 6.28426ZM12.8112 7.20208L14.0256 8.41008L10.7042 9.03946L12.8112 7.20208ZM10.2615 9.71291L13.9394 9.01618L9.72078 14.3941L10.2615 9.71291Z" fill="#C63127"/>
  </IconWrapper>
);
