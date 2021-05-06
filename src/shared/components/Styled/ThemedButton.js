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

  &:hover {
    background-color: ${primary};
    color: ${background};
    border-color: ${background};
  }
`;

function ThemedButton({
  children,
  onClick,
  className,
  submits = false
}) {
  return (
    <StyledButton
      type={submits ? 'submit' : 'button'}
      onClick={onClick}
      className={`hover:underline border-2 p-2 rounded-xl ${className}`}
    >
      {children}
    </StyledButton>
  );
}

export default ThemedButton;
