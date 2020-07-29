import React, { useState } from 'react';
import { v4 as uuidV4 } from 'uuid';
import Rodal from 'rodal';
import 'rodal/lib/rodal.css';
import { Link } from 'react-router-dom';

const CreateButton = () => {
  const [visible, setVisible] = useState<boolean>(false);

  const show = () => {
    setVisible(true);
  };

  const hide = () => {
    setVisible(false);
  };
  return (
    <>
      <button onClick={show}>Create list</button>
      <Rodal visible={visible} onClose={hide}>
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
          <Link
            to={`/list/${uuidV4()}`}
            style={{ position: 'absolute', bottom: 0 }}
          >
            Create new list
          </Link>
        </div>
      </Rodal>
    </>
  );
};

export default CreateButton;
