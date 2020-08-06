import React, { useState, useEffect, useContext } from 'react';
import { Item } from '../ListPage';
import { UserContext } from '../../../context/UserContext';

type ListItemProps = {
  item: Item;
  deleteItem: (itemId: string) => void;
};

type LastEdit = {
  name: string;
  id: string;
};

const COMPLETED_PROPERTY = 'completed';
const ITEM_NAME_PROPERTY = 'item_name';

const EDITING_ITEM_EVENT = 'EDITING_ITEM';
const UPDATE_ITEM_EVENT = 'UPDATE_ITEM';

const ListItem: React.FC<ListItemProps> = ({ item, deleteItem }) => {
  const {
    item_id,
    item_name,
    last_edit_name,
    last_edit_id,
    completed,
    list_id,
    editing,
  } = item;
  const { socket, storedUser } = useContext(UserContext);
  const [checked, setChecked] = useState(false);
  const [lastEdit, setLastEdit] = useState<LastEdit | null>(null);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [itemName, setItemName] = useState<string>('');

  useEffect(() => {
    setChecked(completed);
  }, [completed]);

  useEffect(() => {
    setItemName(item_name);
  }, [item_name]);

  useEffect(() => {
    setLastEdit({ name: last_edit_name, id: last_edit_id });
  }, [last_edit_name, last_edit_id]);

  const handleItemNameChange = (e) => {
    setItemName(e.target.value);

    socket.emit(EDITING_ITEM_EVENT, {
      listId: list_id,
      item: { id: item_id, name: e.target.value },
      editing: { active: true, by: storedUser.username, id: storedUser.id },
    });
  };

  const handleCheck = () => {
    setChecked(!checked);
    socket.emit(UPDATE_ITEM_EVENT, {
      listId: list_id,
      itemId: item_id,
      property: COMPLETED_PROPERTY,
      value: !checked,
    });
  };

  const toggleEditModeOn = () => {
    setEditMode(true);

    socket.emit(EDITING_ITEM_EVENT, {
      listId: list_id,
      item: { id: item_id, name: itemName },
      editing: { active: true, by: storedUser.username, userId: storedUser.id },
    });
  };

  const confirmNameChange = () => {
    setEditMode(false);

    socket.emit(UPDATE_ITEM_EVENT, {
      listId: list_id,
      itemId: item_id,
      property: ITEM_NAME_PROPERTY,
      value: itemName,
      user: storedUser,
    });
  };

  const rejectNameChange = () => {
    setItemName(item_name);
    setEditMode(false);

    socket.emit(EDITING_ITEM_EVENT, {
      listId: list_id,
      item: { id: item_id, name: item_name },
      editing: { active: false, by: storedUser.username, id: storedUser.id },
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
        <button onClick={() => deleteItem(item_id)} disabled={editing?.active}>
          Delete
        </button>
        {/* When a item is added, items that are being edited maintain their 
        'editing' state. For that reason, we need this to avoid showing 
        'USER is editing...' where USER was the one editing */}
        {editing?.active &&
          editing?.userId !== storedUser.id &&
          `${editing.by} is editing...`}
        Last edit:{' '}
        {lastEdit?.id === storedUser.id
          ? `Last edit by ${lastEdit.name} (You)`
          : `Last edit by ${lastEdit?.name}`}
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
          // onBlur={rejectNameChange}
        />
        <button onClick={rejectNameChange}>No</button>
        <button onMouseDown={confirmNameChange}>Yes</button>
      </li>
    );
  }
};

export default ListItem;
