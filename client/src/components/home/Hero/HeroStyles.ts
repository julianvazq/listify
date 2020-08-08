import styled, { css } from 'styled-components';
import HeroImage from '../../../assets/unsplash-list.jpg';

export const HeroContainer = styled.section`
  padding: 4rem 0;
  min-height: 70vh;
  background-image: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),
    url(${HeroImage});
  background-position: bottom left;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const InnerContainer = styled.div`
  color: var(--light);
  margin: 0 3rem;

  @media (min-width: 700px) {
    margin: 0;
  }
`;

export const HeadingContainer = styled.div`
  margin: auto;
  margin-bottom: 4rem;
`;

export const Heading = styled.h1`
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 2rem;
  line-height: 1.5;
  margin-bottom: 1rem;
`;

export const SubHeading = styled.h2`
  font-size: 1.5rem;
  font-weight: 500;
  color: #dbdbdb;
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 200px;

  @media (min-width: 700px) {
    flex-direction: row;
    width: auto;
  }
`;

const ButtonStyles = css`
  display: inline-block;
  padding: 0.5rem 1rem;
  border-radius: 0.3rem;
  font-size: 1.5rem;
`;

export const PrimaryButton = styled.button`
  ${ButtonStyles}
  background: var(--light);
  color: var(--blue);
  margin-bottom: 1rem;

  @media (min-width: 700px) {
    margin-bottom: 0;
    margin-right: 1.75rem;
  }
`;

export const SecondaryButton = styled.button`
  ${ButtonStyles}
  color: var(--light);
  border: 2px solid;
`;

export const Divider = styled.p`
  font-size: 1.5rem;
  text-align: center;
  margin-bottom: 1rem;

  @media (min-width: 700px) {
    margin-bottom: 0;
    margin-right: 1.75rem;
  }
`;
