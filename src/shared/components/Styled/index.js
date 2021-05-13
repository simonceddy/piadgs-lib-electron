import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { getColourMap } from '../../themes';

export * from './forms';
export * from './tables';
export { default as ThemedDiv } from './ThemedDiv';
export { default as ThemedButton } from './ThemedButton';
export { default as ThemedTextInput } from './ThemedTextInput';

// TODO clean up this mess
const {
  primary,
  secondary,
  text,
  background,
} = getColourMap();

export const PrimaryBorderDiv = styled.div`
  border-color: ${primary};
`;

export const SecondaryFlexBox = styled(PrimaryBorderDiv)`
  display: flex;
  background-color: ${secondary};
`;

export const SecondaryForm = styled.form`
  border-color: ${primary};
  background-color: ${secondary};
  color: ${text};
`;

export const AppContainer = styled.div`
  color: ${text};
  background-color: ${background};
`;

export const ThemeH1 = styled.h1`
  color: ${primary};
  text-shadow: ${text} 1px 1px 1px;
`;

export const ThemedNavLink = styled(NavLink)`
  background-color: ${background};
  color: ${primary};
  border-color: ${background};

  &:hover {
    background-color: ${primary};
    color: ${background};
    border-color: ${background};
  }

  &.active {
    border-color: ${primary};
  }
`;
