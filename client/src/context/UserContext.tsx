import React, { useState, createContext } from 'react';

type Props = {
  children: JSX.Element[];
};

interface IContextProps {
  userName: string;
  setUserName: React.Dispatch<React.SetStateAction<string>>;
}

type List = {
  name: string;
  id: string;
};

export const UserContext = createContext<IContextProps | null>(null);

const ContextProvider = ({ children }: Props) => {
  const [userName, setUserName] = useState<string>('');
  const [userLists, setUserLists] = useState<List[]>([]);

  return (
    <UserContext.Provider value={{ userName, setUserName }}>
      {children}
    </UserContext.Provider>
  );
};

export default ContextProvider;
