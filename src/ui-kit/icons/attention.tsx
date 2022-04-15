import React, { FC, ReactElement } from 'react';
import IconWrapper, { IconWrapperInterface } from './iconWrapper';

export const AttentionIcon: FC<IconWrapperInterface> = ({
  width = '16',
  height = '16',
  color = '#E84142',
  ...props
}): ReactElement => (
  <IconWrapper {...props} width={width} height={height} viewBoxSize={width}>
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M15.5 8C15.5 12.1421 12.1421 15.5 8 15.5C3.85786 15.5 0.5 12.1421 0.5 8C0.5 3.85786 3.85786 0.5 8 0.5C12.1421 0.5 15.5 3.85786 15.5 8ZM8.83333 4.66667C8.83333 5.1269 8.46024 5.5 8 5.5C7.53976 5.5 7.16667 5.1269 7.16667 4.66667C7.16667 4.20643 7.53976 3.83333 8 3.83333C8.46024 3.83333 8.83333 4.20643 8.83333 4.66667ZM9 12.1667V7.16667H7V12.1667H9Z"
      fill={color}
    />
  </IconWrapper>
);
