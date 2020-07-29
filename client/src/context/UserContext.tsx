import React, { useState, createContext } from 'react';

type Props = {
  children: JSX.Element[];
};

interface IContextProps {
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
}

export const UserContext = createContext<IContextProps | null>(null);

const ContextProvider = ({ children }: Props) => {
  const [username, setUsername] = useState<string>('');

  return (
    <UserContext.Provider value={{ username, setUsername }}>
      {children}
    </UserContext.Provider>
  );
};

export default ContextProvider;
