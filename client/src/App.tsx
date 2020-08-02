import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import io from 'socket.io-client';
import { Home } from './components/home/Home';
import ListPage from './components/list/ListPage';
import ContextProvider from './context/UserContext';
import Nav from './components/shared/Nav/Nav';

const App: React.FC = () => {
  return (
    <Router>
      <ContextProvider>
        <Nav />
        <Route path='/' exact component={Home} />
        <Route path='/list' exact component={ListPage} />
      </ContextProvider>
    </Router>
  );
};

export default App;
