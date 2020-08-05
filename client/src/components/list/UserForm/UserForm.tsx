import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { UserContext } from '../../../context/UserContext';
import { InputError } from '../../../styles/shared-styles';

type UserFormProps = {
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  listId: any;
};

const Form = styled.form``;

const Label = styled.label`
  width: 100%;
`;

const Input = styled.input`
  width: 100%;
`;

const UserForm: React.FC<UserFormProps> = ({ setModalVisible, listId }) => {
  const { socket, storedUser, setStoredUser } = useContext(UserContext);
  const [username, setUsername] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);

    if (username !== '') {
      setError(null);
    }
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (username !== '') {
      socket.emit('CREATE_USER', { user: { ...storedUser, username }, listId });
      setStoredUser({ ...storedUser, username });
      setModalVisible(false);
    } else {
      setError('This field is required.');
    }
  };

  return (
    <Form onSubmit={onSubmit}>
      <Label>Your name</Label>
      <Input
        type='text'
        value={storedUser.username ? storedUser.username : username}
        onChange={handleUsernameChange}
      />
      <InputError>{error}</InputError>
      <button>Save name</button>
    </Form>
  );
};

export default UserForm;
