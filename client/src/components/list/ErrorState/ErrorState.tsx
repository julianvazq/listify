import React from 'react';
import { Container, ErrorMessage, Illustration } from './ErrorStateStyles';
import CatInSpace from '../../../assets/cat-in-space.svg';
import Settings from '../../../assets/settings.svg';
import CreateButtonWrapper from '../../home/CreateButtonWrapper/CreateButtonWrapper';
import { Button } from '../../../styles/shared-styles';

type ErrorStateProps = {
  message: string;
};

const ErrorState = ({ message }: ErrorStateProps) => {
  const getIllustration = (message) => {
    if (message === 'This list does not exist.') {
      return CatInSpace;
    }

    return Settings;
  };

  return (
    <Container>
      <ErrorMessage>{message}</ErrorMessage>
      <CreateButtonWrapper>
        <Button>Create new list</Button>
      </CreateButtonWrapper>
      <Illustration src={getIllustration(message)} alt={message} />
    </Container>
  );
};

export default ErrorState;
