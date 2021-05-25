import styled from 'styled-components'
import backgroundCurvedLines from '../../../assets/images/backgroundCurvedLines.svg'

export const AppWrapper = styled.div`
  display: flex;
  flex-flow: column;
  align-items: flex-start;
  overflow-x: hidden;
  // height: 100vh;
  background-image: url('${backgroundCurvedLines}');
  background-color: #000;
  background-position: top;
  background-repeat: no-repeat;
  background-size: 1920px 1390px;
  shape-rendering: optimizeSpeed;
`;
