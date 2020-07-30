import React, { useContext } from 'react';
import { UserContext } from '../../../context/UserContext';

type CreateFormProps = {
  userName: string;
  listName: string;
  handleUserNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleListNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  createList: (e: React.FormEvent<HTMLFormElement>) => void;
};

const CreateForm: React.FC<CreateFormProps> = ({
  userName,
  listName,
  handleUserNameChange,
  handleListNameChange,
  createList,
}) => {
  const { userName: storedName } = useContext(UserContext);
  return (
    <form onSubmit={createList}>
      <label>Your name</label>
      <input
        type='text'
        value={storedName ? storedName : userName}
        onChange={handleUserNameChange}
        disabled={storedName !== ''}
      />
      <label>List name</label>
      <input type='text' value={listName} onChange={handleListNameChange} />
      <button>Create new list</button>
    </form>
  );
};

export default CreateForm;
