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
          <Checkbox
            onClick={() => handleCheck(false)}
            grayedOut={editing?.active}
          />
        ) : (
          <CheckboxOutline
            onClick={() => handleCheck(true)}
            grayedOut={editing?.active}
          />
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
          <EditButton grayedOut={editing?.active} />
        </button>
      </ActionsContainer>
    </Item>
  );
};

export default ListItemIdle;
