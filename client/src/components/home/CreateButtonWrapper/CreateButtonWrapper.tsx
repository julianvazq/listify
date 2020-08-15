import React, { useState, useContext } from 'react';
import { v4 as uuidV4 } from 'uuid';
import { useHistory } from 'react-router-dom';
import Modal from '../../shared/Modal/Modal';
import CreateForm from '../CreateForm/CreateForm';
import { UserContext } from '../../../context/UserContext';

export type ErrorState = {
  username: string | null;
  listName: string | null;
};

const CreateButtonWrapper = ({ children }) => {
  const { storedUser, setStoredUser } = useContext(UserContext);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [username, setUsername] = useState<string>('');
  const [listName, setListName] = useState<string>('Untitled');
  const [error, setError] = useState<ErrorState>({
    /* Initialized as empty string to prevent navigation prior to validation */
    username: '',
    listName: '',
  });
  const history = useHistory();

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handleListNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setListName(e.target.value);
  };

  // const saveUsername = () => {
  //   const USER_ID = uuidV4();

  //   if (username !== '') {
  //     setStoredUser({ username, id: USER_ID });
  //   }
  // };

  const validateInputs = () => {
    const updatedError: ErrorState = { username: null, listName: null };

    if (!username && !storedUser.username) {
      updatedError.username = 'This field is required.';
    }

    if (!listName) {
      updatedError.listName = 'This field is required.';
    }

    return updatedError;
  };

  const saveUser = () => {
    if (!storedUser.username) {
      setStoredUser({ ...storedUser, username });
    }
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const LIST_ID = uuidV4();

    const updatedError = validateInputs();

    if (updatedError.username === null && updatedError.listName === null) {
      saveUser();
      history.push(`/list?name=${listName}&id=${LIST_ID}&new`);
    } else {
      setError(updatedError);
    }
  };

  return (
    <>
      {React.cloneElement(children, { onClick: () => setModalVisible(true) })}
      <Modal
        modalVisible={modalVisible}
        onClose={() => setModalVisible(false)}
        height={storedUser.username === '' ? 240 : 160}
      >
        <CreateForm
          username={username}
          listName={listName}
          handleUsernameChange={handleUsernameChange}
          handleListNameChange={handleListNameChange}
          onSubmit={onSubmit}
          error={error}
        />
      </Modal>
    </>
  );
};

export default CreateButtonWrapper;
