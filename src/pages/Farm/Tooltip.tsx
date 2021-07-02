import React from 'react';
import TooltipComponent from '@material-ui/core/Tooltip';
import withStyles from '@material-ui/core/styles/withStyles';

const StyledTooltip = withStyles(() => ({
  tooltip: {
    fontSize: 16,
  },
}))(TooltipComponent);

type TooltipProps = {
  title: string,
};

const Tooltip: React.FC<TooltipProps> = (
  {
    title,
    children,
  }
) => {
  // @ts-ignore
  return <StyledTooltip title={title} enterTouchDelay={0} arrow={true}>{children}</StyledTooltip>
}

export default Tooltip;
