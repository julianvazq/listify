import styled from 'styled-components';

export const Container = styled.section`
  background: var(--blue);
  color: var(--light);
`;

export const InnerContainer = styled.div`
  padding: 4rem 0;
  max-width: 1000px;
  margin: auto;
`;

export const InstructionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 0 2rem;

  @media (min-width: 800px) {
    flex-direction: row;
  }
`;
