const FormLabel = ({ children, htmlFor, className = '' }) => (
  <label
    className={`flex m-1 p-1 ${className}`}
    htmlFor={htmlFor}
  >
    {children}
  </label>
);

export default FormLabel;
