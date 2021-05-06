import styled from 'styled-components';
import { getColourMap } from '../../themes';

const {
  primary,
  text,
  background,
} = getColourMap();

const ThemedDiv = styled.div`
  border-color: ${primary};
  background-color: ${background};
  color: ${text};
`;

export default ThemedDiv;
