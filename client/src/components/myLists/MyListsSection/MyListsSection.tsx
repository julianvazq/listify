import React, { useContext } from 'react';
import { UserContext } from '../../../context/UserContext';
import {
  Container,
  InnerContainer,
  SectionHeading,
  Grid,
} from './MyListsSectionStyles';
import ListPreview from '../ListPreview/ListPreview';
import EmptyState from '../EmptyState/EmptyState';

const MyListsSection = () => {
  const { userLists } = useContext(UserContext);
  return (
    <Container>
      <InnerContainer>
        <SectionHeading>My Lists</SectionHeading>
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

export default MyListsSection;
