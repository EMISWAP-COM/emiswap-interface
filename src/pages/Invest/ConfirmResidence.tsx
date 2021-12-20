import React from 'react';
import styled from '@emotion/styled';

import { Checkbox } from '../../base/ui';
import Question from '../../components/QuestionHelper';
import { useMediaQuery } from '../../hooks';

export interface ConfirmResidentProps {
  tooltip: string;
  onChane: () => void;
}

const Text = styled.div`
  display: inline-block;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 24px;
  color: #fff;
  max-width: 284px;
  margin-left: 16px;
`;

const TextWrapper = styled.div`
  display: flex;
`;

const Wrapper = styled.div`
  display: flex;
  text-align: left;
  margin: 24px auto;
  justify-content: space-between;
`;

const ConfirmResidence: React.FC<ConfirmResidentProps> = ({ children, tooltip, onChane }) => {
  const placement = useMediaQuery('(max-width: 800px)', 'left', 'right');
  return (
    <Wrapper>
      <TextWrapper>
        <Checkbox onChange={onChane} />
        <Text children={children} />
      </TextWrapper>
      <Question text={tooltip} placement={placement} />
    </Wrapper>
  );
};

export default ConfirmResidence;
