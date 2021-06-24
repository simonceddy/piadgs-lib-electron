const TextInput = ({
  id, required = false, value, onChange = () => null, onKeyDown, className
}) => (
  <input
    onKeyDown={onKeyDown}
    type="text"
    required={required}
    id={id}
    value={value}
    className={`${className} m-1 dark:text-green-300 border-2 dark:border-yellow-400 dark:bg-black rounded focus-within:border-green-300`}
    onChange={onChange}
  />
);

export default TextInput;
