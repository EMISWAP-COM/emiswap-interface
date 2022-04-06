import React, { ReactElement, ReactNode } from 'react';
import { CellWrapper } from './cell';

interface RowInterface {
  children: ReactNode;
}

CellWrapper.defaultProps = {
  alignItems: 'center',
}

const Row = ({ children }: RowInterface): ReactElement => {
  return (
    <CellWrapper
      borderRadius="0.875rem"
      bg="almostNoWhite"
      minHeight="3rem"
      px={1}
      color="text"
    >
      { children }
    </CellWrapper>
  );
};

export default Row;
