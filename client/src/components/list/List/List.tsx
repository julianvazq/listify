import React, { useState } from 'react';
import { Item } from '../ListPage';
import ListItem from '../ListItem/ListItem';

type ListProps = {
  items: Item[];
  deleteItem: (itemId: string) => void;
  addItem: (itemName: string) => void;
};

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
    <div>
      <p>{formatListLength(items)}</p>
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
    </div>
  );
};

export default List;
