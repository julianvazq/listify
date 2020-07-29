import React, { useState } from 'react';
import Modal from '../../shared/Modal/Modal';

const JoinButton = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  return (
    <>
      <button onClick={() => setModalVisible(true)}>
        Join an existing list
      </button>
      <Modal modalVisible={modalVisible} onClose={() => setModalVisible(false)}>
        <h2>Join my list pls</h2>
      </Modal>
    </>
  );
};

export default JoinButton;
