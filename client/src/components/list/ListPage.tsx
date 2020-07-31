import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import io from 'socket.io-client';
import { RouteComponentProps, useHistory } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import CreateButton from '../home/CreateButton/CreateButton';

type MatchProps = { id: string };

type ErrorState = { error: string } | null;

const Paragraph = styled.p`
  color: red;
`;

let socket: any;

const ListPage = ({ match }: RouteComponentProps<MatchProps>) => {
  const { storedUser, userLists } = useContext(UserContext);
  const [listName, setListName] = useState<string | null>(null);
  const [error, setError] = useState<ErrorState>(null);
  const history = useHistory();
  const { id } = match.params;

  useEffect(() => {
    console.log((history.length = 0));
    /* Clear error */
    setError(null);

    /* Find if list exists */
    const storedListName = findListName(id);

    if (!storedListName) {
      setError({ error: 'List does not exist.' });
      return;
    }

    socket = io('localhost:4000');
    socket.emit(
      'join',
      { listId: id, listName: storedListName, storedUser }
      // (res: any) =>
      //   alert(res)
    );

    setListName(storedListName);

    return () => {
      socket.emit('disconnect');

      socket.off();
    };
  }, [id]);

  const findListName = (id: string): string | undefined => {
    const list = userLists.find((storedList) => storedList.id === id);

    if (!list) {
      return undefined;
    }

    return list.name;
  };

  /* Check if there are any lists in LocalStorage */
  if (userLists.length === 0) {
    return (
      <>
        <h1>You have no saved lists.</h1>
        <CreateButton />
      </>
    );
  }

  /* Display error if list is not in LocalStorage */
  if (error) {
    return (
      <>
        <h1>{error.error}</h1>
        <CreateButton />
      </>
    );
  }

  return (
    <div>
      <h1>{listName}</h1>
      <Paragraph>HAHAHA</Paragraph>
    </div>
  );
};

export default ListPage;
