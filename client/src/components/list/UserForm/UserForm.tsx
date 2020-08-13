import React, { useState, useContext } from 'react';
import { UserContext } from '../../../context/UserContext';
import {
  InputError,
  Label,
  FormInput,
  Button,
} from '../../../styles/shared-styles';

type UserFormProps = {
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  listId: any;
};

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
    <form onSubmit={onSubmit}>
      <Label>Your name</Label>
      <FormInput
        type='text'
        value={storedUser.username ? storedUser.username : username}
        onChange={handleUsernameChange}
      />
      <InputError>{error}</InputError>
      <Button>Save name</Button>
    </form>
  );
};

export default UserForm;
