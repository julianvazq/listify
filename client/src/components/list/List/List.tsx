import React, { useState } from 'react';
import { Item } from '../ListPage';
import ListItem from '../ListItem/ListItem';
import styled from 'styled-components';
import NewItemInput from '../NewItemInput/NewItemInput';

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
  font-weight: 600;
`;

const List: React.FC<ListProps> = ({ items, deleteItem, addItem }) => {
  const [newItemName, setNewItemName] = useState<string>('');

  const handleAddItem = () => {
    if (newItemName !== '') {
      addItem(newItemName);
      setNewItemName('');
    }
  };

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
        <NewItemInput
          newItemName={newItemName}
          setNewItemName={setNewItemName}
          handleAddItem={handleAddItem}
        />
      </ul>
    </ListContainer>
  );
};

export default List;
