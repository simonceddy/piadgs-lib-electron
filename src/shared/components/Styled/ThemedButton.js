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

function ThemedButton({
  children,
  onClick,
  className,
  submits = false,
  disabled = false
}) {
  return (
    <StyledButton
      type={submits ? 'submit' : 'button'}
      onClick={onClick}
      className={`${disabled ? 'disabled cursor-text' : 'enabled hover:underline'} border-2 p-2 rounded-xl ${className}`}
      disabled={disabled}
    >
      {children}
    </StyledButton>
  );
}

export default ThemedButton;
