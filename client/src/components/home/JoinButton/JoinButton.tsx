import React, { useState } from 'react';
import Modal from '../../shared/Modal/Modal';

const JoinButton = ({ children }) => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  return (
    <>
      {React.cloneElement(children, { onClick: () => setModalVisible(true) })}
      <Modal modalVisible={modalVisible} onClose={() => setModalVisible(false)}>
        <h2>Join my list pls</h2>
      </Modal>
    </>
  );
};

export default JoinButton;
