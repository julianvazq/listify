import React, { useState } from 'react';
import { v4 as uuidV4 } from 'uuid';
import { useHistory } from 'react-router-dom';
import Modal from '../../shared/Modal/Modal';
import CreateForm from '../CreateForm/CreateForm';

const CreateButton = () => {
  // const [visible, setVisible] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>('');
  const [listName, setListName] = useState<string>('');
  const history = useHistory();

  const handleUserNameChange = (e) => {
    setUserName(e.target.value);
  };

  const handleListNameChange = (e) => {
    setUserName(e.target.value);
  };

  const createList = () => {
    console.log(history);
  };
  return (
    <>
      <button onClick={() => setModalVisible(true)}>Create list</button>
      <Modal modalVisible={modalVisible} onClose={() => setModalVisible(false)}>
        <CreateForm
          userName={userName}
          listName={listName}
          handleUserNameChange={handleUserNameChange}
        />
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
          <button
            onClick={createList}
            // to={`/list/${uuidV4()}`}
            style={{ position: 'absolute', bottom: 0 }}
          >
            Create new list
          </button>
        </div>
      </Modal>
    </>
  );
};

export default CreateButton;
