import React, { useState } from 'react';
import {
  Item,
  CheckboxContainer,
  ContentContainer,
  ActionsContainer,
  LastEdit,
  Input,
  Checkbox,
  CheckboxOutline,
  RevertChangesButton,
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
  const [textAreaHeight, setTextAreaHeight] = useState<number>(20.8);

  const handleTextAreaHeight = (e) => {
    setTextAreaHeight(e.target.scrollHeight);
  };

  const handleTextArea = (e) => {
    handleItemNameChange(e);
    handleTextAreaHeight(e);
  };

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
          height={textAreaHeight}
          autoFocus
          onFocus={handleTextAreaHeight}
          value={itemName}
          onChange={handleTextArea}
          // onBlur={rejectNameChange}
        />
        <LastEdit italic={lastEdit.italic}>{lastEdit.text}</LastEdit>
      </ContentContainer>
      <ActionsContainer>
        <button onClick={rejectNameChange}>
          <RevertChangesButton />
        </button>
        <button onMouseDown={confirmNameChange}>
          <SubmitButton grayedOut={itemName === ''} />
        </button>
      </ActionsContainer>
    </Item>
  );
};

export default ListItemEditing;
