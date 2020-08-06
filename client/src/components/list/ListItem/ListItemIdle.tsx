import React from 'react';
import {
  Item,
  CheckboxContainer,
  ContentContainer,
  ActionsContainer,
  ItemName,
  LastEdit,
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
        <input type='checkbox' checked={checked} onChange={handleCheck} />
      </CheckboxContainer>
      <ContentContainer>
        <ItemName>{itemName}</ItemName>
        <LastEdit italic={lastEdit.italic}>{lastEdit.text}</LastEdit>
      </ContentContainer>
      <ActionsContainer>
        <button onClick={toggleEditModeOn} disabled={editing?.active}>
          Edit
        </button>
        <button onClick={() => deleteItem(item_id)} disabled={editing?.active}>
          Delete
        </button>
      </ActionsContainer>
    </Item>
  );
};

export default ListItemIdle;
