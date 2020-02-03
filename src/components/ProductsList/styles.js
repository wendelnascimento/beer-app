import styled from 'styled-components';

export const List = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0 32px 32px;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 16px 32px;
  text-align: center;

  @media screen and (max-width: 900px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media screen and (max-width: 700px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media screen and (max-width: 390px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

export const EmptyText = styled.h2`
  margin-left: auto;
  margin-right: auto;
`;
