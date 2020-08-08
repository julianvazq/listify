import React from 'react';
import {
  Item,
  CheckboxContainer,
  ContentContainer,
  ActionsContainer,
  ItemName,
  LastEdit,
  EditButton,
  DeleteButton,
  Checkbox,
  CheckboxOutline,
  IconContainer,
} from './ListItemStyles';

const ListItemIdle = ({
  checked,
  handleCheck,
  item,
  itemName,
  toggleEditModeOn,
  deleteItem,
  lastEdit,
}: any) => {
  const { item_id, editing } = item;
  return (
    <Item>
      <CheckboxContainer>
        {checked ? (
          <button onClick={() => handleCheck(false)}>
            <Checkbox grayedOut={editing?.active} />
          </button>
        ) : (
          <button onClick={() => handleCheck(true)}>
            <CheckboxOutline grayedOut={editing?.active} />
          </button>
        )}
      </CheckboxContainer>
      <ContentContainer onClick={toggleEditModeOn}>
        <ItemName>{itemName}</ItemName>
        <LastEdit italic={lastEdit.italic}>{lastEdit.text}</LastEdit>
      </ContentContainer>
      <ActionsContainer>
        <button onClick={() => deleteItem(item_id)} disabled={editing?.active}>
          <DeleteButton grayedOut={editing?.active} />
        </button>
        <button onClick={toggleEditModeOn} disabled={editing?.active}>
          <IconContainer grayedOut={editing?.active}>
            <EditButton />
          </IconContainer>
        </button>
      </ActionsContainer>
    </Item>
  );
};

export default ListItemIdle;
