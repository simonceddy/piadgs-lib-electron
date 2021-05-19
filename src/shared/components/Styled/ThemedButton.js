import StyledButton from './StyledButton';

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
