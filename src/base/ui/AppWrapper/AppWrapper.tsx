import styled from 'styled-components'
import UnicornSvg from '../../../assets/images/bg.svg'

export const AppWrapper = styled.div`
  display: flex;
  flex-flow: column;
  align-items: flex-start;
  overflow-x: hidden;
  // height: 100vh;
  background: center / cover no-repeat url('${UnicornSvg}');
`;
