import React, { useState, useEffect, createContext, useReducer } from 'react';

type Props = {
  children: JSX.Element[];
};

type List = {
  name: string;
  id: string;
};

const LISTS_STORAGE_KEY = 'lists';
const USERNAME_STORAGE_KEY = 'username';

export const UserContext = createContext<any>(null);

const retrieveLocalStorage = (key) => {
  const storage = localStorage.getItem(key);

  if (storage) {
    return JSON.parse(storage);
  }

  return key === LISTS_STORAGE_KEY ? [] : '';
};

const ContextProvider = ({ children }: Props) => {
  const [userName, setUserName] = useState<string>(() =>
    retrieveLocalStorage(USERNAME_STORAGE_KEY)
  );
  const [userLists, setUserLists] = useState<List[]>(() =>
    retrieveLocalStorage(LISTS_STORAGE_KEY)
  );

  /* Update localStorage */
  useEffect(() => {
    localStorage.setItem(USERNAME_STORAGE_KEY, JSON.stringify(userName));
  }, [userName]);

  useEffect(() => {
    localStorage.setItem(LISTS_STORAGE_KEY, JSON.stringify(userLists));
  }, [userLists]);

  const addUserList = (list: List) => {
    setUserLists([...userLists, list]);
  };

  const deleteUserList = (id: string) => {
    setUserLists(userLists.filter((list) => list.id !== id));
  };

  return (
    <UserContext.Provider
      value={{ userLists, addUserList, deleteUserList, userName, setUserName }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default ContextProvider;
