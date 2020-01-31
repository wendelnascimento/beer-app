import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const List = styled.ul`
  list-style-type: none;
  padding: 16px 0;
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
  padding: 8px 24px;
  width: 100%;

  &:not(:last-child) {
    border-bottom: 1px solid #fafafa;
    padding-bottom: 24px;
  }
`;

export const ItemTitle = styled.span`
  display: block;
  font-size: 1.2rem;
  color: #000000;
`;

export const ItemVicinity = styled.span`
  display: block;
  color: #cccccc;
  font-size: 1rem;
`;

export const CustomLink = styled(Link)`
  text-decoration: none;
`;
