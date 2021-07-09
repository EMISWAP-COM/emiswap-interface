import React from 'react';
import TooltipComponent from '@material-ui/core/Tooltip';
import withStyles from '@material-ui/core/styles/withStyles';

const StyledTooltip = withStyles(() => ({
  tooltip: {
    fontSize: 16,
  },
}))(TooltipComponent);

export interface TooltipProps {
  title: string;
}

export const Tooltip: React.FC<TooltipProps> = props => (
  <StyledTooltip title={props.title} enterTouchDelay={0} arrow={true}>
    {(props.children as any) as React.ReactElement}
  </StyledTooltip>
);
