import React from 'react';

const ListItemIdle = ({
  checked,
  handleCheck,
  item,
  itemName,
  toggleEditModeOn,
  deleteItem,
  lastEdit,
  storedUser,
}: any) => {
  const { item_id, editing } = item;
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
};

export default ListItemIdle;
