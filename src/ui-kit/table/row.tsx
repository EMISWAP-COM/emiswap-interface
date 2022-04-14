import React, { ReactElement, ReactNode } from 'react';
import styled from 'styled-components';
import { Flex } from '../../ThemeProvider';

interface RowInterface {
  children: ReactNode;
  backgroundColor?: string;
}

const RowsWrapper = styled(Flex)`
  & > *:nth-child(n + 1) {
    margin-top: 0.5rem;
  }
  &:nth-child(n + 1) {
    margin-top: 0.5rem;
  }
`;

RowsWrapper.defaultProps = {
  pl: 2,
  pr: 3,
  pb: 2,
  borderRadius: '0.875rem',
  alignItems: 'center',
};

const Row = ({ children, backgroundColor }: RowInterface): ReactElement => {
  return (
    <RowsWrapper color="text" backgroundColor={backgroundColor || 'almostNoWhite'}>
      {children}
    </RowsWrapper>
  );
};

export default Row;
