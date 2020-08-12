import React, { useContext } from 'react';
import styled from 'styled-components';
import { UserContext } from '../../../context/UserContext';
import ListPreview from '../ListPreview/ListPreview';

const Container = styled.section`
  background: var(--blue);
  padding: 2rem 0;
`;

const InnerContainer = styled.div`
  max-width: 1000px;
  margin: 4rem 2rem;

  @media (min-width: 1000px) {
    margin: 4rem auto;
  }
`;

const SectionHeading = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 2rem;
  color: var(--light);
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 315px));
  grid-gap: 2rem;
`;

const SavedListsSection = () => {
  const { userLists } = useContext(UserContext);
  return (
    <Container>
      <InnerContainer>
        <SectionHeading>Saved Lists</SectionHeading>
        <Grid>
          {userLists.map((list) => (
            <ListPreview key={list.id} {...list} />
          ))}
        </Grid>
      </InnerContainer>
    </Container>
  );
};

export default SavedListsSection;
