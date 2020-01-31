import styled, { keyframes } from 'styled-components';

export const loadingAnimation = keyframes`
  from {
    transform: translate3d(0%, 0, 0);
  }
  to {
    transform: translate3d(200%, 0, 0);
  }
`;

export const blinkErrorAnimation = keyframes`
  0% {
    border-color: #fff;
  }
  50% {
    border-color: #b03c3c;
  }
  100% {
    border-color: #fff;
  }
`;

export const opactityAnimationMessage = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const InputWrapper = styled.div`
  width: 100%;
  position: relative;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.6) 0px 2px 15px -5px;
  overflow-x: hidden;

  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: -100%;
    height: 2px;
    width: 100%;
    background: #000000;
    transform: translate3d(0%, 0, 0);
    transform-origin: left center;
    animation: ${({ loading }) => loading === 'true' && loadingAnimation} 3s infinite ease-in-out
      alternate;
  }
`;

export const CustomInput = styled.input`
  padding: 24px;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  border: 2px solid #fff;
  width: 100%;
  font-size: 1.5rem;
  outline: none;
  transition: border 0.3s cubic-bezier(0.19, 1, 0.22, 1);
  animation: ${({ error }) => error === 'true' && blinkErrorAnimation} 2s 4
    cubic-bezier(0.19, 1, 0.22, 1);

  &::placeholder {
    color: #ddd;
  }

  &:hover,
  &:focus {
    border: 2px solid #f28e1c;
  }
`;

export const ErrorMessage = styled.strong`
  display: block;
  color: #b03c3c;
  font-size: 0.8rem;
  margin-top: 8px;
  opacity: 0;
  animation: ${opactityAnimationMessage} 2s forwards cubic-bezier(0.19, 1, 0.22, 1);
`;
