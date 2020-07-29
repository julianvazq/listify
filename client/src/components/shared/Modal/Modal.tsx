import React, { useState, useEffect } from 'react';
import Rodal from 'rodal';
import 'rodal/lib/rodal.css';

type ModalProps = {
  children: any;
  modalVisible: boolean;
  onClose: () => void;
};

const Modal: React.FC<ModalProps> = ({ children, modalVisible, onClose }) => {
  return (
    <Rodal visible={modalVisible} onClose={onClose}>
      {children}
    </Rodal>
  );
};

export default Modal;
