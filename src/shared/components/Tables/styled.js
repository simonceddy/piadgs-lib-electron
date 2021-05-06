import styled from 'styled-components';
import { getColourMap } from '../../themes';

const {
  primary,
  info,
  secondary,
  tertiary
} = getColourMap();
// const background = theme('mode', colourMaps.background);

export const StyledTh = styled.th`
  border-color: ${primary};

  &.sorting-by {
    background-color: ${info};
  }
`;

export const StyledTd = styled.td`
  border-color: ${primary};

  &:hover {
    background-color: ${secondary};
  }
`;

export const StyledTr = styled.tr`
  &:hover {
    background-color: ${tertiary};
  }
`;
