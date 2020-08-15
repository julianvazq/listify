import styled from 'styled-components';
import { MdPerson } from 'react-icons/md';
import { Link } from 'react-router-dom';

export const Container = styled.div`
  background: var(--light);
  color: var(--blue);
  position: relative;
  box-shadow: 0px 0px 5px 0px hsla(228, 26%, 30%, 0.25);
`;

export const InnerContainer = styled.nav`
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

export const LinksContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const UserContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  cursor: pointer;
`;

export const Logo = styled.p`
  font-size: 1.5rem;

  a {
    color: var(--blue);
    text-decoration: none;
    font-weight: 600;
  }
`;

export const MyLists = styled(Link)`
  font-weight: 600;
  text-decoration: none;
  margin-right: 1rem;

  &:visited {
    color: var(--blue);
  }

  @media (min-width: 500px) {
    margin-right: 3rem;
  }
`;

export const Greeting = styled.p`
  font-weight: 600;
`;

export const IconContainer = styled.div`
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

export const UserIcon = styled(MdPerson)`
  font-size: 1.25rem;
  color: var(--blue);
`;

type MenuProps = {
  navOpen: boolean;
  switchColors: boolean;
};

export const Menu = styled.div<MenuProps>`
  position: absolute;
  bottom: ${(props) => (props.navOpen ? '-100px' : '100px')};
  display: ${(props) => (props.navOpen ? 'block' : 'none')};
  width: 100%;
  height: 100px;
  background: ${(props) => (props.switchColors ? '#fbfbfb' : 'var(--blue)')};
  transition: opacity 150ms ease-in;
  text-align: right;
  padding: 1rem 1rem 0 0;
`;

export const InnerMenu = styled.div`
  max-width: 1000px;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

type MenuActionProps = {
  switchColors?: boolean;
};

export const MenuAction = styled.div<MenuActionProps>`
  margin-bottom: 1rem;
  text-align: left;

  button {
    color: ${(props) => (props.switchColors ? 'var(--blue)' : 'var(--light)')};
    font-weight: 600;
    font-size: 1rem;
  }
`;
