import { NavLink } from 'react-router-dom';

function NavbarLink({
  children, to, exact = false, className
}) {
  return (
    <NavLink
      to={to}
      exact={exact}
      className={`flex flex-row justify-between items-center p-2 no-underline hover:underline m-2 ${className}`}
    >
      {children}
    </NavLink>
  );
}

export default NavbarLink;
