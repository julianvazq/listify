import React from 'react';
import {
  Container,
  InnerContainer,
  InstructionsContainer,
} from './InstructionSectionStyles';
import Instruction from '../Instruction/Instruction';

const INSTRUCTIONS = [
  { number: 1, instruction: 'Create new list' },
  { number: 2, instruction: 'Copy list URL and send to others' },
  { number: 3, instruction: 'Enjoy real-time lists' },
];

const InstructionsSection = () => {
  return (
    <Container>
      <InnerContainer>
        <InstructionsContainer>
          {INSTRUCTIONS.map((instruction) => (
            <Instruction key={instruction.number} {...instruction} />
          ))}
        </InstructionsContainer>
      </InnerContainer>
    </Container>
  );
};

export default InstructionsSection;
