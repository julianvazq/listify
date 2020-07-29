import React from 'react';

type CreateFormProps = {
  userName: string;
  listName: string;
  handleUserNameChange: (e: any) => void;
};

const CreateForm: React.FC<CreateFormProps> = ({
  userName: username,
  listName,
  handleUserNameChange,
}) => {
  return (
    <form>
      <label>Your name</label>
      <input type='text' value={username} onChange={handleUserNameChange} />
    </form>
  );
};

export default CreateForm;
