import React, { useState, useEffect, createContext } from 'react';
import io from 'socket.io-client';
import { v4 as uuidV4 } from 'uuid';

type Props = {
  children: JSX.Element[];
};

interface ContextValues {
  storedUser: Username;
  userLists: List[];
  addUserList: (list: List) => void;
  deleteUserList: (id: string) => void;
  updateUsername: (
    newUsername: string,
    listId: any,
    fromHome?: boolean
  ) => void;
  setStoredUser: React.Dispatch<React.SetStateAction<Username>>;
  socket: SocketIOClient.Socket;
}

type List = {
  name: string;
  id: any;
};

type Username = {
  username: string;
  id: string;
};

const LISTS_STORAGE_KEY = 'lists';
const USERNAME_STORAGE_KEY = 'user';

/* Deployment */
const socket = io('listify.julianvazquez.me');
/* Development */
// const socket = io();

export const UserContext = createContext({} as ContextValues);

const retrieveLocalStorage = (key) => {
  const storage = localStorage.getItem(key);

  if (storage) {
    return JSON.parse(storage);
  }

  return key === LISTS_STORAGE_KEY ? [] : { username: '', id: uuidV4() };
};

const ContextProvider = ({ children }: Props) => {
  const [storedUser, setStoredUser] = useState<Username>(() =>
    retrieveLocalStorage(USERNAME_STORAGE_KEY)
  );
  const [userLists, setUserLists] = useState<List[]>(() =>
    retrieveLocalStorage(LISTS_STORAGE_KEY)
  );

  /* Update localStorage */
  useEffect(() => {
    localStorage.setItem(USERNAME_STORAGE_KEY, JSON.stringify(storedUser));
  }, [storedUser]);

  useEffect(() => {
    localStorage.setItem(LISTS_STORAGE_KEY, JSON.stringify(userLists));
  }, [userLists]);

  const addUserList = (list: List) => {
    const found = userLists.find((storedList) => storedList.id === list.id);

    if (!found) {
      setUserLists([...userLists, { id: list.id, name: list.name }]);
    }
  };

  const deleteUserList = (id: string) => {
    setUserLists(userLists.filter((list) => list.id !== id));
  };

  const updateUsername = (
    newUsername: string,
    listId: any,
    fromHome = false
  ) => {
    socket.emit(
      'UPDATE_USER_NAME',
      {
        listId,
        user: { id: storedUser.id, username: newUsername },
        fromHome,
      },
      (newUsername) => {
        setStoredUser((prevUser) => ({ ...prevUser, username: newUsername }));
      }
    );
  };

  return (
    <UserContext.Provider
      value={{
        socket,
        userLists,
        addUserList,
        deleteUserList,
        storedUser,
        setStoredUser,
        updateUsername,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default ContextProvider;
