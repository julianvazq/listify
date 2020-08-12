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
import CreateButton from '../CreateButton/CreateButton';
import JoinButton from '../JoinButton/JoinButton';
import IllustrationSVG from '../../../assets/remote-team.svg';

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
          <CreateButton>
            <PrimaryButton>Create a list</PrimaryButton>
          </CreateButton>
          <Divider>or</Divider>
          <JoinButton>
            <SecondaryButton>Join a list</SecondaryButton>
          </JoinButton>
        </ButtonContainer>
      </InnerContainer>
      <Illustration src={IllustrationSVG} />
    </HeroContainer>
  );
};

export default Hero;
