import React, { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import ListOptions from './ListOptions/ListOptions';
import { v4 as uuidV4 } from 'uuid';

export const Home = () => {
  const { socket, userLists, addUserList, deleteUserList } = useContext(
    UserContext
  );

  return (
    <div>
      <button
        onClick={() => {
          const RANDOM_ID = uuidV4();

          addUserList({ name: 'asd', id: RANDOM_ID });
        }}
      >
        List action
      </button>
      Home Page
      {userLists.map((list) => (
        <p onClick={() => deleteUserList(list.id)}>
          {list.name} {list.id}
        </p>
      ))}
      <ListOptions />
    </div>
  );
};
