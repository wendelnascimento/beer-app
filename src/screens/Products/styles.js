import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Wrapper = styled.section`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  flex: 1 1 100%;
  margin-top: 32px;
`;

export const Title = styled.h2`
  font-size: 2rem;
  margin-top: 0;
`;

export const SearchContainer = styled.div`
  width: 70vw;
  margin-bottom: 32px;
`;

export const CustomLink = styled(Link)`
  color: #cccccc;

  &:visited {
    color: #cccccc;
  }
`;
