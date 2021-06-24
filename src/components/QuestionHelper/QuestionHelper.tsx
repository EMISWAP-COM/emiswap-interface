import React, { useCallback, useState } from 'react';
import Question from '../../assets/svg/question.svg';
import styled from 'styled-components';
import Tooltip, { TooltipProps } from '../Tooltip';

export interface QuestionHelperProps {
  text: string;
  disabled?: boolean;
  placement?: TooltipProps['placement'];
}

const QuestionWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.2rem;
  border: none;
  background: none;
  outline: none;
  cursor: default;
  border-radius: 36px;
  color: ${({ theme }) => theme.blue};

  :hover,
  :focus {
    opacity: 0.7;
  }
`;

const QuestionHelper: React.FC<QuestionHelperProps> = ({ text, disabled, placement }) => {
  const [show, setShow] = useState<boolean>(false);

  const open = useCallback(() => setShow(true), [setShow]);
  const close = useCallback(() => setShow(false), [setShow]);

  return (
    <span style={{ marginLeft: 4 }}>
      <Tooltip placement={placement} text={text} show={show && !disabled}>
        <QuestionWrapper onClick={open} onMouseEnter={open} onMouseLeave={close}>
          <img src={Question} alt="" />
        </QuestionWrapper>
      </Tooltip>
    </span>
  );
};

export default QuestionHelper;
