import React from 'react';
import PropTypes from 'prop-types';

import {
  List, ListItem, ItemTitle, ItemVicinity, CustomLink,
} from './styles';

const AddressList = ({ addresses }) => {
  if (addresses.length === 0) {
    return null;
  }

  return (
    <List>
      {addresses
        .filter((item) => item.position)
        .map((item) => (
          <ListItem key={item.id}>
            <CustomLink
              to={`/list?lat=${item.position[0]}&long=${item.position[1]}&address=${item.title}`}
            >
              <ItemTitle>{item.title}</ItemTitle>
              <ItemVicinity dangerouslySetInnerHTML={{ __html: item.vicinity }} />
            </CustomLink>
          </ListItem>
        ))}
    </List>
  );
};

AddressList.propTypes = {
  addresses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default AddressList;
