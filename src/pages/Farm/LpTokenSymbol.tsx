import React from 'react';
import styled from 'styled-components/macro';

const StyledSymbol = styled.div<{ size: number; fontSize: number }>`
  font-size: ${({ fontSize }) => fontSize}px;
  color: ${({ theme }) => theme.purple};
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  background-color: ${({ theme }) => theme.blue};
  border-radius: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LpTokenSymbol = ({ size = 24, fontSize = 12 }) => {
  return (
    <StyledSymbol size={size} fontSize={fontSize}>
      LP
    </StyledSymbol>
  );
};

export default LpTokenSymbol;
