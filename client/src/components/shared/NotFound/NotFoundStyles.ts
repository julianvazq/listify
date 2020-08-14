import styled from 'styled-components';

export const Container = styled.div`
  max-width: 700px;
  min-height: 70vh;
  margin: 4rem 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (min-width: 700px) {
    margin: 4rem auto 0;
  }
`;

export const ErrorMessage = styled.p`
  color: var(--blue);
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 2rem;
`;

export const Illustration = styled.img`
  margin-top: 2rem;
  max-width: 600px;
`;
