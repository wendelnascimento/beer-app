import styled from 'styled-components';

export const List = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0 0 16px;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-gap: 16px;

  @media screen and (max-width: 900px) {
    grid-template-columns: repeat(5, 1fr);
  }

  @media screen and (max-width: 600px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media screen and (max-width: 460px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media screen and (max-width: 350px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const ListItem = styled.li`
  border: 2px solid #000;
  border-radius: 5px;
  overflow: hidden;
  transition: border-color 0.3s cubic-bezier(0.19, 1, 0.22, 1);

  &:hover {
    border-color: #f28e1c;
  }
`;

export const ItemButton = styled.button`
  width: 100%;
  padding: 8px 16px;
  border: none;
  font-weight: 700;
  text-align: center;
  background: #ffffff;

  &:hover {
    cursor: pointer;
  }
`;
