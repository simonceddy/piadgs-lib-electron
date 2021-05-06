import styled from 'styled-components';
import { getColourMap } from '../../themes';

const {
  primary,
  background,
} = getColourMap();

const StyledInput = styled.input`
  background-color: ${background};
  color: ${primary};
  border-color: ${primary};
`;

function ThemedTextInput({
  value,
  onChange,
  className = '',
  label,
  id,
  name,
  labelClassName = '',
  required = false
}) {
  return (
    <label
      htmlFor={id || name}
      className="flex flex-row justify-between items-center m-2 w-full"
    >
      {!label ? null : (
        <span className={`${labelClassName} mr-2 p-2`}>
          {label}
        </span>
      )}
      <StyledInput
        required={required}
        id={id || name}
        name={name || id}
        type="text"
        value={value}
        onChange={onChange}
        className={`p-2 ${className} border-2 flex-1 rounded-xl`}
      />
    </label>
  );
}

export default ThemedTextInput;
