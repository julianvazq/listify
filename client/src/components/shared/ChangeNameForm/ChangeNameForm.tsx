import React, { useContext, useState } from 'react';
import { Label, FormInput, Button } from '../../../styles/shared-styles';
import { UserContext } from '../../../context/UserContext';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';

const ChangeNameForm = ({ closeNavAndModal }) => {
  const { storedUser, updateUsername } = useContext(UserContext);
  const [newUsername, setNewUsername] = useState<string>(storedUser.username);
  const location = useLocation();
  const { id } = queryString.parse(location.search);

  const onUsernameChange = (e) => {
    setNewUsername(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    updateUsername(newUsername, id, location.pathname === '/');
    closeNavAndModal();
  };

  return (
    <form onSubmit={onSubmit}>
      <Label>Name</Label>
      <FormInput
        autoFocus
        type='text'
        value={newUsername}
        onChange={onUsernameChange}
      />
      <Button>Update name</Button>
    </form>
  );
};

export default ChangeNameForm;
