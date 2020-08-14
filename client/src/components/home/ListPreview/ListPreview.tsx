import React, { useState, useEffect, useContext } from 'react';
import { Item } from '../../list/ListPage';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../../../context/UserContext';
import {
  PreviewContainer,
  ListName,
  ActionContainer,
  PrimaryAction,
  SecondaryAction,
  List,
  ListItem,
  DeleteAction,
  Checkbox,
  CheckboxOutline,
} from './ListPreviewStyles';

const ListPreview = ({ name, id }) => {
  const { deleteUserList } = useContext(UserContext);
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const history = useHistory();

  const fetchItems = async (id) => {
    setError(false);
    setLoading(true);
    const res = await fetch(`https://localhost:4000/list/${id}`);
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

  const getCheckbox = (completed) => {
    if (completed) {
      return <Checkbox />;
    }

    return <CheckboxOutline />;
  };

  useEffect(() => {
    fetchItems(id);
  }, []);

  return (
    <PreviewContainer>
      <ListName>{name}</ListName>
      <ActionContainer>
        <PrimaryAction onClick={navigateToList}>Go to list</PrimaryAction>
        <SecondaryAction>Copy link</SecondaryAction>
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
      <DeleteAction onClick={() => deleteUserList(id)}>
        Forget list
      </DeleteAction>
    </PreviewContainer>
  );
};

export default ListPreview;
