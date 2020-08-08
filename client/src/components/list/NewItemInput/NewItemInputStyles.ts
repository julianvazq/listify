import styled from 'styled-components';
import { TextArea, GrayedOut, Item } from '../ListItem/ListItemStyles';
import { MdAdd } from 'react-icons/md';

export const FlexContainer = styled.div`
  display: grid;
  grid-template-columns: auto 40px;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #dadada;
`;

export const ActionContainer = styled.div`
  /* flex: 0 0 50px; */
`;

export const Input = styled(TextArea)`
  margin: 0 0.5rem 0 0;
  padding-left: 2.8rem;
`;

export const AddButton = styled(MdAdd)<GrayedOut>`
  font-size: 2rem;
  cursor: pointer;
  color: ${(props) => props.grayedOut && '#9c9c9c'};
`;
