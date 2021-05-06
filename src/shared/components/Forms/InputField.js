import styled from 'styled-components';
import { getColourMap } from '../../themes';

const {
  text,
  background,
  primary,
  secondary
} = getColourMap();

const StyledInput = styled.input`
  border-color: ${text};
  background-color: ${background};
  color: ${text};

  &:focus {
    border-color: ${primary};
  }
`;

const StyledLabel = styled.label`
  &:hover {
    background-color: ${secondary};
  }
`;

function InputField({
  value,
  name,
  id = null,
  onChange = () => null,
  label = null,
  type = 'text',
  required = false,
  list = null,
  className = 'p-2',
  labelClassName = 'p-1',
  inputClassName = 'p-1',
}) {
  return (
    <StyledLabel htmlFor={name} className={`flex flex-row justify-between items-center w-11/12 hover:bg-green-100" ${className}`}>
      <span className={`"text-xl p-2 w-1/3 capitalize ${labelClassName}`}>{label}</span>
      <StyledInput
        list={list}
        id={id || name}
        name={name}
        type={type}
        value={value}
        className={`text-xl p-2 border border-black focus:border-blue-900 w-2/3 rounded ${inputClassName}`}
        onChange={onChange}
        required={required}
      />
    </StyledLabel>
  );
}

export default InputField;
