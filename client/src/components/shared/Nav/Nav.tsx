import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { UserContext } from '../../../context/UserContext';
import { MdPerson } from 'react-icons/md';
import Modal from '../Modal/Modal';
import { Link } from 'react-router-dom';

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

  @media (min-width: 1100px) {
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

const MenuAction = styled.p`
  margin-bottom: 1rem;
  button {
    font-weight: 500;
    font-size: 1rem;
  }
`;

const Nav = () => {
  const { storedUser, updateUsername, addUserList } = useContext(UserContext);
  const [navOpen, setNavOpen] = useState<boolean>(false);

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
            <button>Change name</button>
          </MenuAction>
          <MenuAction>
            <button>Create new list</button>
          </MenuAction>
        </InnerMenu>
      </Menu>
      {/* <Modal>
      </Modal> */}
    </Container>
  );
};

export default Nav;
