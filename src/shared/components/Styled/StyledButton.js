import styled from 'styled-components';
import { getColourMap } from '../../themes';

// TODO clean up this mess
const {
  primary,
  background,
} = getColourMap();

const StyledButton = styled.button`
  background-color: ${background};
  color: ${primary};
  border-color: ${primary};

  &.enabled:hover {
    background-color: ${primary};
    color: ${background};
    border-color: ${background};
  }
`;

export default StyledButton;
