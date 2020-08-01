import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import queryString from 'query-string';
import io from 'socket.io-client';
import { RouteComponentProps } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import CreateButton from '../home/CreateButton/CreateButton';

type LocationProps = { search: string };

type ErrorState = { error: string } | null;

const Paragraph = styled.p`
  color: red;
`;

let socket;

const ListPage = ({ location }: RouteComponentProps<LocationProps>) => {
  const { storedUser, userLists, addUserList } = useContext(UserContext);
  const [listName, setListName] = useState<string | null>(null);
  const [error, setError] = useState<ErrorState>(null);
  const { name, id, new: isNewList } = queryString.parse(location.search);

  const updateURL = () => {
    window.history.replaceState(
      null,
      '',
      `${location.pathname}?name=${name}&id=${id}`
    );
  };

  useEffect(() => {
    console.log(queryString.parse(location.search));

    // setListName(name);
    /* Clear error */
    setError(null);

    socket = io('localhost:4000');
    socket.emit('join', {
      isNewList: isNewList !== undefined ? true : false,
      listId: id,
      listName: name,
      user: storedUser,
    });
    // (res: any) =>
    //   alert(res)
    // );

    // setListName(storedListName);

    // return () => {
    //   socket.emit('disconnect');

    //   socket.off();
    // };
  }, [location.search]);

  /* Check if there are any lists in LocalStorage */
  // if (userLists.length === 0) {
  //   return (
  //     <>
  //       <h1>You have no saved lists.</h1>
  //       <CreateButton />
  //     </>
  //   );
  // }

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
      <h2>LIST PAGE</h2>
      <Paragraph>HAHAHA</Paragraph>
    </div>
  );
};

export default ListPage;
