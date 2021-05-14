import { ThemedNavLink } from '../../shared/components/Styled';

function NavbarLink({
  children, to, exact = false, className
}) {
  return (
    <ThemedNavLink
      to={to}
      exact={exact}
      className={`flex flex-row justify-between items-center p-2 no-underline hover:underline m-1 rounded ${className}`}
    >
      {children}
    </ThemedNavLink>
  );
}

export default NavbarLink;
