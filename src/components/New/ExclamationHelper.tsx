import React, { useCallback, useState } from 'react';
import Tooltip, { TooltipProps } from '../Tooltip';
import { ExclamationIcon } from '../../ui-kit/icons/exclamation';
import { Flex } from '../../ThemeProvider';

export interface QuestionHelperProps {
  text: string;
  disabled?: boolean;
  placement?: TooltipProps['placement'];
}

const ExclamationHelper: React.FC<QuestionHelperProps> = ({ text, disabled, placement }) => {
  const [show, setShow] = useState<boolean>(false);

  const open = useCallback(() => setShow(true), [setShow]);
  const close = useCallback(() => setShow(false), [setShow]);

  return (
    <span style={{ marginLeft: 4 }}>
      <Tooltip placement={placement} text={text} show={show && !disabled}>
        <Flex
          justifyContent="center"
          alignItems="baseline"
          padding="0.2rem"
          bg="drop"
          color="inactive"
          onClick={open}
          onMouseEnter={open}
          onMouseLeave={close}
        >
          <ExclamationIcon width="1rem" height="1rem" />
        </Flex>
      </Tooltip>
    </span>
  );
};

export default ExclamationHelper;
