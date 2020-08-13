import styled, { css } from 'styled-components';
import {
  MdClose,
  MdEdit,
  MdCheckBox,
  MdCheckBoxOutlineBlank,
  MdCheck,
  MdDelete,
} from 'react-icons/md';

export type GrayedOut = {
  grayedOut?: boolean;
};

export const Item = styled.li`
  display: grid;
  grid-template-columns: 30px auto 50px;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #dadada;

  button {
    display: flex;
  }

  @media (min-width: 500px) {
    grid-template-columns: 30px auto 80px;
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
  align-items: center;
  flex-direction: column;

  @media (min-width: 500px) {
    flex-direction: row;
  }
`;

export const ItemName = styled.p`
  color: var(--text);
  margin-bottom: 0.5rem;
  font-size: 1.125rem;
  font-weight: 600;
  word-wrap: break-word;
`;

export const TextArea = styled.textarea<{ height: number }>`
  border: none;
  font-family: 'Open Sans', sans-serif;
  color: var(--text);
  margin-bottom: 0.5rem;
  font-size: 1.125rem;
  width: 100%;
  height: ${(props) => props.height + 'px'};
  resize: none;
  outline: none;
  overflow: hidden;
`;

export const LastEdit = styled.p<{ italic: boolean }>`
  color: var(--gray);
  font-size: 0.85rem;
  font-style: ${(props) => (props.italic ? 'italic' : 'normal')};
`;

const IconStyling = css`
  cursor: pointer;
  font-size: 2rem;
  color: var(--blue);
`;

export const IconContainer = styled.div<GrayedOut>`
  width: 28px;
  height: 28px;
  border-radius: 0.3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background: ${(props) => (props.grayedOut ? '#9c9c9c' : 'var(--blue)')};

  @media (min-width: 500px) {
    margin-left: 1rem;
  }
`;

export const DeleteButton = styled(MdDelete)<GrayedOut>`
  ${IconStyling}
  color: ${(props) => (props.grayedOut ? '#9c9c9c' : '#ae0000')};
`;

export const RevertChangesButton = styled(MdClose)`
  ${IconStyling}
  color: #ae0000;
`;

export const EditButton = styled(MdEdit)`
  ${IconStyling}
  font-size: 1.25rem;
  color: var(--light);
`;

export const SubmitButton = styled(MdCheck)`
  ${IconStyling}
  color: green;
  font-size: 2rem;

  @media (min-width: 500px) {
    margin-left: 0.8rem;
  }
`;

export const Checkbox = styled(MdCheckBox)<GrayedOut>`
  ${IconStyling}
  color: ${(props) => props.grayedOut && '#9c9c9c'};
`;

export const CheckboxOutline = styled(MdCheckBoxOutlineBlank)<GrayedOut>`
  ${IconStyling}
  color: ${(props) => props.grayedOut && '#9c9c9c'};
`;
