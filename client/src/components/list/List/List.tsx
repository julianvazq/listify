import React from 'react';
import { Item } from '../ListPage';
import ListItem from '../ListItem/ListItem';

type ListProps = {
  items: Item[];
  deleteItem: (itemId: string) => void;
};

const List: React.FC<ListProps> = ({ items, deleteItem }) => {
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
      </ul>
    </div>
  );
};

export default List;
