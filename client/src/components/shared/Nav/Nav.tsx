import React, { useContext } from 'react';
import styled from 'styled-components';
import { UserContext } from '../../../context/UserContext';

const Container = styled.div`
  background: var(--blue);
`;

const InnerContainer = styled.div`
  max-width: 1000px;
  height: 50px;
  margin: 0 1rem;
  color: var(--light);

  @media (min-width: 1100px) {
    margin: auto;
  }
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
