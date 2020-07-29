import React, { useState } from 'react';
import Rodal from 'rodal';
import 'rodal/lib/rodal.css';

const JoinButton = () => {
  const [visible, setVisible] = useState<boolean>(false);

  const show = () => {
    setVisible(true);
  };

  const hide = () => {
    setVisible(false);
  };
  return (
    <>
      <button onClick={show}>Join an existing list</button>
      <Rodal visible={visible} onClose={hide}></Rodal>
    </>
  );
};

export default JoinButton;
