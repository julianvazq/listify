import React, { useState } from 'react';
import {
  Item,
  CheckboxContainer,
  ContentContainer,
  ActionsContainer,
  LastEdit,
  TextArea,
  Checkbox,
  CheckboxOutline,
  RevertChangesButton,
  SubmitButton,
  IconContainer,
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
          <button onClick={() => handleCheck(false)}>
            <Checkbox grayedOut={false} />
          </button>
        ) : (
          <button onClick={() => handleCheck(true)}>
            <CheckboxOutline grayedOut={false} />
          </button>
        )}
      </CheckboxContainer>
      <ContentContainer>
        <TextArea
          height={textAreaHeight}
          autoFocus
          onFocus={handleTextAreaHeight}
          value={itemName}
          onChange={handleTextArea}
          onBlur={rejectNameChange}
        />
        <LastEdit italic={lastEdit.italic}>{lastEdit.text}</LastEdit>
      </ContentContainer>
      <ActionsContainer>
        <button onClick={rejectNameChange}>
          <RevertChangesButton />
        </button>
        <button onMouseDown={confirmNameChange}>
          <SubmitButton />
        </button>
      </ActionsContainer>
    </Item>
  );
};

export default ListItemEditing;
