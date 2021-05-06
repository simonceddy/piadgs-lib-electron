import styled from 'styled-components';
import { getColourMap } from '../../themes';

const {
  primary,
  background,
  text
} = getColourMap();

export const StyledTh = styled.th`
  background-color: ${background};
  color: ${text};
  border-color: ${primary};
`;

export const StyledTbody = styled.tbody`
  background-color: ${background};
  color: ${text};
  border-color: ${primary};
`;

export const StyledHoverableRow = styled.tr`
  background-color: ${background};
  color: ${text};
  border-color: ${primary};

  &:hover {
    background-color: ${primary};
    color: ${background};
    border-color: ${background};
  }
`;

export const StyledHoverableCell = styled.td`
  background-color: ${background};
  color: ${text};
  border-color: ${primary};

  &:hover {
    background-color: ${text};
    color: ${background};
    border-color: ${background};
  }
`;
