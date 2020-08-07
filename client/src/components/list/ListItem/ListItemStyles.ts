import styled, { css } from 'styled-components';
import {
  MdClose,
  MdEdit,
  MdCheckBox,
  MdCheckBoxOutlineBlank,
  MdCheck,
  MdDelete,
} from 'react-icons/md';
import { RiArrowGoBackLine } from 'react-icons/ri';

type GrayedOut = {
  grayedOut?: boolean;
};

export const Item = styled.li`
  display: grid;
  grid-template-columns: 30px auto 50px;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
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
  overflow: hidden;
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
  word-wrap: break-word;
`;

export const Input = styled.textarea<{ height: number }>`
  border: none;
  font-family: 'Ubuntu', sans-serif;
  color: var(--dark);
  margin-bottom: 0.5rem;
  font-size: 1.125rem;
  width: 100%;
  height: ${(props) => props.height + 'px'};
  resize: none;
`;

export const LastEdit = styled.p<{ italic: boolean }>`
  color: var(--gray);
  font-size: 0.85rem;
  font-style: ${(props) => (props.italic ? 'italic' : 'normal')};
`;

const IconStyling = css`
  cursor: pointer;
  font-size: 2rem;
`;

export const DeleteButton = styled(MdDelete)<GrayedOut>`
  ${IconStyling}
  color: ${(props) => (props.grayedOut ? '#9c9c9c' : '#ae0000')};
`;

export const RevertChangesButton = styled(MdClose)`
  ${IconStyling}
`;

export const EditButton = styled(MdEdit)<GrayedOut>`
  ${IconStyling}
  color: ${(props) => props.grayedOut && '#9c9c9c'};

  @media (min-width: 500px) {
    margin-left: 1rem;
  }
`;

export const SubmitButton = styled(MdCheck)<GrayedOut>`
  ${IconStyling}
  color: ${(props) => (props.grayedOut ? '#9c9c9c' : '#060')};

  @media (min-width: 500px) {
    margin-left: 1rem;
  }
`;

export const CheckboxStyles = css`
  ${IconStyling}
`;

export const Checkbox = styled(MdCheckBox)<GrayedOut>`
  ${CheckboxStyles}
  color: ${(props) => props.grayedOut && '#9c9c9c'};
`;

export const CheckboxOutline = styled(MdCheckBoxOutlineBlank)<GrayedOut>`
  ${CheckboxStyles}
  color: ${(props) => props.grayedOut && '#9c9c9c'};
`;
