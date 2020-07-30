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
  const { userName } = useContext(UserContext);
  console.log(match.params);

  useEffect(() => {
    socket = io('localhost:4000');
    socket.emit('join', { id: match.params.id, name: userName });

    return () => {
      socket.emit('disconnect');
    };
  }, [match.params]);

  return (
    <div>
      List Page
      <Paragraph>HAHAHA</Paragraph>
    </div>
  );
};

export default ListPage;
