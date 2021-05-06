const toolbarClassNames = 'p-1 mx-0.5 font-bold active:underline no-underline border rounded';

function ToolbarButton({
  Button,
  children,
  onClick,
  disabled = false,
  className
}) {
  if (!Button) {
    return (
      <button
        disabled={disabled}
        type="button"
        className={`${className} ${toolbarClassNames}`}
        onClick={onClick}
      >
        {children}
      </button>
    );
  }

  return (
    <Button
      type="button"
      className={`${className} ${toolbarClassNames}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </Button>
  );
}

export default ToolbarButton;
