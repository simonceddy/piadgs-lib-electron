import styled from 'styled-components';
import { getColourMap } from '../../themes';

const {
  text,
  info,
  dark,
  warn,
  background,
  danger,
  light
} = getColourMap();

export const InfoButton = styled.button`
  border-color: ${text};
  color: ${text};
  background-color: ${info};

  &:hover, &:focus {
    border-color: ${info};
    color: ${info};
    background-color: ${dark};
  }

  &:active {
    box-shadow: ${info} 3px 3px 4px, ${info} -3px -3px 4px, ${info} -3px 3px 4px, ${info} 3px -3px 4px;
  }
`;

export const WarnButton = styled.button`
border-color: ${text};
color: ${text};
background-color: ${warn};

&:hover, &:focus {
  border-color: ${warn};
  color: ${warn};
  background-color: ${dark};
}
&:active {
  box-shadow: ${warn} 3px 3px 4px, ${warn} -3px -3px 4px, ${warn} -3px 3px 4px, ${warn} 3px -3px 4px;
}
`;

export const DangerButton = styled.button`
border-color: ${text};
color: ${background};
background-color: ${danger};

&:hover, &:focus {
  border-color: ${danger};
  color: ${danger};
  background-color: ${light};
}
&:active {
  box-shadow: ${danger} 3px 3px 4px, ${danger} -3px -3px 4px, ${danger} -3px 3px 4px, ${danger} 3px -3px 4px;
}
`;

export { default as ToolbarButton } from './ToolbarButton';
