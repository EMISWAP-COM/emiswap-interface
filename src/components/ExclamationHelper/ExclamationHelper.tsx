import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { TooltipProps } from '../Tooltip';
import { ExclamationIcon } from '../../ui-kit/icons/exclamation';
import { NewTooltip } from '../Tooltip';
import { Flex, Props } from '../../ThemeProvider';
import { position, layout, border, color } from 'styled-system';

export interface QuestionHelperProps {
  text: string;
  disabled?: boolean;
  placement?: TooltipProps['placement'];
}

const QuestionWrapper = styled(Flex)<Props>`
  ${position};
  ${layout};
  ${border};
  ${color};
  outline: none;
  cursor: default;
  :hover,
  :focus {
    opacity: 0.7;
  }
`;

const ExclamationHelper: React.FC<QuestionHelperProps> = ({ text, disabled, placement }) => {
  const [show, setShow] = useState<boolean>(false);

  const open = useCallback(() => setShow(true), [setShow]);
  const close = useCallback(() => setShow(false), [setShow]);

  return (
    <span style={{ marginLeft: 4 }}>
      <NewTooltip placement={placement} text={text} show={show && !disabled}>
        <QuestionWrapper
          justifyContent="center"
          alignItems="center"
          padding="0.2rem"
          border="none"
          backgroundColor="none"
          borderRadius="2.25rem"
          onClick={open}
          onMouseEnter={open}
          onMouseLeave={close}
        >
          <ExclamationIcon width={32} height={32} />
        </QuestionWrapper>
      </NewTooltip>
    </span>
  );
};

export default ExclamationHelper;
