import styled, { css } from 'styled-components';
import {
  MdClose,
  MdEdit,
  MdCheckBox,
  MdCheckBoxOutlineBlank,
  MdCheck,
} from 'react-icons/md';
import { RiArrowGoBackLine } from 'react-icons/ri';

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
  font-weight: 500;
  width: 100%;
  border: 1px solid black;
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
`;

export const DeleteButton = styled(MdClose)`
  ${IconStyling}
  height: 35px;
  width: 35px;
  color: #ae0000;
`;

export const RevertChangesButton = styled(RiArrowGoBackLine)`
  ${IconStyling}
  height: 30px;
  width: 30px;
  color: #636363;
`;

export const EditButton = styled(MdEdit)`
  ${IconStyling}
  height: 30px;
  width: 30px;

  @media (min-width: 500px) {
    margin-left: 0.5rem;
  }
`;

export const SubmitButton = styled(MdCheck)`
  ${IconStyling}
  height: 35px;
  width: 35px;
  color: #060;

  @media (min-width: 500px) {
    margin-left: 0.5rem;
  }
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
