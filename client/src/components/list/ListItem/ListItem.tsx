import React, { useState, useEffect, useContext } from 'react';
import { Item } from '../ListPage';
import { UserContext } from '../../../context/UserContext';

type ListItemProps = {
  item: Item;
  deleteItem: (itemId: string) => void;
};

const COMPLETED = 'completed';
const ITEM_NAME = 'item_name';

const ListItem: React.FC<ListItemProps> = ({ item, deleteItem }) => {
  const { item_id, item_name, last_edit, completed, list_id, editing } = item;
  const { socket, storedUser } = useContext(UserContext);
  const [checked, setChecked] = useState(false);
  const [lastEdit, setLastEdit] = useState<string>('');
  const [editMode, setEditMode] = useState<boolean>(false);
  const [itemName, setItemName] = useState<string>('');

  useEffect(() => {
    setChecked(completed);
  }, [completed]);

  useEffect(() => {
    setItemName(item_name);
  }, [item_name]);

  useEffect(() => {
    setLastEdit(last_edit);
  }, [last_edit]);

  const handleItemNameChange = (e) => {
    setItemName(e.target.value);

    socket.emit('EDITING', {
      listId: list_id,
      item: { id: item_id, name: e.target.value },
      editing: { active: true, by: storedUser.username },
    });
  };

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
    setEditMode(true);

    socket.emit('EDITING', {
      listId: list_id,
      item: { id: item_id, name: itemName },
      editing: { active: true, by: storedUser.username },
    });
  };

  const confirmNameChange = () => {
    setEditMode(false);

    socket.emit(
      'UPDATE_ITEM',
      {
        listId: list_id,
        itemId: item_id,
        property: ITEM_NAME,
        value: itemName,
        user: storedUser,
      },
      () => {
        setLastEdit(storedUser.username);
      }
    );
  };

  const rejectNameChange = (e) => {
    setItemName(item_name);
    setEditMode(false);

    socket.emit('EDITING', {
      listId: list_id,
      item: { id: item_id, name: item_name },
      editing: { active: false, by: storedUser.username },
    });
  };

  if (!editMode) {
    return (
      <li>
        <input type='checkbox' checked={checked} onChange={handleCheck} />
        {itemName}
        <button onClick={toggleEditModeOn} disabled={editing?.active}>
          Edit
        </button>
        <button onClick={() => deleteItem(item_id)}>Delete</button>
        Edit mode: {editing?.active ? `yes by ${editing.by}` : 'no'}
        Last edit: {lastEdit}
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
          onChange={handleItemNameChange}
          onBlur={rejectNameChange}
        />
        <button onClick={rejectNameChange}>No</button>
        <button onMouseDown={confirmNameChange}>Yes</button>
      </li>
    );
  }
};

export default ListItem;
