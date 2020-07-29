import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import io from 'socket.io-client';
import { Home } from './components/home/Home';
import ListPage from './components/list/ListPage';
import ContextProvider from './context/UserContext';

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
    <Router>
      <ContextProvider>
        <Route path='/' exact component={Home} />
        <Route path='/list' exact component={ListPage} />
      </ContextProvider>
    </Router>
  );
};

export default App;
