import styled from 'styled-components';

export const CustomInput = styled.input`
  padding: 24px;
  border-radius: 5px;
  border: 2px solid #fff;
  box-shadow: rgba(0, 0, 0, 0.6) 0px 2px 15px -5px;
  width: 70%;
  font-size: 1.5rem;
  outline: none;
  transition: border 0.3s cubic-bezier(0.19, 1, 0.22, 1);

  &::placeholder {
    color: #ddd;
  }

  &:hover,
  &:focus {
    border: 2px solid #f28e1c;
  }
`;
