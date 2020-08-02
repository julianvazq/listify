import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { UserContext } from '../../../context/UserContext';

const Form = styled.form``;

const Label = styled.label`
  width: 100%;
`;

const Input = styled.input`
  width: 100%;
`;

const UserForm = ({ setModalVisible }) => {
  const { storedUser } = useContext(UserContext);
  const [username, setUsername] = useState();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const onSubmit = () => {
    setModalVisible(false);
  };

  return (
    <Form onSubmit={onSubmit}>
      <Label>Your name</Label>
      <Input
        type='text'
        value={storedUser.username ? storedUser.username : username}
        onChange={handleUsernameChange}
        disabled={storedUser.username !== ''}
      />
      <button>Ready</button>
    </Form>
  );
};

export default UserForm;
