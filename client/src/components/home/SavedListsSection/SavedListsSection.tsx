import React, { useContext } from 'react';
import { UserContext } from '../../../context/UserContext';
import ListPreview from '../ListPreview/ListPreview';
import EmptyState from '../EmptyState/EmptyState';
import {
  Container,
  InnerContainer,
  SectionHeading,
  Grid,
} from './SavedListsSectionStyles';

const SavedListsSection = () => {
  const { userLists } = useContext(UserContext);
  return (
    <Container>
      <InnerContainer>
        <SectionHeading>Saved Lists</SectionHeading>
        {userLists.length ? (
          <Grid>
            {userLists.map((list) => (
              <ListPreview key={list.id} {...list} />
            ))}
          </Grid>
        ) : (
          <EmptyState />
        )}
      </InnerContainer>
    </Container>
  );
};

export default SavedListsSection;
