import React from 'react';
import {
  Item,
  CheckboxContainer,
  ContentContainer,
  ActionsContainer,
  LastEdit,
} from './ListItemStyles';

const ListItemEditing = ({
  checked,
  handleCheck,
  itemName,
  lastEdit,
  handleItemNameChange,
  confirmNameChange,
  rejectNameChange,
}: any) => {
  return (
    <Item>
      <CheckboxContainer>
        <input type='checkbox' checked={checked} onChange={handleCheck} />
      </CheckboxContainer>
      <ContentContainer>
        <input
          autoFocus
          type='text'
          value={itemName}
          onChange={handleItemNameChange}
          onBlur={rejectNameChange}
        />
        <LastEdit italic={lastEdit.italic}>{lastEdit.text}</LastEdit>
      </ContentContainer>
      <ActionsContainer>
        <button onClick={rejectNameChange}>No</button>
        <button onMouseDown={confirmNameChange}>Yes</button>
      </ActionsContainer>
    </Item>
  );
};

export default ListItemEditing;
