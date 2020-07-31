import React, { useContext } from 'react';
import { UserContext } from '../../../context/UserContext';

type CreateFormProps = {
  username: string;
  listName: string;
  handleUsernameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleListNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

const CreateForm: React.FC<CreateFormProps> = ({
  username,
  listName,
  handleUsernameChange,
  handleListNameChange,
  onSubmit,
}) => {
  const { storedUser } = useContext(UserContext);
  return (
    <form onSubmit={onSubmit}>
      <label>Your name</label>
      <input
        type='text'
        value={storedUser.username ? storedUser.username : username}
        onChange={handleUsernameChange}
        disabled={storedUser.username !== ''}
      />
      <label>List name</label>
      <input type='text' value={listName} onChange={handleListNameChange} />
      <button>Create new list</button>
    </form>
  );
};

export default CreateForm;
