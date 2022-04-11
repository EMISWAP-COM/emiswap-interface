import React, { FC, ReactElement } from 'react';
import IconWrapper, { IconWrapperInterface } from './iconWrapper';

export const ChainIcon: FC<IconWrapperInterface> = ({
                                                                     width = '32',
                                                                     height = '32',
                                                                     ...props
                                                                   }): ReactElement => (
  <IconWrapper {...props} width={width} height={height} viewBoxSize={width}>
    <path d="M8.33333 13.3327H5.83333C3.99239 13.3327 2.5 11.8403 2.5 9.99935V9.99935C2.5 8.1584 3.99238 6.66602 5.83333 6.66602H8.33333" stroke="white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M13.3332 9.99951H6.6665" stroke="white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M11.6667 13.3327H14.1667C16.0076 13.3327 17.5 11.8403 17.5 9.99935V9.99935C17.5 8.1584 16.0076 6.66602 14.1667 6.66602H11.6667" stroke="white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
  </IconWrapper>
);
