import React, { useEffect } from 'react';
import styled from 'styled-components';
import io from 'socket.io-client';

const Paragraph = styled.p`
  color: red;
`;

let socket: any;

const ListPage = ({ match }) => {
  console.log(match.params);

  useEffect(() => {
    socket = io('localhost:4000');
    socket.emit('join', { id: match.params });

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
