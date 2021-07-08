import React from 'react';
import styled from 'styled-components/macro';

import { Tooltip } from '../Tooltip';

export const TruncatedText = styled.span`
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

export interface TruncatedTextWithTooltipProps {
  title: string;
}

export const TruncatedTextWithTooltip: React.FC<TruncatedTextWithTooltipProps> = props => {
  console.log(props);
  return (
    <Tooltip title={props.title}>
      <TruncatedText>{props.children}</TruncatedText>
    </Tooltip>
  );
}
