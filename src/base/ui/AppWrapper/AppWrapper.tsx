import React from 'react';
import styled from 'styled-components'
import backgroundCurvedLines from '../../../assets/images/backgroundCurvedLines.svg'

export const AppWrapper: React.FC = (
  {
    children,
  }
) => {
  const BackgroundContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  max-height: 1390px;
  background-image: url('${backgroundCurvedLines}');
  background-position: top;
  background-repeat: no-repeat;
  background-size: 1920px 1390px;
  `;

  const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-flow: column;
  align-items: flex-start;
  overflow-x: hidden;
  // height: 100vh;
  background-color: #000;
`;

  return (<Wrapper>
    <BackgroundContainer />
    {children}
  </Wrapper>);
}
