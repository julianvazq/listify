import React, { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import { v4 as uuidV4 } from 'uuid';
import Hero from './Hero/Hero';
import SavedListsSection from './SavedListsSection/SavedListsSection';

export const Home = () => {
  const { socket, userLists, addUserList, deleteUserList } = useContext(
    UserContext
  );

  return (
    <>
      <Hero />
      <SavedListsSection />
    </>
  );
};
