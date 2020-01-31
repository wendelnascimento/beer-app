import styled from 'styled-components';

export const List = styled.ul`
  list-style-type: none;
  padding: 16px;
  margin: 0;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  border-top: 1px solid #eee;
  box-shadow: rgba(0, 0, 0, 0.6) 0px 14px 23px -16px;
  background: #ffffff;
  max-height: 300px;
  overflow-y: scroll;
`;

export const ListItem = styled.li`
  padding: 8px;
  width: 100%;
`;

export const ItemTitle = styled.span`
  display: block;
  font-size: 1.2rem;
`;

export const ItemVicinity = styled.span`
  display: block;
  color: #cccccc;
  font-size: 1rem;
`;
