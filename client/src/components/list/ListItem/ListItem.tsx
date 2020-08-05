import React, { useState, useEffect, useContext } from 'react';
import { Item } from '../ListPage';
import { UserContext } from '../../../context/UserContext';

type ListItemProps = {
  item: Item;
};

const COMPLETED = 'completed';
const ITEM_NAME = 'item_name';

const ListItem: React.FC<ListItemProps> = ({ item }) => {
  const { item_id, item_name, last_edit, completed, list_id, editing } = item;
  const { socket, storedUser } = useContext(UserContext);
  const [checked, setChecked] = useState(false);
  const [editItem, setEditItem] = useState<boolean>(false);
  const [itemName, setItemName] = useState<string>('');

  useEffect(() => {
    setChecked(completed);
  }, [completed]);

  useEffect(() => {
    setItemName(item_name);
  }, [item_name]);

  const handleCheck = () => {
    setChecked(!checked);
    socket.emit('UPDATE_ITEM', {
      listId: list_id,
      itemId: item_id,
      property: COMPLETED,
      value: !checked,
    });
  };

  const toggleEditModeOn = () => {
    setEditItem(true);

    socket.emit('EDITING', {
      listId: list_id,
      itemId: item_id,
      user: storedUser,
      editing: true,
    });
  };

  const confirmNameChange = () => {
    setEditItem(false);

    // Fix onBlur triggering rejectNameChange when this is clicked

    // UPDATE_ITEM goes here
    // socket.emit('UPDATE_ITEM', {
    //     listId: list_id,
    //     itemId: item_id,
    //     property: ITEM_NAME,
    //     value: itemName,
    //   });
  };

  const rejectNameChange = () => {
    setItemName(item_name);
    setEditItem(false);

    socket.emit('EDITING', {
      listId: list_id,
      itemId: item_id,
      user: storedUser,
      editing: false,
    });
  };

  if (!editItem) {
    return (
      <li>
        <input type='checkbox' checked={checked} onChange={handleCheck} />
        {itemName}
        <button onClick={toggleEditModeOn} disabled={editing?.active}>
          Edit
        </button>
        Edit mode: {editing?.active ? `yes by ${editing.by}` : 'no'}
      </li>
    );
  } else {
    return (
      <li>
        <input type='checkbox' checked={checked} onChange={handleCheck} />
        <input
          autoFocus
          type='text'
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          onBlur={rejectNameChange}
        />
        <button onClick={rejectNameChange}>No</button>
        <button onClick={confirmNameChange}>Yes</button>
      </li>
    );
  }
};

export default ListItem;
