import React from 'react';
import PropTypes from 'prop-types';

import {
  List, ListItem, ItemTitle, ItemVicinity,
} from './styles';

const AddressList = ({ addresses }) => {
  if (addresses.length === 0) {
    return null;
  }

  return (
    <List>
      {addresses.map((item) => (
        <ListItem key={item.id}>
          <ItemTitle>{item.title}</ItemTitle>
          <ItemVicinity dangerouslySetInnerHTML={{ __html: item.vicinity }} />
        </ListItem>
      ))}
    </List>
  );
};

AddressList.propTypes = {
  addresses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default AddressList;
