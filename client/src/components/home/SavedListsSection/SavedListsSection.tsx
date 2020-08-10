import React from 'react';
import styled from 'styled-components';

const Container = styled.nav`
  max-width: 1000px;
  margin: 4rem 1rem;

  @media (min-width: 1000px) {
    margin: 4rem auto;
  }
`;

const SectionHeading = styled.h3`
  font-size: 1.5rem;
`;

const SavedListsSection = () => {
  return (
    <Container>
      <SectionHeading>Saved Lists</SectionHeading>
    </Container>
  );
};

export default SavedListsSection;
