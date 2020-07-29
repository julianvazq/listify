import React, { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import ListOptions from './ListOptions/ListOptions';

export const Home = () => {
  const { username, setUsername } = useContext(UserContext);

  return (
    <div>
      Home Page
      <ListOptions />
    </div>
  );
};
