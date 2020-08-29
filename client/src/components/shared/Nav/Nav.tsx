import React, { useState, useEffect, useContext } from 'react';
import queryString from 'query-string';
import { UserContext } from '../../../context/UserContext';
import Modal from '../Modal/Modal';
import { Link, useLocation } from 'react-router-dom';
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
import ChangeNameForm from '../ChangeNameForm/ChangeNameForm';

const Nav = () => {
  const { storedUser } = useContext(UserContext);
  const [navOpen, setNavOpen] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const location = useLocation();

  const closeNavAndModal = () => {
    setModalVisible(false);
    setNavOpen(false);
  };

  useEffect(() => {
    setNavOpen(false);
  }, [location.key]);

  const buttonStyles = {
    color: location.pathname === '/my-lists' && 'var(--blue)',
  } as React.CSSProperties;

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
      <Menu navOpen={navOpen} switchColors={location.pathname === '/my-lists'}>
        <InnerMenu>
          <MenuAction switchColors={location.pathname === '/my-lists'}>
            <button onClick={() => setModalVisible(true)}>Change name</button>
          </MenuAction>
          <MenuAction>
            <CreateButtonWrapper>
              <button style={buttonStyles}>Create new list</button>
            </CreateButtonWrapper>
          </MenuAction>
        </InnerMenu>
      </Menu>
      <Modal
        modalVisible={modalVisible}
        onClose={() => setModalVisible(false)}
        height={160}
      >
        <ChangeNameForm closeNavAndModal={closeNavAndModal} />
      </Modal>
    </Container>
  );
};

export default Nav;
