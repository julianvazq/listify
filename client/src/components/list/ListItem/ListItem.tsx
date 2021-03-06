import React, { useState, useEffect, useContext } from 'react';
import { Item } from '../ListPage';
import { UserContext } from '../../../context/UserContext';
import ListItemIdle from './ListItemIdle';
import ListItemEditing from './ListItemEditing';

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

  const handleCheck = (checkState) => {
    if (!editing?.active) {
      socket.emit(UPDATE_ITEM_EVENT, {
        listId: list_id,
        itemId: item_id,
        property: COMPLETED_PROPERTY,
        value: checkState,
      });
    }
  };

  const toggleEditModeOn = () => {
    if (!editing?.active) {
      setEditMode(true);

      socket.emit(EDITING_ITEM_EVENT, {
        listId: list_id,
        item: { id: item_id, name: itemName },
        editing: {
          active: true,
          by: storedUser.username,
          userId: storedUser.id,
        },
      });
    }
  };

  const confirmNameChange = () => {
    if (itemName !== '') {
      setEditMode(false);

      socket.emit(UPDATE_ITEM_EVENT, {
        listId: list_id,
        itemId: item_id,
        property: ITEM_NAME_PROPERTY,
        value: itemName,
        user: storedUser,
      });
    }
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

  const getLastEdit = () => {
    /* If another user is currently editing */
    if (editing?.active && editing?.userId !== storedUser.id) {
      return { text: `${editing.by} is editing...`, italic: true };
    }

    /* If another user is not currently editing */
    if (lastEdit?.id === storedUser.id) {
      return { text: `Last edit by ${lastEdit?.name} (You)`, italic: false };
    } else {
      return { text: `Last edit by ${lastEdit?.name}`, italic: false };
    }

    /* Previous working logic */
    // {editing?.active &&
    //   editing?.userId !== storedUser.id &&
    //   `${editing.by} is editing...`}
    // Last edit:{' '}
    // {lastEdit?.id === storedUser.id
    //   ? `Last edit by ${lastEdit?.name} (You)`
    //   : `Last edit by ${lastEdit?.name}`}
  };

  if (!editMode) {
    return (
      <ListItemIdle
        checked={checked}
        handleCheck={handleCheck}
        item={item}
        itemName={itemName}
        toggleEditModeOn={toggleEditModeOn}
        deleteItem={deleteItem}
        lastEdit={getLastEdit()}
      />
    );
  } else {
    return (
      <ListItemEditing
        checked={checked}
        handleCheck={handleCheck}
        itemName={itemName}
        lastEdit={getLastEdit()}
        handleItemNameChange={handleItemNameChange}
        confirmNameChange={confirmNameChange}
        rejectNameChange={rejectNameChange}
      />
    );
  }
};

export default ListItem;
