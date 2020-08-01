import React, { useState, useContext } from 'react';
import { v4 as uuidV4 } from 'uuid';
import { useHistory } from 'react-router-dom';
import Modal from '../../shared/Modal/Modal';
import CreateForm from '../CreateForm/CreateForm';
import { UserContext } from '../../../context/UserContext';

const CreateButton = () => {
  const { addUserList, storedUser, setStoredUser } = useContext(UserContext);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [username, setUsername] = useState<string>('');
  const [listName, setListName] = useState<string>('Untitled');
  const history = useHistory();

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handleListNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setListName(e.target.value);
  };

  const saveUsername = () => {
    const USER_ID = uuidV4();

    if (username !== '') {
      setStoredUser({ username, id: USER_ID });
    }
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const LIST_ID = uuidV4();

    if (storedUser.username !== '' || username !== '') {
      /* Save list and username in LocalStorage */
      addUserList({ name: listName, id: LIST_ID });
      saveUsername();

      const name = listName !== '' ? listName : 'untitled';

      history.push(`/list?name=${name}&id=${LIST_ID}`);
    }
  };
  return (
    <>
      <button onClick={() => setModalVisible(true)}>Create list</button>
      <Modal modalVisible={modalVisible} onClose={() => setModalVisible(false)}>
        <CreateForm
          username={username}
          listName={listName}
          handleUsernameChange={handleUsernameChange}
          handleListNameChange={handleListNameChange}
          onSubmit={onSubmit}
        />
      </Modal>
    </>
  );
};

export default CreateButton;
