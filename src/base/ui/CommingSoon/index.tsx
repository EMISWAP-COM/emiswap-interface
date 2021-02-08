import styled from 'styled-components'

export const CommingSoon = styled.div`
  position: relative;
  
  &:after {
    position: absolute;
    content: 'soon';
    background: #E85E59;
    // width: 30px;
    // height: 20px; 
    border-radius: 12px;
    padding: 0 8px;
    top: -12px;
    right: -5px; 
    text-transform: lowercase;
    color: white;
    font-weight: 600;
    font-size: 14px;
    z-index: 10;
  }
`;
