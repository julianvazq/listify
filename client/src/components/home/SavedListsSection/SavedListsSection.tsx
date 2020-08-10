import React, { useContext } from 'react';
import styled from 'styled-components';
import { UserContext } from '../../../context/UserContext';
import ListPreview from '../ListPreview/ListPreview';

const Container = styled.section`
  max-width: 1000px;
  margin: 4rem 1rem;

  @media (min-width: 1000px) {
    margin: 4rem auto;
  }
`;

const SectionHeading = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 2rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-gap: 2rem;
`;

const SavedListsSection = () => {
  const { userLists, deleteUserList } = useContext(UserContext);
  return (
    <Container>
      <SectionHeading>Saved Lists</SectionHeading>
      <Grid>
        {userLists.map((list) => (
          <ListPreview key={list.id} {...list} />
        ))}
      </Grid>
    </Container>
  );
};

export default SavedListsSection;
