import React, { useEffect } from 'react';
import styled from 'styled-components';
import io from 'socket.io-client';

const Paragraph = styled.p`
  color: red;
`;

let socket: any;
socket = io('localhost:4000');

const ListPage = ({ match }) => {
  console.log(match.params);

  useEffect(() => {
    socket.emit('join', { id: match.params });
  }, []);

  return (
    <div>
      List Page
      <Paragraph>HAHAHA</Paragraph>
    </div>
  );
};

export default ListPage;
