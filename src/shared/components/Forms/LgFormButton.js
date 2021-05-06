/* eslint-disable react/button-has-type */
function LgFormButton({
  children,
  type = 'button',
  onClick,
  className = ''
}) {
  return (
    <button
      type={type}
      className={`p-3 text-xl border-2 rounded-md hover:underline ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default LgFormButton;
