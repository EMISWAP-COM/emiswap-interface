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
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;
