import React, { useState } from 'react';
import Modal from '../../shared/Modal/Modal';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Instructions = styled.p`
  font-weight: 600;
`;

const JoinButtonWrapper = ({ children }) => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  return (
    <>
      {React.cloneElement(children, { onClick: () => setModalVisible(true) })}
      <Modal
        modalVisible={modalVisible}
        onClose={() => setModalVisible(false)}
        height={120}
      >
        <Container>
          <Instructions>Paste the list URL into the address bar.</Instructions>
        </Container>
      </Modal>
    </>
  );
};

export default JoinButtonWrapper;
