import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { UserContext } from '../../../context/UserContext';

type UserFormProps = {
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  socket: any;
  listId: any;
};

const Form = styled.form``;

const Label = styled.label`
  width: 100%;
`;

const Input = styled.input`
  width: 100%;
`;

const UserForm: React.FC<UserFormProps> = ({
  setModalVisible,
  socket,
  listId,
}) => {
  const { storedUser, setStoredUser } = useContext(UserContext);
  const [username, setUsername] = useState<string>('');

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    socket.emit(
      'CREATE_USER',
      { user: { ...storedUser, username }, listId },
      (res: any) => {
        setStoredUser({ ...storedUser, username });
      }
    );

    setModalVisible(false);
  };

  return (
    <Form onSubmit={onSubmit}>
      <Label>Your name</Label>
      <Input
        type='text'
        value={storedUser.username ? storedUser.username : username}
        onChange={handleUsernameChange}
      />
      <button>Save name</button>
    </Form>
  );
};

export default UserForm;
