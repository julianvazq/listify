import React from 'react';

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
  return (
    <form onSubmit={createList}>
      <label>Your name</label>
      <input type='text' value={userName} onChange={handleUserNameChange} />
      <label>List name</label>
      <input type='text' value={listName} onChange={handleListNameChange} />
      <button>Create new list</button>
    </form>
  );
};

export default CreateForm;
