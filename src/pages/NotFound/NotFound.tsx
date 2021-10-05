import React from 'react';
import styled from 'styled-components';

export const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Light = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  background: radial-gradient(
    circle 16rem at var(--cursorXPos) var(--cursorYPos),
    rgba(93, 9, 225, 0.8) 2.82%,
    rgba(228, 120, 255, 0.8) 44.87%,
    rgba(132, 121, 255, 0.8) 62.28%,
    rgba(0, 0, 0, 1) 100%
  );
  z-index: 11;
  top: 0;
`;

export const Text404 = styled.h2`
  font-family: IBM Plex Sans;
  font-style: normal;
  font-weight: 300;
  font-size: 640px;
  color: #000;
  letter-spacing: -0.01em;
  z-index: 20;

  ${({ theme }) => theme.mediaWidth.upToTabletop`
    font-size: 200px;
  `};
`;

const NotFound = props => {
  function updateLightPos(event) {
    window.requestAnimationFrame(() => {
      document.documentElement.style.setProperty('--cursorXPos', `${event.clientX}px`);
      document.documentElement.style.setProperty('--cursorYPos', `${event.clientY}px`);
    });
  }

  React.useEffect(() => {
    document.documentElement.style.setProperty('--cursorXPos', window.innerWidth / 2 + 'px');
    document.documentElement.style.setProperty('--cursorYPos', window.innerHeight / 2 + 'px');

    document.addEventListener('mousemove', updateLightPos);

    return () => {
      document.removeEventListener('mousemove', updateLightPos);
    };
  }, []);

  const handleClick = () => {
    const { history } = props;

    history.push('/swap');
  };

  return (
    <Wrapper onClick={handleClick}>
      <Light />
      <Text404>404</Text404>
    </Wrapper>
  );
};

export default NotFound;
