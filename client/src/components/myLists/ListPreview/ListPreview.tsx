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
  SuccessIcon,
  CopiedContainer,
} from './ListPreviewStyles';
import { copyToClipboard } from '../../../utils/utils';

const ListPreview = ({ name, id }) => {
  const { deleteUserList } = useContext(UserContext);
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
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

  const getCheckbox = (completed) => {
    if (completed) {
      return <Checkbox />;
    }

    return <CheckboxOutline />;
  };

  const copyLink = async () => {
    // https://listify.julianvazquez.me/list?name=Some%20list&id=27bb81ae-992b-436c-9c2c-a316f236447b
    const url = `https://listify.julianvazquez.me/list?name=${name}&id=${id}`;
    const copySuccess = await copyToClipboard(url);
    setCopied(copySuccess);
  };

  useEffect(() => {
    fetchItems(id);
  }, []);

  useEffect(() => {
    let timer;
    if (copied) {
      timer = setTimeout(() => setCopied(false), 3000);
    }
    return () => clearTimeout(timer);
  }, [copied]);

  return (
    <PreviewContainer>
      <ListName>{name}</ListName>
      <ActionContainer>
        <PrimaryAction onClick={navigateToList}>Go to list</PrimaryAction>
        <SecondaryAction onClick={copyLink}>
          {copied ? (
            <CopiedContainer>
              <SuccessIcon /> Copied
            </CopiedContainer>
          ) : (
            'Copy link'
          )}
        </SecondaryAction>
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
