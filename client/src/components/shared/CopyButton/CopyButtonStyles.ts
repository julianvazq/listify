import styled from 'styled-components';
import { MdDone } from 'react-icons/md';

export const SuccessIcon = styled(MdDone)`
  margin-right: 0.5rem;
`;

export const CopiedContainer = styled.div`
  display: flex;
  align-items: center;
`;

type ButtonStyles = {
  listPage: boolean | undefined;
};

export const Button = styled.button<ButtonStyles>`
  display: block;
  border-radius: 0.3rem;
  font-weight: 600;
  font-size: 0.85rem;
  padding: 0.5rem 1rem;
  border-radius: 0.3rem;
  background: ${(props) =>
    props.listPage ? 'var(--blue)' : 'hsl(228, 50%, 85%)'};
  color: ${(props) => (props.listPage ? 'var(--light)' : 'hsl(228, 50%, 30%)')};
  text-transform: uppercase;
  letter-spacing: 1px;
  width: ${(props) => (props.listPage ? '120px' : '48%')};

  &:focus {
    opacity: 1;
  }
`;
