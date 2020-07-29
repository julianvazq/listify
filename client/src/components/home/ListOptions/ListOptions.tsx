import React, { useState } from 'react';
import CreateButton from '../CreateButton/CreateButton';
import JoinButton from '../JoinButton/JoinButton';

const ListOptions = () => {
  const [visible, setVisible] = useState<boolean>(false);

  const show = () => {
    setVisible(true);
  };

  const hide = () => {
    setVisible(false);
  };

  return (
    <>
      <CreateButton />

      <JoinButton />
    </>
  );
};

export default ListOptions;
