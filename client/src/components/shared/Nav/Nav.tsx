import React, { useState, useEffect, useContext } from 'react';
import queryString from 'query-string';
import { UserContext } from '../../../context/UserContext';
import Modal from '../Modal/Modal';
import { Link, useLocation } from 'react-router-dom';
import { Label, FormInput, Button } from '../../../styles/shared-styles';
import CreateButtonWrapper from '../../home/CreateButtonWrapper/CreateButtonWrapper';
import {
  Container,
  InnerContainer,
  Logo,
  UserContainer,
  Greeting,
  IconContainer,
  UserIcon,
  Menu,
  InnerMenu,
  MenuAction,
  MyLists,
  LinksContainer,
} from './NavStyles';

const Nav = () => {
  const { storedUser, updateUsername } = useContext(UserContext);
  const [newUsername, setNewUsername] = useState<string>(storedUser.username);
  const [navOpen, setNavOpen] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const location = useLocation();
  const { id } = queryString.parse(location.search);

  const onUsernameChange = (e) => {
    setNewUsername(e.target.value);
  };

  const handleChangeSubmit = (e) => {
    e.preventDefault();
    updateUsername(newUsername, id, location.pathname === '/');
    setModalVisible(false);
    setNavOpen(false);
  };

  useEffect(() => {
    setNavOpen(false);
  }, [location.key]);

  return (
    <Container>
      <InnerContainer>
        <Logo>
          <Link to='/'>Listify</Link>
        </Logo>
        <LinksContainer>
          <MyLists to='/my-lists'>My Lists</MyLists>
          <UserContainer onClick={() => setNavOpen(!navOpen)}>
            <Greeting>
              Hi,{' '}
              {storedUser.username === '' ? 'stranger' : storedUser.username}
            </Greeting>
            <IconContainer>
              <button>
                <UserIcon />
              </button>
            </IconContainer>
          </UserContainer>
        </LinksContainer>
      </InnerContainer>
      <Menu navOpen={navOpen}>
        <InnerMenu>
          <MenuAction>
            <button onClick={() => setModalVisible(true)}>Change name</button>
          </MenuAction>
          <MenuAction>
            <CreateButtonWrapper>
              <button>Create new list</button>
            </CreateButtonWrapper>
          </MenuAction>
        </InnerMenu>
      </Menu>
      <Modal
        modalVisible={modalVisible}
        onClose={() => setModalVisible(false)}
        height={160}
      >
        <form onSubmit={handleChangeSubmit}>
          <Label>Name</Label>
          <FormInput
            autoFocus
            type='text'
            value={newUsername}
            onChange={onUsernameChange}
          />
          <Button>Update name</Button>
        </form>
      </Modal>
    </Container>
  );
};

export default Nav;
