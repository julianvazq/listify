import React, { useContext } from 'react';
import { UserContext } from '../../context/UserContext';

export const Home = () => {
  const { username, setUsername } = useContext(UserContext);

  return <div>Home Page{username}</div>;
};
