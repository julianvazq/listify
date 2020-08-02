import React, { useContext } from 'react';
import styled from 'styled-components';
import { UserContext } from '../../../context/UserContext';

const Container = styled.div`
  background: pink;
`;

const InnerContainer = styled.div`
  max-width: 1100px;
  height: 50px;
  margin: auto;
`;

const Nav = () => {
  const { storedUser } = useContext(UserContext);
  return (
    <Container>
      <InnerContainer>{storedUser.username}</InnerContainer>
    </Container>
  );
};

export default Nav;
