import styled from 'styled-components';

export const InputError = styled.p`
  color: red;
`;

export const FormInput = styled.input`
  width: 100%;
  margin-bottom: 1rem;
  padding: 0.5rem;
  border: 1px solid #dadada;
  border-radius: 0.3rem;
  font-family: 'Open Sans', sans-serif;

  &:focus {
    border: 1px solid var(--gray);
  }
`;

export const Label = styled.label`
  width: 100%;
  color: var(--gray);
  margin-bottom: 0.5rem;
  display: inline-block;
`;

export const Button = styled.button`
  font-size: 1rem;
  padding: 0.5rem 1rem;
  background: var(--blue);
  color: var(--light);
  border-radius: 0.3rem;
`;
