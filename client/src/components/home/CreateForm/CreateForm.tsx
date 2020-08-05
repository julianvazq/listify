import React, { useContext } from 'react';
import { UserContext } from '../../../context/UserContext';
import { ErrorState } from '../CreateButton/CreateButton';
import styled from 'styled-components';
import { InputError } from '../../../styles/shared-styles';

type CreateFormProps = {
  username: string;
  listName: string;
  handleUsernameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleListNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  error: ErrorState;
};

const Form = styled.form``;

const Label = styled.label`
  width: 100%;
`;

const Input = styled.input`
  width: 100%;
`;

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
    <Form onSubmit={onSubmit}>
      <Label>Your name</Label>
      <Input
        type='text'
        value={storedUser.username ? storedUser.username : username}
        onChange={handleUsernameChange}
        disabled={storedUser.username !== ''}
      />
      <InputError>{error.username}</InputError>
      <Label>List name</Label>
      <Input
        type='text'
        value={listName}
        onFocus={(e) => e.target.select()}
        onChange={handleListNameChange}
      />
      <InputError>{error.listName}</InputError>
      <button>Create new list</button>
    </Form>
  );
};

export default CreateForm;
