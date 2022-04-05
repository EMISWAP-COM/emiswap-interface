import React, { FC, ReactElement } from 'react';
import IconWrapper, { IconWrapperInterface } from './iconWrapper';

export const DotIcon: FC<IconWrapperInterface> = ({
  width = '24',
  height = '24',
  ...props
}): ReactElement => (
  <IconWrapper {...props} width={width} height={height} viewBoxSize="24">
    <rect x="9" y="9" width="6" height="6" rx="3" fill="currentColor" />
  </IconWrapper>
);
