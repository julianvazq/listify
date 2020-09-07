import React from 'react';
import {
  InstructioContainer,
  InstructionCircle,
  InstructionText,
} from './InstructionStyles';

const Instruction = ({ number, instruction }) => {
  return (
    <InstructioContainer>
      <InstructionCircle>
        <span>{number}</span>
      </InstructionCircle>
      <InstructionText>{instruction}</InstructionText>
    </InstructioContainer>
  );
};

export default Instruction;
