import { ThemedNavLink } from '../../shared/components/Styled';

function ToolbarButton({ children, to = '', exact = false }) {
  return (
    <ThemedNavLink to={to} exact={exact} className="mx-0.5 p-0.5 rounded border-2">
      {children}
    </ThemedNavLink>
  );
}

export default ToolbarButton;
