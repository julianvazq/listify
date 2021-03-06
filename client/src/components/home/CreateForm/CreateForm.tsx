import React, { useContext } from 'react';
import { UserContext } from '../../../context/UserContext';
import { ErrorState } from '../CreateButtonWrapper/CreateButtonWrapper';
import {
  InputError,
  Button,
  Label,
  FormInput,
} from '../../../styles/shared-styles';

type CreateFormProps = {
  username: string;
  listName: string;
  handleUsernameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleListNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  error: ErrorState;
};

const CreateForm: React.FC<CreateFormProps> = ({
  username,
  listName,
  handleUsernameChange,
  handleListNameChange,
  onSubmit,
  error,
}) => {
  const { storedUser } = useContext(UserContext);
  return (
    <form onSubmit={onSubmit}>
      {storedUser.username === '' && (
        <>
          <Label>Your name</Label>
          <FormInput
            type='text'
            value={storedUser.username ? storedUser.username : username}
            onChange={handleUsernameChange}
          />
          <InputError>{error.username}</InputError>
        </>
      )}
      <Label>List name</Label>
      <FormInput
        type='text'
        value={listName}
        onFocus={(e) => e.target.select()}
        onChange={handleListNameChange}
      />
      <InputError>{error.listName}</InputError>
      <Button>Create new list</Button>
    </form>
  );
};

export default CreateForm;
