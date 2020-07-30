import React, { useState, useEffect, createContext, useReducer } from 'react';

type Props = {
  children: JSX.Element[];
};

type List = {
  name: string;
  id: string;
};

const STORAGE_KEY = 'lists';

export const UserContext = createContext<any>(null);

const retrieveLocalStorage = () => {
  const storage = localStorage.getItem(STORAGE_KEY);
  return storage ? JSON.parse(storage) : [];
};

const ContextProvider = ({ children }: Props) => {
  const [userLists, setUserLists] = useState<List[]>(() =>
    retrieveLocalStorage()
  );

  /* Update localStorage */
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(userLists));
  }, [userLists]);

  const addUserList = (list: List) => {
    setUserLists([...userLists, list]);
  };

  const deleteUserList = (id: string) => {
    setUserLists(userLists.filter((list) => list.id !== id));
  };

  return (
    <UserContext.Provider value={{ userLists, addUserList, deleteUserList }}>
      {children}
    </UserContext.Provider>
  );
};

export default ContextProvider;
