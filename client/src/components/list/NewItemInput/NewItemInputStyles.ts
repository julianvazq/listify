import styled from 'styled-components';
import { TextArea, GrayedOut } from '../ListItem/ListItemStyles';
import { MdAdd } from 'react-icons/md';

export const FlexContainer = styled.div`
  display: grid;
  grid-template-columns: 30px auto 40px;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #dadada;
`;

export const ActionContainer = styled.div``;

export const Input = styled(TextArea)`
  margin: 0 0.5rem 0 0;
  padding-left: 1rem;
`;

export const AddButton = styled(MdAdd)<GrayedOut>`
  font-size: 2rem;
  cursor: pointer;
  color: ${(props) => props.grayedOut && '#9c9c9c'};
`;
