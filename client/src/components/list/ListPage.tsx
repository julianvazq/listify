import React, { useEffect, useContext } from 'react';
import styled from 'styled-components';
import io from 'socket.io-client';
import { RouteComponentProps } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';

type TParams = { id: string };

const Paragraph = styled.p`
  color: red;
`;

let socket: any;

const ListPage = ({ match }: RouteComponentProps<TParams>) => {
  const { userName, userLists } = useContext(UserContext);
  const { id } = match.params;

  useEffect(() => {
    const listName = findListName(id);

    socket = io('localhost:4000');
    socket.emit(
      'join',
      { listId: id, listName, userName }
      // (res: any) =>
      //   alert(res)
    );

    return () => {
      socket.emit('disconnect');

      socket.off();
    };
  }, [match.params]);

  const findListName = (id: string) => {
    return userLists.find((list) => list.id === id).name;
  };

  return (
    <div>
      List Page
      <Paragraph>HAHAHA</Paragraph>
    </div>
  );
};

export default ListPage;
