import styled from 'styled-components';

export const Item = styled.li`
  display: grid;
  grid-template-columns: 50px auto 100px;
  padding-bottom: 1rem;
  margin-bottom: 1.5rem;
  border-bottom: 1px solid var(--gray);
`;

export const CheckboxContainer = styled.div``;

export const ContentContainer = styled.div``;

export const ActionsContainer = styled.div``;

export const ItemName = styled.p`
  color: var(--dark);
  margin-bottom: 0.5rem;
  font-size: 1.125rem;
  font-weight: 500;
`;

export const LastEdit = styled.p<{ italic: boolean }>`
  color: var(--gray);
  font-size: 0.85rem;
  font-style: ${(props) => (props.italic ? 'italic' : 'normal')};
`;
