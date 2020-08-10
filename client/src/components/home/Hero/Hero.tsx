import React from 'react';
import {
  HeroContainer,
  InnerContainer,
  Heading,
  SubHeading,
  HeadingContainer,
  ButtonContainer,
  PrimaryButton,
  SecondaryButton,
  Divider,
} from './HeroStyles';
import CreateButton from '../CreateButton/CreateButton';
import JoinButton from '../JoinButton/JoinButton';

const Hero = () => {
  return (
    <HeroContainer>
      <InnerContainer>
        <HeadingContainer>
          <Heading>
            Real-time,
            <br />
            collaborative lists{' '}
          </Heading>
          <SubHeading>Now easier than ever.</SubHeading>
        </HeadingContainer>
        <ButtonContainer>
          <CreateButton>
            <PrimaryButton>Create a list</PrimaryButton>
          </CreateButton>
          <Divider>or</Divider>
          <JoinButton>
            <SecondaryButton>Join a list</SecondaryButton>
          </JoinButton>
        </ButtonContainer>
      </InnerContainer>
    </HeroContainer>
  );
};

export default Hero;
