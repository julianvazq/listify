import styled from 'styled-components';

export const Container = styled.div`
  margin: 2rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: 800px) {
    flex-direction: row;
  }
`;

export const Illustration = styled.img`
  max-height: 600px;
  margin-bottom: 1rem;

  @media (min-width: 800px) {
    margin-bottom: 0;
    width: 300px;
  }

  @media (min-width: 900px) {
    width: 400px;
  }

  @media (min-width: 1100px) {
    width: 500px;
  }
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: 800px) {
    margin-left: 8rem;
  }
`;

export const Message = styled.p`
  color: var(--light);
  font-size: 1.25rem;
  margin-bottom: 1rem;
`;

export const ActionButton = styled.button`
  padding: 0.5rem 1rem;
  background: var(--light);
  color: var(--blue);
  font-weight: 600;
  font-size: 1.25rem;
  border-radius: 0.3rem;
`;
