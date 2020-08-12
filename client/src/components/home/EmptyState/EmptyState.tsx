import React from 'react';
import {
  Container,
  ContentContainer,
  Illustration,
  Message,
  ActionButton,
} from './EmptyStateStyles';
import TodoIllustration from '../../../assets/to-do-list.svg';
import CreateButton from '../CreateButton/CreateButton';

const EmptyState = () => {
  return (
    <Container>
      <Illustration src={TodoIllustration} alt='Create new list.' />
      <ContentContainer>
        <Message>No saved lists.</Message>
        <CreateButton>
          <ActionButton>Create new list</ActionButton>
        </CreateButton>
      </ContentContainer>
    </Container>
  );
};

export default EmptyState;
