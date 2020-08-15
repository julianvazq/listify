import React, { useState, useEffect, useContext } from 'react';
import { Item } from '../../list/ListPage';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../../../context/UserContext';
import {
  PreviewContainer,
  ListName,
  ActionContainer,
  PrimaryAction,
  List,
  ListItem,
  DeleteAction,
  Checkbox,
  CheckboxOutline,
} from './ListPreviewStyles';
import CopyButton from '../../shared/CopyButton/CopyButton';

const ListPreview = ({ name, id }) => {
  const { socket, storedUser, deleteUserList } = useContext(UserContext);
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const history = useHistory();

  const fetchItems = async (id) => {
    setError(false);
    setLoading(true);
    const res = await fetch(`/list/${id}`);
    if (res.status === 200) {
      const items = await res.json();
      setItems(items);
      setLoading(false);
    } else {
      setError(true);
      setLoading(false);
    }
  };

  const navigateToList = () => {
    history.push(`/list?name=${name}&id=${id}`);
  };

  const getCheckbox = (completed: boolean) => {
    if (completed) {
      return <Checkbox />;
    }

    return <CheckboxOutline />;
  };

  const leaveList = (id) => {
    socket.emit(
      'LEAVE_LIST',
      {
        listId: id,
        user: storedUser,
      },
      () => {
        deleteUserList(id);
      }
    );
  };

  useEffect(() => {
    fetchItems(id);
  }, []);

  return (
    <PreviewContainer>
      <ListName>{name}</ListName>
      <ActionContainer>
        <PrimaryAction onClick={navigateToList}>Go to list</PrimaryAction>
        <CopyButton name={name} id={id} />
      </ActionContainer>
      <List>
        {loading && <ListItem>Loading...</ListItem>}
        {error && <ListItem>'Could not fetch list.'</ListItem>}
        {!loading && !items.length
          ? 'No items added yet.'
          : items.slice(0, 3).map((item, index) => (
              <ListItem key={index} onClick={navigateToList}>
                {getCheckbox(item.completed)} {item.item_name}
              </ListItem>
            ))}
      </List>
      <DeleteAction onClick={() => leaveList(id)}>Leave list</DeleteAction>
    </PreviewContainer>
  );
};

export default ListPreview;
