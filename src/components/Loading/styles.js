import styled, { keyframes } from 'styled-components';

export const bounceAndRotate = keyframes`
  0% {
    transform: scale3d(.8, .8, 1);
  }
  25% {
    transform: scale3d(1.5, 1.5, 1);
  }
  50% {
    transform: scale3d(.8, .8, 1);
  }
  75% {
    transform: rotate3d(0, 0, 1, 180deg);
  }
  100% {
    transform: scale3d(1, 1, 1), rotate3d(0, 0, 1, 360deg);
  }
`;

export const Wrapper = styled.div`
  position: fixed;
  z-index: 10;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.6);
`;

export const Beer = styled.span`
  font-size: 7rem;
  transform: scale3d(1, 1, 1), rotate3d(0, 0, 1, 0deg);
  animation: ${bounceAndRotate} 2s infinite linear;
`;
