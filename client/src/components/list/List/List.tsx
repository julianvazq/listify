import React, { useState } from 'react';
import { Item } from '../ListPage';
import ListItem from '../ListItem/ListItem';
import styled from 'styled-components';

type ListProps = {
  items: Item[];
  deleteItem: (itemId: string) => void;
  addItem: (itemName: string) => void;
};

const ListContainer = styled.div`
  ul {
    list-style: none;
  }
`;

const ItemCount = styled.p`
  color: var(--gray);
  margin-bottom: 2rem;
`;

const List: React.FC<ListProps> = ({ items, deleteItem, addItem }) => {
  const [newItemName, setNewItemName] = useState<string>('');

  const formatListLength = (items) => {
    if (items.length === 0) {
      return 'No items';
    } else if (items.length === 1) {
      return '1 item';
    } else {
      return `${items.length} items`;
    }
  };

  return (
    <ListContainer>
      <ItemCount>{formatListLength(items)}</ItemCount>
      <ul>
        {items.map((item) => (
          <ListItem key={item.item_id} item={item} deleteItem={deleteItem} />
        ))}
        <li>
          <input
            type='text'
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
          />
          <button onClick={() => addItem(newItemName)}>Add</button>
        </li>
      </ul>
    </ListContainer>
  );
};

export default List;
