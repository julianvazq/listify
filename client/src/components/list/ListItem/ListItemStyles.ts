import styled, { css } from 'styled-components';
import {
  MdClose,
  MdEdit,
  MdCheckBox,
  MdCheckBoxOutlineBlank,
} from 'react-icons/md';
import { FaCheckDouble } from 'react-icons/fa';

export const Item = styled.li`
  display: grid;
  grid-template-columns: 30px auto 50px;
  padding-bottom: 1rem;
  margin-bottom: 1.5rem;
  border-bottom: 1px solid var(--gray);

  @media (min-width: 500px) {
    grid-template-columns: 30px auto 80px;
  }

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
  padding-left: 1rem;
  padding-right: 0.5rem;
  overflow: scroll;
`;

export const ActionsContainer = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;

  @media (min-width: 500px) {
    flex-direction: row;
  }
`;

export const ItemName = styled.p`
  color: var(--dark);
  margin-bottom: 0.5rem;
  font-size: 1.125rem;
  font-weight: 500;
  max-width: 100%;
  word-wrap: break-word;
`;

export const Input = styled.textarea`
  border: none;
  font-family: 'Ubuntu', sans-serif;
  color: var(--dark);
  margin-bottom: 0.5rem;
  font-size: 1.125rem;
  font-weight: 500;
  border: 1px solid black;
  width: 165px;
  resize: none;
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
