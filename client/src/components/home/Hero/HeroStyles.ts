import styled, { css } from 'styled-components';

export const HeroContainer = styled.section`
  padding: 4rem 0;
  max-width: 1000px;
  min-height: 70vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  @media (min-width: 800px) {
    flex-direction: row;
    margin: auto;
  }
`;

export const InnerContainer = styled.div`
  color: var(--blue);
  padding: 0 2rem;
  margin-bottom: 4rem;

  @media (min-width: 800px) {
    margin-bottom: 0;
  }

  @media (min-width: 1100px) {
    padding: 0;
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
  font-weight: 600;
  color: hsl(0, 0%, 55%);
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 200px;

  @media (min-width: 600px) {
    flex-direction: row;
    width: auto;
  }
`;

const ButtonStyles = css`
  display: inline-block;
  padding: 0.5rem 1rem;
  border-radius: 0.3rem;
  font-size: 1.25rem;
  font-weight: 600;
`;

export const PrimaryButton = styled.button`
  ${ButtonStyles}
  background: var(--blue);
  color: var(--light);
  margin-bottom: 1rem;

  @media (min-width: 600px) {
    margin-bottom: 0;
    margin-right: 1.75rem;
  }
`;

export const SecondaryButton = styled.button`
  ${ButtonStyles}
  color: var(--blue);
  border: 1.5px solid;
`;

export const Divider = styled.p`
  font-size: 1.5rem;
  text-align: center;
  margin-bottom: 1rem;

  @media (min-width: 600px) {
    margin-bottom: 0;
    margin-right: 1.75rem;
  }
`;

export const Illustration = styled.img`
  max-height: 600px;

  @media (min-width: 800px) {
    width: 300px;
  }

  @media (min-width: 900px) {
    width: 400px;
  }

  @media (min-width: 1100px) {
    width: 500px;
  }
`;
