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

  const handleTextAreaHeight = (height) => {
    setTextAreaHeight(height);
  };

  const handleNewItemNameChange = (e) => {
    setNewItemName(e.target.value);

    /* Reset textarea height if empty */
    if (e.target.value === '') {
      handleTextAreaHeight(20.8);
    } else {
      handleTextAreaHeight(e.target.scrollHeight);
    }
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
          <AddButton $grayedOut={newItemName === ''} />
        </button>
      </ActionContainer>
    </FlexContainer>
  );
};

export default NewItemInput;
