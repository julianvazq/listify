import React from 'react';
import PageNotFound from '../../../assets/404.svg';
import { Container, ErrorMessage, Illustration } from './NotFoundStyles';
import CreateButtonWrapper from '../../home/CreateButtonWrapper/CreateButtonWrapper';
import { Button } from '../../../styles/shared-styles';

const NotFound = () => {
  return (
    <Container>
      <ErrorMessage>Not found.</ErrorMessage>
      <CreateButtonWrapper>
        <Button>Create new list</Button>
      </CreateButtonWrapper>
      <Illustration src={PageNotFound} alt={'Page not found.'} />
    </Container>
  );
};

export default NotFound;
