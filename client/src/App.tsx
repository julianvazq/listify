import React, { useState, useEffect } from 'react';
import './App.css';
import io from 'socket.io-client';

let socket: any;
socket = io('localhost:4000');

const App: React.FC = () => {
  const [number, setNumber] = useState<number>(5);
  const [joined, setJoined] = useState<boolean>(false);

  useEffect(() => {
    socket.emit('join', { hello: 'hey i just joined' });
  }, [joined]);

  useEffect(() => {
    setNumber(1);
    // socket = io('localhost:4000');
    setJoined(true);
  }, []);

  return (
    <>
      <h1>Hi I'm App</h1>
    </>
  );
};

export default App;
