import React, { useState } from 'react';
import {
  Input,
  ActionContainer,
  FlexContainer,
  AddButton,
} from './NewItemInputStyles';
import { CheckboxOutline } from '../ListItem/ListItemStyles';

const NewItemInput = ({ newItemName, setNewItemName, handleAddItem }) => {
  const [textAreaHeight, setTextAreaHeight] = useState<number>(20.8);

  const handleTextAreaHeight = (e) => {
    setTextAreaHeight(e.target.scrollHeight);
  };

  const handleNewItemNameChange = (e) => {
    setNewItemName(e.target.value);
    handleTextAreaHeight(e);
  };

  return (
    <FlexContainer>
      <CheckboxOutline />
      <Input
        height={textAreaHeight}
        value={newItemName}
        placeholder='New item'
        onChange={handleNewItemNameChange}
      />
      <ActionContainer>
        <button onClick={() => handleAddItem(newItemName)}>
          <AddButton grayedOut={newItemName === ''} />
        </button>
      </ActionContainer>
    </FlexContainer>
  );
};

export default NewItemInput;
