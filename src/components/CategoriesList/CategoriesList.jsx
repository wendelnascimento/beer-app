import React from 'react';
import PropTypes from 'prop-types';

import { List, ListItem, ItemButton } from './styles';

const CategoriesList = ({ categories, onSelect }) => (
  <List>
    <ListItem>
      <ItemButton onClick={() => onSelect(null)}>Todos</ItemButton>
    </ListItem>
    {categories.map((c) => (
      <ListItem key={c.id}>
        <ItemButton onClick={() => onSelect(c.id)}>{c.title}</ItemButton>
      </ListItem>
    ))}
  </List>
);

CategoriesList.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.object).isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default CategoriesList;
