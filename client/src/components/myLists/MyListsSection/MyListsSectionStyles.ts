import styled from 'styled-components';

export const Container = styled.section`
  background: var(--blue);
  padding: 4rem 0;
  min-height: 100vh;
`;

export const InnerContainer = styled.div`
  max-width: 1000px;
  margin: 0 2rem;

  @media (min-width: 1000px) {
    margin: 0 auto;
  }
`;

export const SectionHeading = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 2rem;
  color: var(--light);
  text-transform: uppercase;
  letter-spacing: 1px;
`;

export const Grid = styled.div`
  margin-bottom: 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 310px));
  grid-gap: 2rem;
`;
