import React from 'react';
import {
  Item,
  CheckboxContainer,
  ContentContainer,
  ActionsContainer,
  LastEdit,
  Input,
  Checkbox,
  CheckboxOutline,
  DeleteButton,
  SubmitButton,
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
        {checked ? (
          <Checkbox onClick={() => handleCheck(false)} />
        ) : (
          <CheckboxOutline onClick={() => handleCheck(true)} />
        )}
      </CheckboxContainer>
      <ContentContainer>
        <Input
          autoFocus
          //   type='text'
          value={itemName}
          onChange={handleItemNameChange}
          //   onBlur={rejectNameChange}
        />
        <LastEdit italic={lastEdit.italic}>{lastEdit.text}</LastEdit>
      </ContentContainer>
      <ActionsContainer>
        <button onClick={rejectNameChange}>
          <DeleteButton />
        </button>
        <button onMouseDown={confirmNameChange}>
          <SubmitButton />
        </button>
      </ActionsContainer>
    </Item>
  );
};

export default ListItemEditing;
