import React, { useState, useContext } from 'react';
import { v4 as uuidV4 } from 'uuid';
import { useHistory } from 'react-router-dom';
import Modal from '../../shared/Modal/Modal';
import CreateForm from '../CreateForm/CreateForm';
import { UserContext } from '../../../context/UserContext';

const CreateButton = () => {
  const { addUserList, setUserName: setContextUserName } = useContext(
    UserContext
  );
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>('');
  const [listName, setListName] = useState<string>('');
  const history = useHistory();

  const handleUserNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
  };

  const handleListNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setListName(e.target.value);
  };

  const createList = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const RANDOM_ID = uuidV4();
    addUserList({ name: listName, id: RANDOM_ID });
    setContextUserName(userName);
    history.push(`/list/${RANDOM_ID}`);
  };
  return (
    <>
      <button onClick={() => setModalVisible(true)}>Create list</button>
      <Modal modalVisible={modalVisible} onClose={() => setModalVisible(false)}>
        <CreateForm
          userName={userName}
          listName={listName}
          handleUserNameChange={handleUserNameChange}
          handleListNameChange={handleListNameChange}
          createList={createList}
        />
      </Modal>
    </>
  );
};

export default CreateButton;
