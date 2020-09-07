import styled from 'styled-components';

export const InstructioContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 4rem 0;

  @media (min-width: 800px) {
    margin-right: 4rem;

    &:last-of-type {
      margin-right: 0;
    }
  }
`;

export const InstructionCircle = styled.div`
  border: 5px solid #cce9ff;
  border-radius: 50%;
  background: var(--light);
  color: var(--blue);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80px;
  height: 80px;
  margin-bottom: 2rem;

  span {
    font-weight: 600;
    font-size: 2rem;
  }

  @media (min-width: 700px) {
    width: 100px;
    height: 100px;
  }
`;

export const InstructionText = styled.p`
  color: var(--light);
  font-size: 1.5rem;
  font-weight: 400;
  text-align: center;
  max-width: 220px;
  margin: 0 auto;
  line-height: 1.5;
`;
