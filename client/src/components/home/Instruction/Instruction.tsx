import React from 'react';
import {
  InstructioContainer,
  InstructionNumber,
  InstructionText,
} from './InstructionStyles';

const Instruction = ({ number, instruction }) => {
  return (
    <InstructioContainer>
      <InstructionNumber numberOne={number === 1}>
        {number}
        <span>.</span>
      </InstructionNumber>
      <InstructionText>{instruction}</InstructionText>
    </InstructioContainer>
  );
};

export default Instruction;
