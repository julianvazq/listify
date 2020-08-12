import React, { useState, useEffect } from 'react';
import Rodal from 'rodal';
import 'rodal/lib/rodal.css';

type ModalProps = {
  children: any;
  modalVisible: boolean;
  onClose: () => void;
  height?: number;
};

const Modal: React.FC<ModalProps> = ({
  children,
  modalVisible,
  onClose,
  height = 240,
}) => {
  return (
    <Rodal visible={modalVisible} onClose={onClose} width={350} height={height}>
      {children}
    </Rodal>
  );
};

export default Modal;
