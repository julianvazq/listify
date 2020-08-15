import styled, { css } from 'styled-components';
import { MdCheckBox, MdCheckBoxOutlineBlank } from 'react-icons/md';

export const PreviewContainer = styled.article`
  width: 100%;
  padding: 2rem;
  background: var(--light);
  border-radius: 0.3rem;
  display: flex;
  flex-direction: column;
`;

export const ListName = styled.h3`
  margin-bottom: 1rem;
  font-size: 2rem;
  letter-spacing: 1px;
  color: hsl(228, 26%, 35%);
`;

export const ActionContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
`;

export const PrimaryAction = styled.button`
  font-weight: 600;
  font-size: 0.85rem;
  padding: 0.5rem 1rem;
  border-radius: 0.3rem;
  background: hsl(228, 26%, 50%);
  color: var(--light);
  text-transform: uppercase;
  letter-spacing: 1px;
  display: inline-block;
  width: 48%;
`;

export const DeleteAction = styled.button`
  display: inline-block;
  border-radius: 0.3rem;
  font-weight: 600;
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  padding: 0.5rem 1rem;
  border-radius: 0.3rem;
  background: hsl(228, 30%, 90%);
  color: hsl(0, 0%, 35%);
  width: 100%;
`;

export const List = styled.ul`
  list-style: none;
  margin-bottom: 2rem;
  flex: 1;
`;

export const ListItem = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  font-weight: 600;
  font-size: 1.125rem;

  &:last-of-type {
    margin-bottom: 0;
  }
`;

const CheckboxStyles = css`
  font-size: 1.5rem;
  color: var(--blue);
  margin-right: 0.5rem;
`;

export const Checkbox = styled(MdCheckBox)`
  ${CheckboxStyles}
`;

export const CheckboxOutline = styled(MdCheckBoxOutlineBlank)`
  ${CheckboxStyles}
`;
