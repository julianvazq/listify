import React, { useState, useEffect, useContext } from 'react';
import { Item } from '../ListPage';
import { UserContext } from '../../../context/UserContext';

type ListItemProps = {
  item: Item;
};

const ListItem: React.FC<ListItemProps> = ({ item }) => {
  const { item_id, item_name, last_edit, completed, list_id } = item;
  const { socket } = useContext(UserContext);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setChecked(completed);
  }, [completed]);

  const handleCheck = () => {
    setChecked(!checked);
    socket.emit('UPDATE_ITEM', {
      listId: list_id,
      itemId: item_id,
      property: 'completed',
      value: !checked,
    });
  };

  return (
    <li>
      <input type='checkbox' checked={checked} onChange={handleCheck} />
      {item_name}
    </li>
  );
};

export default ListItem;
