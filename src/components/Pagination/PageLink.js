import { ThemedButton } from '../../shared/components/Styled';

function PageLink({ onClick, children, disabled = false }) {
  return (
    <ThemedButton
      onClick={onClick}
      type="button"
      disabled={disabled}
      className="block border p-1 m-1"
    >
      {children}
    </ThemedButton>
  );
}

export default PageLink;
