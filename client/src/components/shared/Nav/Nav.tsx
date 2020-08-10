import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import queryString from 'query-string';
import { UserContext } from '../../../context/UserContext';
import { MdPerson } from 'react-icons/md';
import Modal from '../Modal/Modal';
import { Link, useLocation } from 'react-router-dom';
import { Label, FormInput, Button } from '../../../styles/shared-styles';
import CreateButton from '../../home/CreateButton/CreateButton';

const Container = styled.div`
  background: var(--blue);
  color: var(--light);
  position: relative;
`;

const InnerContainer = styled.nav`
  max-width: 1000px;
  height: 70px;
  margin: 0 1rem;
  color: var(--light);
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (min-width: 1000px) {
    margin: auto;
  }
`;

const UserContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  cursor: pointer;
`;

const Logo = styled.p`
  font-size: 1.5rem;
  a {
    color: var(--light);
    text-decoration: none;
  }
`;

const Greeting = styled.p``;

const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  border: 2px solid var(--light);
  height: 30px;
  width: 30px;
  margin-left: 1rem;
`;

const UserIcon = styled(MdPerson)`
  font-size: 1.25rem;
  color: var(--light);
`;

const Menu = styled.div<{ navOpen: boolean }>`
  position: absolute;
  bottom: -0px;
  width: 100%;
  height: 100px;
  background: #f2f2f2;
  color: var(--blue);
  z-index: ${(props) => (props.navOpen ? '1' : '-1')};
  transform: ${(props) =>
    props.navOpen ? 'translateY(100%)' : 'translateY(0)'};
  opacity: ${(props) => (props.navOpen ? '1' : '0')};
  transition: opacity 150ms ease-in;
  text-align: right;
  padding: 1rem 1rem 0 0;
`;

const InnerMenu = styled.div`
  max-width: 1000px;
  margin: auto;
`;

const MenuAction = styled.div`
  margin-bottom: 1rem;

  button {
    font-weight: 500;
    font-size: 1rem;
  }
`;

const Nav = () => {
  const { storedUser, updateUsername, addUserList } = useContext(UserContext);
  const [newUsername, setNewUsername] = useState<string>(storedUser.username);
  const [navOpen, setNavOpen] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const onUsernameChange = (e) => {
    setNewUsername(e.target.value);
  };

  const handleChangeSubmit = () => {
    updateUsername(newUsername, id);
    setModalVisible(false);
  };

  const location = useLocation();
  const { id } = queryString.parse(location.search);

  return (
    <Container>
      <InnerContainer>
        <Logo>
          <Link to='/'>Listify</Link>
        </Logo>
        <UserContainer onClick={() => setNavOpen(!navOpen)}>
          <Greeting>
            Hi, {storedUser.username === '' ? 'stranger' : storedUser.username}
          </Greeting>
          <IconContainer>
            <button>
              <UserIcon />
            </button>
          </IconContainer>
        </UserContainer>
      </InnerContainer>
      <Menu navOpen={navOpen}>
        <InnerMenu>
          <MenuAction>
            <button onClick={() => setModalVisible(true)}>Change name</button>
          </MenuAction>
          <MenuAction>
            <CreateButton>
              <button>Create new list</button>
            </CreateButton>
          </MenuAction>
        </InnerMenu>
      </Menu>
      <Modal modalVisible={modalVisible} onClose={() => setModalVisible(false)}>
        <Label>Name</Label>
        <FormInput
          autoFocus
          type='text'
          value={newUsername}
          onChange={onUsernameChange}
        />
        <Button onClick={handleChangeSubmit}>Update name</Button>
      </Modal>
    </Container>
  );
};

export default Nav;
