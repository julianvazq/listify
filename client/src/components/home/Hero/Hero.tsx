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
          <PrimaryButton>Create a list</PrimaryButton>
          <Divider>or</Divider>
          <SecondaryButton>Join a list</SecondaryButton>
        </ButtonContainer>
      </InnerContainer>
    </HeroContainer>
  );
};

export default Hero;
