import React from 'react';
import Rodal from 'rodal';
import 'rodal/lib/rodal.css';

type ModalProps = {
  children: any;
  modalVisible: boolean;
  onClose: () => void;
  height?: number;
  showCloseButton?: boolean;
};

const Modal: React.FC<ModalProps> = ({
  children,
  modalVisible,
  onClose,
  height = 240,
  showCloseButton = true,
}) => {
  return (
    <Rodal
      visible={modalVisible}
      onClose={onClose}
      width={350}
      height={height}
      showCloseButton={showCloseButton}
    >
      {children}
    </Rodal>
  );
};

export default Modal;
