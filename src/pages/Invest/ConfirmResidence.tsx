import React from 'react';
import styled from '@emotion/styled';

import Checkbox from '../../components/Checkbox';
import Question from '../../components/QuestionHelper';

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
  margin: 24px auto;
  display: flex;
  text-align: left;
  justify-content: space-between;
`;

const ConfirmResidence: React.FC<ConfirmResidentProps> = ({ children, tooltip, onChane }) => (
  <Wrapper>
    <TextWrapper>
      <Checkbox onChange={onChane} />
      <Text children={children} />
    </TextWrapper>
    <Question text={tooltip} placement="right" />
  </Wrapper>
);

export default ConfirmResidence;
