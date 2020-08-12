import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import queryString from 'query-string';
import { UserContext } from '../../../context/UserContext';
import { MdPerson } from 'react-icons/md';
import Modal from '../Modal/Modal';
import { Link, useLocation } from 'react-router-dom';
import { Label, FormInput, Button } from '../../../styles/shared-styles';
import CreateButton from '../../home/CreateButton/CreateButton';

const Container = styled.div`
  background: var(--light);
  color: var(--blue);
  position: relative;
  box-shadow: 0px 0px 5px 0px hsla(228, 26%, 30%, 0.25);
`;

const InnerContainer = styled.nav`
  max-width: 1000px;
  height: 70px;
  margin: 0 1rem;
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
    color: var(--blue);
    text-decoration: none;
    font-weight: 600;
  }
`;

const Greeting = styled.p`
  font-weight: 600;
`;

const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  border: 2px solid var(--blue);
  height: 30px;
  width: 30px;
  margin-left: 1rem;

  button {
    display: flex;
  }
`;

const UserIcon = styled(MdPerson)`
  font-size: 1.25rem;
  color: var(--blue);
`;

const Menu = styled.div<{ navOpen: boolean }>`
  position: absolute;
  bottom: ${(props) => (props.navOpen ? '-100px' : '100px')};
  display: ${(props) => (props.navOpen ? 'block' : 'none')};
  width: 100%;
  height: 100px;
  background: var(--blue);
  transition: opacity 150ms ease-in;
  text-align: right;
  padding: 1rem 1rem 0 0;
`;

const InnerMenu = styled.div`
  max-width: 1000px;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const MenuAction = styled.div`
  margin-bottom: 1rem;
  text-align: left;

  button {
    color: var(--light);
    font-weight: 600;
    font-size: 1rem;
  }
`;

const Nav = () => {
  const { storedUser, updateUsername, addUserList } = useContext(UserContext);
  const [newUsername, setNewUsername] = useState<string>(storedUser.username);
  const [navOpen, setNavOpen] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const location = useLocation();
  const { id } = queryString.parse(location.search);

  const onUsernameChange = (e) => {
    setNewUsername(e.target.value);
  };

  const handleChangeSubmit = () => {
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
      <Modal
        modalVisible={modalVisible}
        onClose={() => setModalVisible(false)}
        height={160}
      >
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
