import React from 'react';
import styled from 'styled-components/macro';

const StyledSymbol = styled.div`
  font-size: 12px;
  color: ${({theme}) => theme.purple};
  width: 24px;
  height: 24px;
  background-color: ${({theme}) => theme.blue};
  border-radius: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

const LpTokenSymbol = () => {
  return <StyledSymbol>LP</StyledSymbol>
}

export default LpTokenSymbol;
