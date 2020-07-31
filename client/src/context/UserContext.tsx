import React, { useState, useEffect, createContext, useReducer } from 'react';

type Props = {
  children: JSX.Element[];
};

interface ContextValues {
  storedUser: Username;
  userLists: List[];
  addUserList: (list: List) => void;
  deleteUserList: (id: string) => void;
  setStoredUser: React.Dispatch<React.SetStateAction<Username>>;
}

type List = {
  name: string;
  id: string;
};

type Username = {
  username: string;
  id: string;
};

const LISTS_STORAGE_KEY = 'lists';
const USERNAME_STORAGE_KEY = 'username';

export const UserContext = createContext({} as ContextValues);

const retrieveLocalStorage = (key) => {
  const storage = localStorage.getItem(key);

  if (storage) {
    return JSON.parse(storage);
  }

  return key === LISTS_STORAGE_KEY ? [] : { username: '', id: null };
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
    const listName = list.name !== '' ? list.name : 'Untitled List';

    setUserLists([...userLists, { id: list.id, name: listName }]);
  };

  const deleteUserList = (id: string) => {
    setUserLists(userLists.filter((list) => list.id !== id));
  };

  return (
    <UserContext.Provider
      value={{
        userLists,
        addUserList,
        deleteUserList,
        storedUser,
        setStoredUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default ContextProvider;
