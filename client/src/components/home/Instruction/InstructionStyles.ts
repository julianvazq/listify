import styled from 'styled-components';

export const InstructioContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 4rem auto;
  color: var(--light);
  padding: 2rem 0 2rem 4rem;
  border-left: 3px solid #cce9ff;
  width: 230px;

  @media (min-width: 800px) {
    margin-right: 4rem;
    width: 270px;

    &:last-of-type {
      margin-right: 0;
    }
  }
`;

export const InstructionNumber = styled.div<{ numberOne: boolean }>`
  margin-bottom: 2rem;
  font-weight: 600;
  font-size: 5rem;

  span {
    color: #ffbe55;
    display: inline-block;
    margin-left: ${(props) => !props.numberOne && '0.5rem'};
  }
`;

export const InstructionText = styled.p`
  color: var(--light);
  font-size: 1.5rem;
  font-weight: 400;
  max-width: 220px;
  line-height: 1.5;
`;
