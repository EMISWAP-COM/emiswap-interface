import styled from 'styled-components/macro';
import backgroundCurvedLines from '../../../assets/images/backgroundCurvedLines.svg';

export const AppWrapper = styled.div<{ is404Page: boolean }>`
  display: flex;
  flex-flow: column;
  align-items: flex-start;
  overflow-x: hidden;
  min-height: 100vh;
  shape-rendering: optimizeSpeed;
  background-image: url('${backgroundCurvedLines}');
  background-color: #000;
  background-position: top;
  background-repeat: no-repeat;
  background-size: 1920px 1390px;

  ${({ is404Page }) => !is404Page
      ? `
          background-image: url('${backgroundCurvedLines}');
          background-color: #000;
          background-position: top;
          background-repeat: no-repeat;
          background-size: 1920px 1390px;
        `
      : `
          overflow: hidden;
          position: relative;

          :before {
            content: '';
            position: absolute;
            width: 150%;
            height: 150%;
            top: 0;
            left: -50%;
            z-index: 2;
            background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' version='1.1' height='240px' width='240px'><text x='0' y='15' fill='black' font-size='16px' font-family='IBM Plex Sans, sans-serif;'>Page not found</text></svg>");
            transform: rotate(-45deg);
          }
          :after {
            content: '';
            position: absolute;
            width: 150%;
            height: 150%;
            top: 0;
            left: -50%;
            z-index: 1;
            background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' version='1.1' height='240px' width='240px'><text x='0' y='15' fill='black' font-size='16px' font-family='IBM Plex Sans, sans-serif;'>Page not found</text></svg>");
            transform: rotate(-45deg) translate(120px,120px);
          }
        `};
`;
