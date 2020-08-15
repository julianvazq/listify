import React from 'react';
import {
  Container,
  ContentContainer,
  Illustration,
  Message,
  ActionButton,
} from './EmptyStateStyles';
import TodoIllustration from '../../../assets/to-do-list.svg';
import CreateButtonWrapper from '../../home/CreateButtonWrapper/CreateButtonWrapper';

const EmptyState = () => {
  return (
    <Container>
      <Illustration src={TodoIllustration} alt='Create new list.' />
      <ContentContainer>
        <Message>No saved lists.</Message>
        <CreateButtonWrapper>
          <ActionButton>Create new list</ActionButton>
        </CreateButtonWrapper>
      </ContentContainer>
    </Container>
  );
};

export default EmptyState;
