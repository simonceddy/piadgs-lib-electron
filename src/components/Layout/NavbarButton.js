import { ThemedButton } from '../../shared/components/Styled';

function NavbarButton({
  children, onClick, className
}) {
  return (
    <ThemedButton
      onClick={onClick}
      activeClassName="active-navlink"
      className={`flex flex-row border-2 justify-between items-center p-2 no-underline hover:underline m-1 rounded ${className}`}
    >
      {children}
    </ThemedButton>
  );
}

export default NavbarButton;
