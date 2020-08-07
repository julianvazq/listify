import styled, { css } from 'styled-components';
import {
  MdClose,
  MdEdit,
  MdCheckBox,
  MdCheckBoxOutlineBlank,
} from 'react-icons/md';
import { FaEdit, FaCheckDouble } from 'react-icons/fa';

export const Item = styled.li`
  display: grid;
  grid-template-columns: 50px auto 80px;
  padding-bottom: 1rem;
  margin-bottom: 1.5rem;
  border-bottom: 1px solid var(--gray);

  button {
    background: transparent;
    box-shadow: 0px 0px 0px transparent;
    border: 0px solid transparent;
    text-shadow: 0px 0px 0px transparent;
  }

  button:hover {
    background: transparent;
    box-shadow: 0px 0px 0px transparent;
    border: 0px solid transparent;
    text-shadow: 0px 0px 0px transparent;
  }

  button:active {
    outline: none;
    border: none;
  }

  button:focus {
    outline: 0;
    transform: scale(1.1);
  }
`;

export const CheckboxContainer = styled.div``;

export const ContentContainer = styled.div`
  padding-top: 0.25rem;
`;

export const ActionsContainer = styled.div`
  display: flex;
  align-items: flex-start;
`;

export const ItemName = styled.p`
  color: var(--dark);
  margin-bottom: 0.5rem;
  font-size: 1.125rem;
  font-weight: 500;
`;

export const Input = styled.input`
  border: none;
  color: var(--dark);
  margin-bottom: 0.5rem;
  font-size: 1.125rem;
  font-weight: 500;
  max-width: auto;
  border: 1px solid black;
`;

export const LastEdit = styled.p<{ italic: boolean }>`
  color: var(--gray);
  font-size: 0.85rem;
  font-style: ${(props) => (props.italic ? 'italic' : 'normal')};
`;

const IconStyling = css`
  cursor: pointer;
`;

export const DeleteButton = styled(MdClose)`
  ${IconStyling}
  height: 35px;
  width: 35px;
`;

export const EditButton = styled(MdEdit)`
  ${IconStyling}
  height: 30px;
  width: 30px;
  margin-left: 0.5rem;
`;

export const SubmitButton = styled(FaCheckDouble)`
  ${IconStyling}
  height: 30px;
  width: 30px;
  margin-left: 0.5rem;
`;

export const CheckboxStyles = css`
  height: 35px;
  width: 35px;
`;

export const Checkbox = styled(MdCheckBox)`
  ${CheckboxStyles}
`;

export const CheckboxOutline = styled(MdCheckBoxOutlineBlank)`
  ${CheckboxStyles}
`;
