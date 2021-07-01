import styled from 'styled-components';
import { getColourMap } from '../../themes';

const {
  primary,
  // secondary,
  text,
  background,
} = getColourMap();

export const StyledSelect = styled.select`
  border-color: ${primary};
  color: ${text};
  background-color: ${background};
`;

export const StyledTextarea = styled.textarea`
  border-color: ${primary};
  color: ${text};
  background-color: ${background};
`;
