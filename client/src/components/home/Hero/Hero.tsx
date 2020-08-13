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
  Illustration,
} from './HeroStyles';
import CreateButtonWrapper from '../CreateButtonWrapper/CreateButtonWrapper';
import JoinButtonWrapper from '../JoinButtonWrapper/JoinButtonWrapper';
import TeamIllustration from '../../../assets/remote-team.svg';

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
          <SubHeading>Simple. Efficient. Free.</SubHeading>
        </HeadingContainer>
        <ButtonContainer>
          <CreateButtonWrapper>
            <PrimaryButton>Create a list</PrimaryButton>
          </CreateButtonWrapper>
          <Divider>or</Divider>
          <JoinButtonWrapper>
            <SecondaryButton>Join a list</SecondaryButton>
          </JoinButtonWrapper>
        </ButtonContainer>
      </InnerContainer>
      <Illustration src={TeamIllustration} alt='Collaborative lists.' />
    </HeroContainer>
  );
};

export default Hero;
