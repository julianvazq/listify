import React from 'react';

const ListItemEditing = ({
  checked,
  handleCheck,
  itemName,
  handleItemNameChange,
  confirmNameChange,
  rejectNameChange,
}: any) => {
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
};

export default ListItemEditing;
