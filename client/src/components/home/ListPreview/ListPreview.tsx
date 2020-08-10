import React, { useState, useEffect } from 'react';
import { Item } from '../../list/ListPage';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

const PreviewContainer = styled.article`
  width: 100%;
  padding: 2rem;
  background: hsl(228, 30%, 90%);
  border-radius: 0.3rem;
  display: flex;
  flex-direction: column;
`;

const ListName = styled.h3`
  margin-bottom: 1rem;
  font-size: 2rem;
  letter-spacing: 1px;
  color: hsl(228, 26%, 35%);
`;

const ActionContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
`;

const PrimaryAction = styled.button`
  font-weight: 500;
  font-size: 0.85rem;
  padding: 0.5rem 1rem;
  border-radius: 0.3rem;
  background: hsl(228, 26%, 55%);
  color: var(--light);
  text-transform: uppercase;
  letter-spacing: 1px;
  display: inline-block;
  width: 48%;
`;

const SecondaryAction = styled.button`
  display: inline-block;
  border-radius: 0.3rem;
  font-weight: 500;
  font-size: 0.85rem;
  padding: 0.5rem 1rem;
  border-radius: 0.3rem;
  background: hsl(228, 50%, 85%);
  color: hsl(228, 50%, 30%);
  text-transform: uppercase;
  letter-spacing: 1px;
  width: 48%;
`;

const DeleteAction = styled(SecondaryAction)`
  border: none;
  background: var(--light);
  color: hsl(0, 0%, 45%);
  width: 100%;
`;

const List = styled.ul`
  list-style: none;
  margin-bottom: 2rem;
  flex: 1;
`;

const ListItem = styled.li`
  margin-bottom: 0.5rem;
  padding-bottom: 0.5rem;
  font-weight: 500;
  font-size: 1.125rem;
`;

const ListPreview = ({ name, id }) => {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const history = useHistory();

  const fetchItems = async (id) => {
    setError(false);
    setLoading(true);
    const res = await fetch(`http://localhost:4000/list/${id}`);
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

  useEffect(() => {
    fetchItems(id);
  }, []);

  return (
    <PreviewContainer>
      <ListName onClick={navigateToList}>{name}</ListName>
      <ActionContainer>
        <PrimaryAction>Go to list</PrimaryAction>
        <SecondaryAction>Copy link</SecondaryAction>
      </ActionContainer>
      <List>
        {loading && <ListItem>'Loading...'</ListItem>}
        {error && <ListItem>'Could not fetch list.'</ListItem>}
        {!loading && !items.length
          ? 'No items added yet.'
          : items
              .slice(0, 3)
              .map((item) => (
                <ListItem key={item.item_id}>{item.item_name}</ListItem>
              ))}
      </List>
      <DeleteAction>Forget list</DeleteAction>
    </PreviewContainer>
  );
};

export default ListPreview;
