import React, { useState, useEffect, useContext } from 'react';
import { Item, EditMode } from '../ListPage';
import { UserContext } from '../../../context/UserContext';

type ListItemProps = {
  item: Item;
};

const COMPLETED = 'completed';
const ITEM_NAME = 'item_name';

const ListItem: React.FC<ListItemProps> = ({ item }) => {
  const { item_id, item_name, last_edit, completed, list_id, edit_mode } = item;
  const { socket, storedUser } = useContext(UserContext);
  const [checked, setChecked] = useState(false);
  //   const [editMode, setEditMode] = useState<EditMode>();
  const [editItem, setEditItem] = useState<boolean>(false);
  const [itemName, setItemName] = useState<string>('');

  useEffect(() => {
    setChecked(completed);
  }, [completed]);

  useEffect(() => {
    setItemName(item_name);
  }, [item_name]);

  //   useEffect(() => {
  //     if (edit_mode !== undefined) {
  //       setEditMode(edit_mode);
  //     }
  //   }, [edit_mode]);

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

    socket.emit('EDIT_MODE', {
      listId: list_id,
      itemId: item_id,
      user: storedUser,
      editMode: true,
    });
  };

  const confirmNameChange = () => {
    setEditItem(false);
  };

  const rejectNameChange = () => {
    setItemName(item_name);
    setEditItem(false);

    socket.emit('EDIT_MODE', {
      listId: list_id,
      itemId: item_id,
      user: storedUser,
      editMode: false,
    });
  };

  if (!editItem) {
    return (
      <li>
        <input type='checkbox' checked={checked} onChange={handleCheck} />
        {itemName}
        <button onClick={toggleEditModeOn} disabled={edit_mode?.editting}>
          Edit
        </button>
        Edit mode: {edit_mode?.editting ? `yes by ${edit_mode.by}` : 'no'}
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
